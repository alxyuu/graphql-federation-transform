import { Module } from '@nestjs/common';
import { GraphQLFederationModule } from '@nestjs/graphql';
import { transformSchema, RenameTypes, RenameRootFields } from 'graphql-tools';
import { RecipesModule } from './recipes/recipes.module';

@Module({
  imports: [
    RecipesModule,
    GraphQLFederationModule.forRoot({
      autoSchemaFile: 'schema.gql',
      transformSchema: (schema) => {
        return transformSchema(schema, [
          new RenameTypes((type) => type.startsWith('_') ? type : `Hello_${type}`),
          new RenameRootFields((_operation, type) => type.startsWith('_') ? type : `Hello_${type}`),
        ]);
      },
    }),
  ],
})
export class AppModule {}
