import { Injectable } from '@nestjs/common';
import { UploadApiResponse, v2 } from 'cloudinary';
import toStream from 'buffer-to-stream';

@Injectable()
export class FileUploadRepository {
  async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream(
        { resource_type: 'auto' },
        (error, result) => {
          if (error || !result) {
            reject(error || new Error('Error al cargar imagen en Cloudinary'));
          } else {
            resolve(result);
          }
        },
      );
      toStream(file.buffer).pipe(upload);
    });
  }
}

// async getById(id: string): Promise<File | null> {
//   return await this.findOne({
//     where: {
//       id,
//       active: true,
//     },
//   });
// }

// async deleteById(id: string): Promise<File | null> {
//   const file = await this.getById(id);

//   if (!file) {
//     return null;
//   }

//   file.active = false;

//   return await this.save(file);
// }
