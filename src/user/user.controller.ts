import { ConfigService } from '@nestjs/config';
import { UserService } from './user.service';
import { Controller, Get, Post } from '@nestjs/common';
import { User } from './entity/user.entity';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private configService: ConfigService,
  ) {}

  @Get()
  getUsers(): Promise<User[]> {
    return this.userService.findAll();
  }
  @Post()
  addUser(user: User) {
    return this.userService.create(user);
  }

  @Get('/profile')
  getUserProfile() {
    return this.userService.findProfile('1');
  }
}
