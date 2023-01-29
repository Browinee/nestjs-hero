import { ClassConstructor } from 'class-transformer';
import { SerializeInterceptor } from './../interceptors/serialize.interceptor';
import { UseInterceptors } from '@nestjs/common';

export function Serialize<T>(dto: ClassConstructor<T>) {
  return UseInterceptors(new SerializeInterceptor(dto));
}
