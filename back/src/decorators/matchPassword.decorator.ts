import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({
  name: 'matchPassword',
  async: false,
})
export class matchPassword implements ValidatorConstraintInterface {
  validate(confirmPassword: string, args: ValidationArguments): boolean {
    const [property] = args.constraints;
    const password = (args.object as any)[property];

    return password === confirmPassword;
  }
  defaultMessage(): string {
    return 'Los passwords no coinciden';
  }
}
