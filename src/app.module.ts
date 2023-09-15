import { Module } from '@nestjs/common';

import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UsersModule } from './users/users.module';
import { join } from 'path';
import { GraphQLFormattedError } from 'graphql';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./src/**/*.graphql'],
      formatError: (formattedError: GraphQLFormattedError) => {
        return formattedError;
      },
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
        outputAs: 'class',
        skipResolverArgs: true,
      },
      installSubscriptionHandlers: true,
    }),
    UsersModule,
  ],
})
export class AppModule {}
