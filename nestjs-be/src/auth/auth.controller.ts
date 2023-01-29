import { SigninUserDto } from './dto/signin-user.dto';
import { AuthService } from './auth.service';
import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { TypormFilter } from '../filters/typeorm.filter';

@Controller('auth')
@UseFilters(new TypormFilter())
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signIn')
  async signIn(@Body() dto: SigninUserDto) {
    const { username, password } = dto;
    const token = await this.authService.signIn(username, password);
    return {
      access_token: token,
    };
  }

  @Post('/signUp')
  async signUp(@Body() dto: SigninUserDto) {
    const { username, password } = dto;
    return this.authService.signUp(username, password);
  }
}
