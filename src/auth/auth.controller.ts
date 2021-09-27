import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from 'src/users/dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signUp')
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }
  @Get('login')
  login(@Body() loginUserDto: Omit<CreateUserDto, 'nickname'>) {
    return this.authService.getAuthenticatedUser(
      loginUserDto.email,
      loginUserDto.password,
    );
  }
}
