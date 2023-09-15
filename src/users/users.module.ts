import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { UsersRepository } from './users.repository';

@Module({
  imports: [UsersRepository],
  providers: [UsersRepository, UsersResolver, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
