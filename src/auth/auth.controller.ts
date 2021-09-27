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
    return response.send(user);
  }

  @Post('logout')
  @UseGuards(JwtAuthenticationGuard)
  logout(@Req() request: RequestWithUser, @Res() response: Response) {
    response.setHeader('Set-cookie', this.authService.getCookieForLogOut());
    return response.sendStatus(HttpStatus.OK);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get('currentuser')
  currentuser(@Req() request: RequestWithUser) {
    const user = request.user;
    return user;
  }
}
