import { makeExecutableSchema } from 'graphql-tools';
import { merge } from 'lodash';

import { Query } from './query';
import { Mutation } from './mutation';

import { userTypes } from './types/user.schema';
import { personTypes } from './types/person.schema';
import { qualificationsTypes } from './types/qualifications.schema';

import userResolvers from './resolvers/user.resolver';
import personResolvers from './resolvers/person.resolver';
import qualificationsResolvers from './resolvers/qualifications.resolver';

//using lodash to merge my resolvers
//const resolvers = merge(commentResolvers, postResolvers, tokenResolvers, userResolvers);
const resolvers = merge(userResolvers, personResolvers, qualificationsResolvers);

const SchemaDefinition = `
    type Schema {
        query: Query
        mutation: Mutation
    }
`;

export default makeExecutableSchema({
    typeDefs: [SchemaDefinition, Query, Mutation, userTypes, personTypes, qualificationsTypes],
    resolvers,
});
