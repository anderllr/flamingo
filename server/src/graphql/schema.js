import { makeExecutableSchema } from "graphql-tools";
import { merge } from "lodash";

import { Query } from "./query";
import { Mutation } from "./mutation";

import { userTypes } from "./types/user.schema";
import { frotaTypes } from "./types/frota.schema";
import { clienteTypes } from "./types/cliente.schema";
import { grupoItemTypes } from "./types/grupoitem.schema";
import { itensTypes } from "./types/itens.schema";
import { uploadTypes } from "./types/upload.schema";

import userResolvers from "./resolvers/user.resolver";
import frotaResolvers from "./resolvers/frota.resolver";
import clienteResolvers from "./resolvers/cliente.resolver";
import grupoItemResolvers from "./resolvers/grupoitem.resolver";
import itensResolvers from "./resolvers/itens.resolver";
import { GraphQLUpload } from "apollo-upload-server";

const resolverUp = {
	Upload: GraphQLUpload
};
//using lodash to merge my resolvers
//const resolvers = merge(commentResolvers, postResolvers, tokenResolvers, userResolvers);
const resolvers = merge(
	userResolvers,
	frotaResolvers,
	clienteResolvers,
	grupoItemResolvers,
	itensResolvers,
	resolverUp
);

const SchemaDefinition = `
    type Schema {
        query: Query
        mutation: Mutation
    }
`;

export default makeExecutableSchema({
	typeDefs: [
		SchemaDefinition,
		Query,
		Mutation,
		userTypes,
		frotaTypes,
		clienteTypes,
		grupoItemTypes,
		itensTypes,
		uploadTypes
	],
	resolvers
});
