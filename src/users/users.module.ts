import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersProviders } from './users.provider';
import { DatabaseModule } from 'src/database/database.module';
import configuration from 'src/config/configuration';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [...UsersProviders],
  exports: [...UsersProviders],
})
export class UsersModule {}
