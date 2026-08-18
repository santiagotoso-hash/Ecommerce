import { MigrationInterface, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcrypt';

export class MigrationTest1762219268970 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Hasheamos la contraseña antes de insertarla:
    const passwordHash = await bcrypt.hash('aaBB33##', 10);

    await queryRunner.query(
      `
				INSERT INTO "USERS" ("name", "email", "password", "address", "phone", "country", "city", "isAdmin") 
				VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
			`,
      [
        'AdminUser',
        'adminuser@mail.com',
        passwordHash,
        'Calle1 1234',
        5556666,
        'Demo',
        'Demo',
        true,
      ],
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "USERS" WHERE "email" = $1`, [
      'adminuser@mail.com',
    ]);
  }
}

// export class NameRefactor1712799620352 implements MigrationInterface {
//   public async up(queryRunner: QueryRunner): Promise<void> {
//     await queryRunner.query(
//       'ALTER TABLE "USERS" RENAME COLUMN "name" TO "fullname"',
//     );
//   }

//   public async down(queryRunner: QueryRunner): Promise<void> {
//     await queryRunner.query(
//       'ALTER TABLE "USERS" RENAME COLUMN "fullname" TO "name"',
//     );
//   }
// }
