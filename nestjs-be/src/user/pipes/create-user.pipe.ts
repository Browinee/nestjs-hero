import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { Roles } from 'src/roles/entity/roles.entity';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class CreateUserPipe implements PipeTransform {
  transform(value: CreateUserDto, metadata: ArgumentMetadata) {
    if (value.roles && value.roles instanceof Array && value.roles.length > 0) {
      if ((value.roles[0] as Roles).id) {
        // Roles[]
        value.roles = value.roles.map((role) => role.id);
      }
    }
    return value;
  }
}
