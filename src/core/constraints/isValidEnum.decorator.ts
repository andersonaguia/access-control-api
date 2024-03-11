import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

export function IsValidEnum(enumType: any, validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [enumType],
      validator: IsValidEnumConstraint,
    });
  };
}

@ValidatorConstraint({ name: 'IsValidEnum', async: false })
export class IsValidEnumConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments): boolean {
    const [enumType] = args.constraints;
    return Object.values(enumType).includes(value);
  }

  defaultMessage(args: ValidationArguments): string {
    const [enumType] = args.constraints;

    const enumOptions = Object.keys(enumType)
      .filter((key) => isNaN(Number(key)))
      .map((key) => `${key} = ${enumType[key]}`)
      .join(', ');

    return `"${args.value}" não é um enum válido. Valores disponíveis: ${enumOptions}`;
  }
}
