import { GetUserDto } from './dto/get-user.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  async findAll(query: GetUserDto) {
    const { limit = 10, page = 1, username, gender, role } = query;
    return this.userRepository.find({
      select: {
        id: true,
        username: true,
      },
      where: {
        username,
        profile: {
          gender,
        },
        roles: {
          id: role,
        },
      },
      relations: {
        roles: true,
        profile: true,
      },
      take: limit,
      skip: (page - 1) * limit,
    });
  }
  async find(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }
  async create(user: User) {
    const newUser = await this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }
  update(id: number, user: Partial<User>) {
    return this.userRepository.update(id, user);
  }
  remove(id: string) {
    return this.userRepository.delete(id);
  }
  findProfile(id: number): any {
    return this.userRepository.findOne({
      where: { id },
      relations: { profile: true },
    });
  }
}
