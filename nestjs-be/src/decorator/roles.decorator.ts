import { ROLES } from '../enum';
import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';

export const Roles = (...roles: ROLES[]) => SetMetadata(ROLES_KEY, roles);
