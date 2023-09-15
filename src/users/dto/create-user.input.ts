import { ArgsType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsDefined } from 'class-validator';

@ArgsType()
export class CreateUserInput {
  @IsDefined()
  @IsNotEmpty()
  firstName!: string;

  @IsDefined()
  @IsNotEmpty()
  lastName!: string;

  @IsDefined()
  @IsEmail()
  email!: string;
}
