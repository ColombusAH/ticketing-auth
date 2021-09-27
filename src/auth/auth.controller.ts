import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  HttpCode,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import RequestWithUser from 'src/interfaces/request-with-user';
import { CreateUserDto, UpdateUserDto } from 'src/users/dto';
import { AuthService } from './auth.service';
import { LocalAuthenticationGuard } from './guards';
import JwtAuthenticationGuard from './guards/jwt-authentication.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signUp')
  async register(
    @Body() createUserDto: CreateUserDto,
    @Req() request: RequestWithUser,
    @Res() response: Response,
  ) {
    const user = await this.authService.register(createUserDto);
    const cookie = this.authService.getCookieWithJwtToken(user.id);
    response.setHeader('Set-Cookie', cookie);
    return response.send(user);
  }

  @HttpCode(HttpStatus.OK)
  @Get('login')
  @UseGuards(LocalAuthenticationGuard)
  login(@Req() request: RequestWithUser, @Res() response: Response) {
    const { user } = request;
    const cookie = this.authService.getCookieWithJwtToken(user.id);
    response.setHeader('Set-Cookie', cookie);
    user.password = undefined;
    return response.send(user);
  }

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  test(@Res() response: Response) {
    return response.send('secure');
  }
}
