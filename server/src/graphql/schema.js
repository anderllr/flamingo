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
import { vistoriaTypes } from "./types/vistoria.schema";

import userResolvers from "./resolvers/user.resolver";
import frotaResolvers from "./resolvers/frota.resolver";
import clienteResolvers from "./resolvers/cliente.resolver";
import grupoItemResolvers from "./resolvers/grupoitem.resolver";
import itensResolvers from "./resolvers/itens.resolver";
import uploadResolvers from "./resolvers/upload.resolver";
import vistoriaResolvers from "./resolvers/vistoria.resolver";

//using lodash to merge my resolvers
const resolvers = merge(
	userResolvers,
	frotaResolvers,
	clienteResolvers,
	grupoItemResolvers,
	itensResolvers,
	uploadResolvers,
	vistoriaResolvers
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
		uploadTypes,
		vistoriaTypes
	],
	resolvers
});
