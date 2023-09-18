import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

/**
 * Users repository
 * Maps required functions from injected Prisma Client
 *
 * @export
 * @class UsersRepository
 * @typedef {UsersRepository}
 */
@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaClient) {}
  update = this.prisma.user.update;
  findUnique = this.prisma.user.findUnique;
  findMany = this.prisma.user.findMany;
  create = this.prisma.user.create;
  count = this.prisma.user.count;
}
