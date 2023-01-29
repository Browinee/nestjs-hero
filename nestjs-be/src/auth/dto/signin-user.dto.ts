import {
  ValidationArguments,
  IsNotEmpty,
  IsString,
  Length,
} from 'class-validator';

export class SigninUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(6, 20, {
    // message: (args: ValidationArguments) => {
    //   console.log('arg', args);
    //   return '';
    // },
  })
  username: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 32)
  password: string;
}
