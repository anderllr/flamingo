import { authenticated } from './auth.resolver';

export default {
    GrupoItem: {
        itens: authenticated(async (grupoItem, args, { db }) => {
            return grupoItem.itens;
        }),
    },
    Query: {
        grupos: authenticated(async (parent, args, { db: { GrupoItem } }) => {
            const grupos = await GrupoItem.find(args);
            return grupos.map(grupo => {
                grupo._id = grupo._id.toString();
                return grupo;
            });
        }),
        grupoItem: authenticated(async (parent, args, { db: { GrupoItem } }) => {
            const grupoItem = await GrupoItem.findById(args.id);
            return grupoItem;
        }),
    },
    Mutation: {
        createGrupoItem: authenticated(async (parent, { input }, { db: { GrupoItem } }) => {
            const grupoItem = new GrupoItem(input);
            await grupoItem.save();
            return grupoItem;
        }),
        updateGrupoItem: authenticated(async (parent, { id, input }, { db: { GrupoItem } }) => {
            const grupoItem = await GrupoItem.findById(id);
            await grupoItem.set(input).save();
            return grupoItem;
        }),
        deleteGrupoItem: authenticated(async (parent, { id }, { db: { GrupoItem } }) => {
            const grupoItemRemoved = await GrupoItem.findByIdAndRemove(id);

            if (!grupoItemRemoved) {
                throw new Error('Error removing person');
            }

            return grupoItemRemoved;
        }),
    },
};
