import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { UserStatus } from '@prisma/client';

describe('UsersService', () => {
  let service: UsersService;
  let repository: UsersRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UsersRepository],
      providers: [UsersService, UsersRepository],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<UsersRepository>(UsersRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('find one user', async () => {
    const result = {
      id: 'aaa',
      firstName: 'First',
      lastName: 'Last',
      email: 'aaa@gmail.com',
      status: UserStatus.ACTIVE,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    jest.spyOn(service, 'findOne').mockResolvedValue(result);
    expect(await service.findOne('aaa')).toMatchObject(result);
  });
});
