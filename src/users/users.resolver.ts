import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { GetUsersInput } from './dto/get-users.input';

/**
 * Users service resolver
 *
 * @export
 * @class UsersResolver
 * @typedef {UsersResolver}
 */
@Resolver('User')
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  /**
   * List Users Query
   * Expects: GetUsersInput (search criteria)
   * Returns: User[]
   */
  @Query('listUsers')
  findAll(@Args('getUsersInput') getUsersInput: GetUsersInput) {
    return this.usersService.findAll(getUsersInput);
  }

  /**
   * Get User by ID Query
   * Expects: User UUID
   * Returns: User
   */
  @Query('getUser')
  findOne(@Args('id') id: string) {
    return this.usersService.findOne(id);
  }

  /**
   * Create User Mutation
   * Expects: CreateUserInput
   * Returns: User
   */
  @Mutation('createUser')
  create(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  /**
   * Update User Mutation
   * Expects: UpdateUserInput
   * Returns: User
   */
  @Mutation('updateUser')
  update(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.update(updateUserInput);
  }
}
