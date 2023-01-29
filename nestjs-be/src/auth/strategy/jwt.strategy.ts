import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';
import { Config } from 'src/enum';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    // private readonly authService: AuthService,
    protected readonly configService: ConfigService, // private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get(Config.JWT_ACCESS_TOKEN_SECRET),
    });
  }

  async validate(payload: any): Promise<any> {
    return { userId: payload.sub, usernmae: payload.username };
  }
}
