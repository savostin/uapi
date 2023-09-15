import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

//@Injectable()
export class UsersRepository {
  private readonly prisma: PrismaClient = new PrismaClient();
  update = this.prisma.user.update;
  findUnique = this.prisma.user.findUnique;
  findMany = this.prisma.user.findMany;
  create = this.prisma.user.create;
  count = this.prisma.user.count;
}
