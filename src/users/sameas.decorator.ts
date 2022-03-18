import { registerDecorator, ValidationOptions } from 'class-validator';

export function SameAs(
  property: string,
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return function (object, propertyName: string) {
    registerDecorator({
      name: 'sameAs',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [property],
      validator: {
        validate(value, args) {
          const [relatedPropertyName] = args!.constraints;

          return args?.object[relatedPropertyName] === value;
        },
      },
    });
  };
}
