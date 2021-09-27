import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { CryptoService } from 'src/utils/crypto/crypto.service';

@Module({
  imports: [UsersModule],
  controllers: [AuthController],
  providers: [AuthService, CryptoService],
})
export class AuthModule {}
