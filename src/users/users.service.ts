import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { UpdateUserDto, CreateUserDto } from './dto';
import { User } from './interfaces';
import { UsersRepository } from './users.repo';

@Injectable()
export class UsersService {
  constructor(private repo: UsersRepository) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const user = await this.repo.create(createUserDto);
      return user;
    } catch (error) {
      throw error;
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  findOneById(id: string) {
    return id;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
