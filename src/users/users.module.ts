import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { UsersRepository } from './users.repository';
import { PrismaClient } from '@prisma/client';

/**
 * Users module
 *
 * Expects injected Prisma Client
 * Exports: Users Service
 *
 * @export
 * @class UsersModule
 * @typedef {UsersModule}
 */
@Module({
  imports: [],
  providers: [
    UsersResolver,
    UsersService,
    UsersRepository,
    {
      provide: PrismaClient,
      useValue: new PrismaClient(),
    },
  ],
  exports: [UsersService],
})
export class UsersModule {}
