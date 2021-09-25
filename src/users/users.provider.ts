import { Provider } from '@nestjs/common';
import { Connection } from 'mongoose';
import { UniqueForUserRule } from 'src/utils/validators/is-unique.validator';
import { UserSchema } from './schemas/user.schema';
import { UsersRepository } from './users.repo';
import { UsersService } from './users.service';

export const UsersProviders: Provider[] = [
  {
    provide: 'User_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('User', UserSchema),
    inject: ['DATABASE_CONNECTION'],
  },
  UniqueForUserRule,
  UsersRepository,
  UsersService,
];
