import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UsersRepository } from 'src/users/users.repo';

@ValidatorConstraint({ name: 'UniqueForUser', async: true })
@Injectable()
export class UniqueForUserRule implements ValidatorConstraintInterface {
  constructor(private usersRepository: UsersRepository) {}

  async validate(value: string, args: ValidationArguments) {
    try {
      const key = args.property;

      const user = await this.usersRepository.getByKey(key, value);
      return !user;
    } catch (e) {
      console.log(e);

      return false;
    }
  }

  defaultMessage(args: ValidationArguments) {
    return ` ${args.property} already exist`;
  }
}

export function IsUniqueForUser(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    console.log(object);
    console.log(propertyName);

    registerDecorator({
      name: 'IsUniqueForUser',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: UniqueForUserRule,
    });
  };
}
