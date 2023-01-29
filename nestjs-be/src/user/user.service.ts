import { CreateUserDto } from './dto/create-user.dto';
import { genQuery } from './../utils/query';
import { GetUserDto } from './dto/get-user.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { User } from './entity/user.entity';
import { Roles } from '../roles/entity/roles.entity';
import { Logs } from '../logs/entity/logs.entity';
import * as argon2 from 'argon2';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Logs) private readonly logsRepository: Repository<Logs>,
    @InjectRepository(Roles)
    private readonly rolesRepository: Repository<Roles>,
  ) {}
  async findAll(query: GetUserDto) {
    const { limit = 10, page = 1, username, gender, role } = query;
    // return this.userRepository.find({
    //   select: {
    //     id: true,
    //     username: true,
    //   },
    //   where: {
    //     username,
    //     profile: {
    //       gender,
    //     },
    //      roles: {
    //       id: role,
    //     },
    //   },
    //   relations: {
    //     roles: true,
    //     profile: true,
    //   },
    //   take: limit,
    //   skip: (page - 1) * limit,
    // });
    const queryBuilder = this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.profile', 'profile')
      .leftJoinAndSelect('user.roles', 'roles');

    // NOTE: 1=1 means true, so andWhere can just execute to next condition
    //https://github.com/typeorm/typeorm/issues/3103

    const obj = {
      'user.username': username,
      'profile.gender': gender,
      'roles.id': role,
    };
    genQuery<User>(queryBuilder, obj);

    return queryBuilder
      .take(limit)
      .skip((page - 1) * limit)
      .getMany();
  }
  async find(username: string) {
    return this.userRepository.findOne({
      where: { username },
      relations: ['roles'],
    });
  }
  async create(user: Partial<User>) {
    if (!user.roles) {
      const role = await this.rolesRepository.findOne({ where: { id: 3 } });
      user.roles = [role];
    }
    if (user.roles instanceof Array && typeof user.roles[0] === 'number') {
      user.roles = await this.rolesRepository.find({
        where: {
          id: In(user.roles as unknown as number[]),
        },
      });
    }
    const newUser = await this.userRepository.create(user);
    newUser.password = await argon2.hash(newUser.password);
    const res = this.userRepository.save(newUser);
    return res;
  }
  async update(id: number, user: Partial<User>) {
    // NOTE: for relations
    const userTemp = await this.findProfile(id);
    const newUser = this.userRepository.merge(userTemp, user);
    return this.userRepository.save(newUser);

    // NOTE single entity
    // return this.userRepository.update(id, user)
  }
  remove(id: number) {
    return this.userRepository.delete(id);
  }
  findProfile(id: number): any {
    return this.userRepository.findOne({
      where: { id },
      relations: { profile: true },
    });
  }
}
