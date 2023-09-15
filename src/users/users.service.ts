import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { GetUsersInput } from './dto/get-users.input';
import { GetUsersOrder } from '../graphql';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly repository: UsersRepository) {}
  create(createUserInput: CreateUserInput) {
    return this.repository.create({
      data: {
        firstName: createUserInput.firstName,
        lastName: createUserInput.lastName,
        email: createUserInput.email,
      },
    });
  }

  findAll(getUsersInput: GetUsersInput) {
    const and: object[] = ['email', 'firstName', 'lastName', 'status'].map(
      (k) => {
        return k == 'status'
          ? { [k]: { equals: getUsersInput[k] } }
          : { [k]: { contains: getUsersInput[k], mode: 'insensitive' } };
      },
    );
    let orderBy;
    switch (getUsersInput.orderBy) {
      case GetUsersOrder.lastNameAsc:
        orderBy = { lastName: 'asc' };
        break;
      case GetUsersOrder.updatedAtAsc:
        orderBy = { updatedAt: 'asc' };
        break;
      case GetUsersOrder.updatedAtDesc:
        orderBy = { updatedAt: 'desc' };
        break;
      default:
        orderBy = { updatedAt: 'desc' };
    }
    return this.repository.findMany({
      where: {
        AND: and,
      },
      orderBy: orderBy,
      take: getUsersInput.return,
      skip: getUsersInput.skip,
    });
  }

  findOne(id: string) {
    return this.repository.findUnique({ where: { id: id } });
  }

  update(updateUserInput: UpdateUserInput) {
    return this.repository.update({
      where: { id: updateUserInput.id },
      data: updateUserInput,
    });
  }
}
