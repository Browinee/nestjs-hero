import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  async findAll() {
    return this.userRepository.find();
  }
  async find(id: string) {
    return this.userRepository.findOne({ where: { id } });
  }
  async create(user: User) {
    const newUser = await this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }
  update(id: string, user: Partial<User>) {
    return this.userRepository.update(id, user);
  }
  remove(id: string) {
    return this.userRepository.delete(id);
  }
  findProfile(id: string): any {
    console.log('id', id);

    return this.userRepository.findOne({
      where: { id },
      relations: { profile: true },
    });
  }
}
