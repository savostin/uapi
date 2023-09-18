import * as crypto from 'crypto';
import { UserStatus } from '@prisma/client';

/**
 * Dummy Users repository for tests
 *
 *
 */

export const oneUserUUID = crypto.randomUUID();
export const oneUser = {
  firstName: 'First',
  lastName: 'Last',
  email: 'aaa@gmail.com',
};
export const oneUserFull = {
  id: oneUserUUID,
  ...oneUser,
  status: UserStatus.ACTIVE,
  createdAt: new Date(),
  updatedAt: new Date(),
};

/**
 * Predefined list of users
 */
export const goodUsers = [
  oneUserFull,
  {
    id: crypto.randomUUID(),
    firstName: 'Another',
    lastName: 'User',
    email: 'another@gmail.com',
    status: UserStatus.CREATED,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: crypto.randomUUID(),
    firstName: 'Third',
    lastName: 'User',
    email: 'third@gmail.com',
    status: UserStatus.DISABLED,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: crypto.randomUUID(),
    firstName: 'Bill',
    lastName: 'Gates',
    email: 'bill@gmail.com',
    status: UserStatus.DISABLED,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: crypto.randomUUID(),
    firstName: 'Sherlock',
    lastName: 'Holmes',
    email: 'elementary@gmail.com',
    status: UserStatus.ACTIVE,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

/**
 * New user to create
 */
export const newUser = {
  id: oneUserUUID,
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@mail.com',
};

/**
 * New user must be returned
 */
export const newUserFull = {
  ...newUser,
  status: oneUserFull.status,
  createdAt: oneUserFull.createdAt,
  updatedAt: oneUserFull.updatedAt,
};

/**
 * The repository
 * TODO: create RepositoryInterface (!)
 */
export const UsersDummyRepository = {
  update: jest.fn().mockResolvedValue(newUserFull),
  findUnique: jest.fn().mockResolvedValue(oneUserFull),
  findMany: jest.fn().mockResolvedValue(goodUsers),
  create: jest.fn().mockResolvedValue(oneUserFull),
  count: jest.fn().mockResolvedValue(goodUsers.length),
};
