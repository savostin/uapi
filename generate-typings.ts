import { GraphQLDefinitionsFactory } from '@nestjs/graphql';
import { join } from 'path';
/**
 * This script generates GraphQL types file (graphql.ts) from GraphQL schema
 * Run it from root as
 * ts-node generate-typings.ts
 */
const definitionsFactory = new GraphQLDefinitionsFactory();
definitionsFactory.generate({
  typePaths: ['./src/**/*.graphql'],
  path: join(process.cwd(), 'src/graphql.ts'),
  outputAs: 'class',
  skipResolverArgs: true,
});
