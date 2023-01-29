import { SigninUserDto } from './dto/signin-user.dto';
import { AuthService } from './auth.service';
import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { TypormFilter } from '../filters/typeorm.filter';

@Controller('auth')
@UseFilters(new TypormFilter())
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signIn')
  signIn(@Body() dto: SigninUserDto) {
    const { username, password } = dto;
    return this.authService.signIn(username, password);
  }

  @Post('/signUp')
  signUp(@Body() dto: SigninUserDto) {
    const { username, password } = dto;
    return this.authService.signUp(username, password);
  }
}
