import { Controller, Get, Inject, LoggerService, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { User } from './entity/user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
    private configService: ConfigService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  @Get()
  getUsers(): Promise<User[]> {
    return this.userService.findAll();
  }
  @Get('/:id')
  getUser() {
    return 'hello';
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
