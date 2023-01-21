import {
  Body,
  Controller,
  Get,
  Inject,
  LoggerService,
  Patch,
  Post,
  Param,
  Delete,
  Query,
  UseFilters,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { TypormFilter } from 'src/filters/typeorm.filter';
import { GetUserDto } from './dto/get-user.dto';
import { User } from './entity/user.entity';
import { UserService } from './user.service';

@Controller('users')
@UseFilters(new TypormFilter())
export class UserController {
  constructor(
    private userService: UserService,
    private configService: ConfigService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  @Get()
  getUsers(@Query() query: GetUserDto): Promise<User[]> {
    // page, limit, condition(username, role, gender), sort
    return this.userService.findAll(query);
  }

  @Post()
  addUser(@Body() user: User) {
    console.log('user', { user });
    return this.userService.create(user);
  }

  @Patch('/:id')
  updateUser(@Body() dto: any, @Param('id') id: any) {
    console.log('user', { dto });
    return this.userService.update(id, dto);
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: any) {
    return this.userService.remove(id);
  }

  @Get('/profile')
  getUserProfile() {
    return this.userService.findProfile(1);
  }
  @Get('/logsByGroup')
  getLogsByGroup() {
    // return this.userService.findLogsByGroup('1');
  }

  // NOTE: put here to  avoid mix both /:id /profile / logsByGroup, etc
  @Get('/:id')
  getUser() {
    return 'hello';
  }
}
