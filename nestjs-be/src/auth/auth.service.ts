import { UserService } from './../user/user.service';
import {
  ForbiddenException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GetUserDto } from 'src/user/dto/get-user.dto';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async signIn(username: string, password: string) {
    const user = await this.userService.find(username);
    if (!user) {
      throw new UnauthorizedException('User not existed');
    }
    const isPasswordVerified = await argon2.verify(user.password, password);
    if (!isPasswordVerified) {
      throw new UnauthorizedException('Invalid Username or Password');
    }

    return await this.jwtService.signAsync({
      username: user.username,
      sub: user.id,
    });
  }
  async signUp(username: string, password: string) {
    const user = await this.userService.find(username);
    if (user) {
      throw new UnauthorizedException('username existed');
    }
    const res = await this.userService.create({
      username,
      password,
    });
    return res;
  }
}
