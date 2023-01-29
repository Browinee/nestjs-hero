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
  Headers,
  UnauthorizedException,
  ParseIntPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { TypormFilter } from 'src/filters/typeorm.filter';
import { AdminGuard } from 'src/guards/admin.guard';
import JwtAuthenticationGuard from 'src/guards/jwt.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { User } from './entity/user.entity';
import { CreateUserPipe } from './pipes/create-user.pipe';
import { UserService } from './user.service';

@Controller('users')
@UseFilters(new TypormFilter())
@UseGuards(JwtAuthenticationGuard)
export class UserController {
  constructor(
    private userService: UserService,
    private configService: ConfigService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  @Get()
  @UseGuards(AdminGuard)
  getUsers(@Query() query: GetUserDto): Promise<User[]> {
    // page, limit, condition(username, role, gender), sort
    return this.userService.findAll(query);
  }

  @Post()
  addUser(@Body(CreateUserPipe) user: CreateUserDto) {
    console.log('user', { user });
    return this.userService.create(user);
  }

  @Patch('/:id')
  updateUser(
    @Body() dto: any,
    @Param('id') id: number,
    @Headers('Authorization') headers: any,
  ) {
    console.log('user', { dto });
    if (id === headers) {
      return this.userService.update(id, dto);
    } else {
      throw new UnauthorizedException();
    }
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: any) {
    return this.userService.remove(id);
  }

  @Get('/profile')
  getUserProfile(@Query('id', ParseIntPipe) id: any) {
    return this.userService.findProfile(id);
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
