import { Injectable, NotFoundException } from '@nestjs/common';
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

  findOneByEmail(email: string) {
    return this.repo.getByKey('email', email);
  }
  findOneById(id: string) {
    const user = this.repo.getByKey('id', id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
