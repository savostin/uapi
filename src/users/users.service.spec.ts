import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import {
  UsersDummyRepository,
  oneUser,
  oneUserFull,
  oneUserUUID,
  newUser,
  newUserFull,
  goodUsers,
} from './users.repository.dummy';

describe('UsersService', () => {
  let service: UsersService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        UsersService,
        {
          provide: UsersRepository,
          useValue: UsersDummyRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create user', async () => {
    expect(await service.create(oneUser)).toMatchObject(oneUserFull);
  });

  it('update user', async () => {
    expect(await service.update(newUser)).toMatchObject(newUserFull);
  });

  it('find one user', async () => {
    expect(await service.findOne(oneUserUUID)).toMatchObject(oneUserFull);
  });

  it('find multiply users', async () => {
    expect(await service.findAll({})).toMatchObject(goodUsers);
  });
});
