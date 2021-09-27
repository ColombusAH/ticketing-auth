import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto, UpdateUserDto } from 'src/users/dto';
import { UsersService } from 'src/users/users.service';
import { CryptoService } from 'src/utils/crypto/crypto.service';
import { TokenPayload } from './token-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly cryptoService: CryptoService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  public async register(createUserDto: CreateUserDto) {
    // const hashedPassword = await this.cryptoService.hash(
    //   createUserDto.password,
    // );
    try {
      return this.usersService.create({
        ...createUserDto,
        // password: hashedPassword,
      });
    } catch (error) {
      throw error;
    }
  }

  public async getAuthenticatedUser(email: string, password: string) {
    try {
      const user = await this.usersService.findOneByEmail(email);
      const isPasswordMatching = await this.cryptoService.compare(
        user.password,
        password,
      );
      if (!isPasswordMatching) {
        throw new HttpException(
          'Wrong credentials provided',
          HttpStatus.BAD_REQUEST,
        );
      }
      user.password = undefined;
      return user;
    } catch (error) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  public getCookieWithJwtToken(userId: string) {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload);
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      'JWT_EXPIRATION_TIME',
    )}`;
  }

  public getCookieForLogOut() {
    return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
  }
}
