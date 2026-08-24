import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({
  name: 'matchPassword',
  async: false,
})
export class MatchPassword implements ValidatorConstraintInterface {
  validate(confirmPassword: string, args: ValidationArguments): boolean {
    const [property] = args.constraints as [string];

    const object = args.object as Record<string, unknown>;
    const password = object[property];

    return password === confirmPassword;
  }

  defaultMessage(): string {
    return 'Los passwords no coinciden';
  }
}
