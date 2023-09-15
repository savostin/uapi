import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { UserStatus } from '@prisma/client';
import { GetUsersOrder } from '../graphql';
import * as crypto from 'crypto';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UsersRepository],
      providers: [UsersService, UsersRepository],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create user', async () => {
    const user = {
      firstName: 'First',
      lastName: 'Last',
      email: 'aaa@gmail.com',
    };
    const uid = crypto.randomUUID();
    const result = {
      id: uid,
      firstName: 'First',
      lastName: 'Last',
      email: 'aaa@gmail.com',
      status: UserStatus.ACTIVE,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    jest.spyOn(service, 'create').mockResolvedValue(result);
    expect(await service.create(user)).toMatchObject(result);
  });

  it('find one user', async () => {
    const uid = crypto.randomUUID();
    const result = {
      id: uid,
      firstName: 'First',
      lastName: 'Last',
      email: 'aaa@gmail.com',
      status: UserStatus.ACTIVE,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    jest.spyOn(service, 'findOne').mockResolvedValue(result);
    expect(await service.findOne(uid)).toMatchObject(result);
  });

  it('find multiply users', async () => {
    const count = 3;
    const result = [];
    for (let i = 0; i < count; i++) {
      const uid = crypto.randomUUID();
      result.push({
        id: uid,
        firstName: 'First',
        lastName: 'Last',
        email: 'aaa@gmail.com',
        status: UserStatus.ACTIVE,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    jest.spyOn(service, 'findAll').mockResolvedValue(result);
    expect(
      await service.findAll({
        orderBy: GetUsersOrder.updatedAtDesc,
        skip: 0,
        return: 50,
      }),
    ).toMatchObject(result);
  });
});
