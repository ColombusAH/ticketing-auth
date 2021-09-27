import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from 'src/users/dto';
import { UsersService } from 'src/users/users.service';
import { CryptoService } from 'src/utils/crypto/crypto.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly cryptoService: CryptoService,
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
      console.log(user);

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
}
