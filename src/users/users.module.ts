import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersProviders } from './users.provider';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [...UsersProviders],
})
export class UsersModule {}
