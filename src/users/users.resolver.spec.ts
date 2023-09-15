import { Test, TestingModule } from '@nestjs/testing';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { User } from './user.entity';

describe('UsersResolver', () => {
  let resolver: UsersResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UsersRepository],
      providers: [
        UsersResolver,
        {
          provide: UsersService,
          useFactory: () => ({
            create: jest.fn((user: User) => ({
              id: '15f555e7-923d-4eb2-b020-420c8dcd7193',
              ...user,
            })),
            findAll: jest.fn(() => [
              {
                id: '15f555e7-923d-4eb2-b020-420c8dcd7193',
                firstName: 'John',
                lastName: 'Doe',
                email: 'john.doe@email.com',
              },

              {
                id: '62ac9b11-a701-4232-9d67-285197f09b17',
                firstName: 'Anna',
                lastName: 'Kestn',
                email: 'anna.kesnt@email.com',
              },
            ]),
            findOne: jest.fn((id: string) => ({
              id: id,
              firstName: 'John',
              lastName: 'Doe',
              email: 'john.doe@email.com',
            })),
          }),
        },
        UsersRepository,
      ],
    }).compile();

    resolver = module.get<UsersResolver>(UsersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('user', () => {
    it('should find and return a user', async () => {
      const user = await resolver.findOne(
        'cb2f2af3-4e71-4789-a4ca-3172e187d7cd',
      );
      expect(user).toEqual({
        id: 'cb2f2af3-4e71-4789-a4ca-3172e187d7cd',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@email.com',
      });
    });
  });

  describe('users', () => {
    it('should find and return a list of users', async () => {
      const users = await resolver.findAll({});
      expect(users).toContainEqual({
        id: '15f555e7-923d-4eb2-b020-420c8dcd7193',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@email.com',
      });
    });
  });

  describe('createUser', () => {
    it('create user', async () => {
      const user = await resolver.create({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@email.com',
      });
      expect(user).toEqual({
        id: '15f555e7-923d-4eb2-b020-420c8dcd7193',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@email.com',
      });
    });
  });
});
