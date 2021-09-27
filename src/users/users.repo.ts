import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto';
import { User } from './interfaces';

@Injectable()
export class UsersRepository {
  constructor(
    @Inject('User_MODEL')
    private userModel: Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const user = await this.userModel.create(createUserDto);
      return user.save();
    } catch (error) {
      throw error;
    }
  }
  async getOneByNickname(nickname: string) {
    return this.userModel.findOne({ nickname: nickname });
  }
  async getByKey(
    key: keyof CreateUserDto | string,
    value: CreateUserDto[keyof CreateUserDto],
  ) {
    return this.userModel.findOne({ [key]: value });
  }
}
