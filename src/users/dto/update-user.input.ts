import { ArgsType } from '@nestjs/graphql';
import { IsUUID, IsAlpha, IsEmail, IsOptional } from 'class-validator';

@ArgsType()
export class UpdateUserInput {
  @IsUUID()
  id: string;

  @IsAlpha()
  @IsOptional()
  firstName: string;

  @IsAlpha()
  @IsOptional()
  lastName: string;

  @IsEmail()
  @IsOptional()
  email: string;
}
