import { ConfigService } from '@nestjs/config';
import { UserService } from './user.service';
import { Controller, Get, Inject, Logger, Post } from '@nestjs/common';
import { User } from './entity/user.entity';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private configService: ConfigService,
    private readonly logger: Logger,
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
  @Get('/logsByGroup')
  getLogsByGroup() {
    // return this.userService.findLogsByGroup('1');
  }
}
