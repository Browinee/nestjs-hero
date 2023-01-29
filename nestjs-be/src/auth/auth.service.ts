import { UserService } from './../user/user.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { GetUserDto } from 'src/user/dto/get-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async signIn(username: string, password: string) {
    const user = await this.userService.find(username);
    if (user && user.password === password) {
      return await this.jwtService.signAsync({
        username: user.username,
        sub: user.id,
      });
    }
    throw new UnauthorizedException();
  }
  async signUp(username: string, password: string) {
    const res = await this.userService.create({
      username,
      password,
    });
  }
}
