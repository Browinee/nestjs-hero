import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES } from 'src/enum';
import { UserService } from 'src/user/user.service';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector, private userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // jwt -> userId -> user -> roles
    const requiredRoles = this.reflector.getAllAndMerge<ROLES[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const req = context.switchToHttp().getRequest();
    // user -> roles -> menu -> CURD + M, C1,C2,C3
    const user = await this.userService.find(req.user.username);

    const roleIds = user.roles.map((o) => o.id);

    const flag = requiredRoles.some((role) => roleIds.includes(role));
    return flag;
  }
}
