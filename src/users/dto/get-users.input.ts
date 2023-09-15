import { Field, Int, ArgsType, registerEnumType } from '@nestjs/graphql';
import { Max, Min } from 'class-validator';
import { GetUsersOrder } from '../../graphql';

registerEnumType(GetUsersOrder, {
  name: 'GetUsersOrder',
  description: 'Get Users order',
  valuesMap: {
    lastNameAsc: {
      description: 'Last Name ascending',
    },
    updatedAtAsc: {
      description: 'Updated at ascending',
    },
    updatedAtDesc: {
      description: 'Updated at descending',
    },
  },
});

@ArgsType()
export class GetUsersInput {
  @Field(() => String)
  firstName?: string;

  @Field(() => String)
  lastName?: string;

  @Field(() => String)
  email?: string;

  @Field(() => GetUsersOrder, { defaultValue: GetUsersOrder.updatedAtDesc })
  orderBy?: GetUsersOrder;

  @Field(() => Int)
  @Min(0)
  skip? = 0;

  @Field(() => Int)
  @Min(1)
  @Max(50)
  return? = 25;
}
