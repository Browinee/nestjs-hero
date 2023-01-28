import { UserService } from './../user/user.service';
import { Injectable } from '@nestjs/common';
import { GetUserDto } from 'src/user/dto/get-user.dto';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}
  async signIn(username: string, password: string) {
    const res = await this.userService.findAll({ username } as GetUserDto);
    return res;
  }
  async signUp(username: string, password: string) {
    const res = await this.userService.create({
      username,
      password,
    });
  }
}
