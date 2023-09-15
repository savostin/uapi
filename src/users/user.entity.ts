import { Field, HideField, registerEnumType } from '@nestjs/graphql';
import { UserStatus } from '../graphql';

registerEnumType(UserStatus, {
  name: 'UserStatus',
  description: 'User Status',
  valuesMap: {
    CREATED: {
      description: 'Just created',
    },
    ACTIVE: {
      description: 'User is active (confirmed)',
    },
    DISABLED: {
      description: 'Disabled / banned',
    },
  },
});

export class User {
  @Field(() => String, {
    nullable: false,
  })
  id!: string;

  @Field(() => String, {
    nullable: false,
  })
  email!: string;

  @Field(() => String, {
    nullable: false,
  })
  firstName!: string;

  @Field(() => String, {
    nullable: false,
  })
  lastNameName!: string;

  @Field(() => UserStatus)
  status!: UserStatus;

  @HideField()
  createdAt!: string;

  @HideField()
  updatedAt!: string;
}
