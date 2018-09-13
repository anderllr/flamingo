import { authenticated } from "./auth.resolver";

export default {
	Query: {
		frota: authenticated(async (parent, args, { db: { Frota } }) => {
			const frota = await Frota.find(args);
			return frota.map(f => {
				return f;
			});
		}),
		frotaById: authenticated(async (parent, args, { db: { Frota } }) => {
			const frota = await Frota.findById(args.id);
			return frota;
		}),
		frotaByNumber: authenticated(
			async (parent, { nrFrota }, { db: { Frota } }) => {
				const frota = await Frota.find({ nrFrota });
				return frota[0];
			}
		),
		frotaCaminhao: authenticated(async (parent, args, { db: { Frota } }) => {
			const frota = await Frota.find({ caminhao: true });
			return frota.map(f => {
				return f;
			});
		}),
		frotaGrupoItem: authenticated(
			async (parent, { id }, { db: { GrupoItem, Frota } }) => {
				const frota = await Frota.findById(id);
				const grupoAll = await GrupoItem.find({});
				const exceptGrupos = [];
				frota.exceptGrupos.map(({ grupoItemId, exceptItens }) => {
					const grupo = grupoAll.filter(g => g.id === grupoItemId)[0];
					const exceptIt = exceptItens.map(it => it.itemId);
					const itens = grupo.itens.map(it => it.id);
					const itensRestantes = itens.filter(i => !exceptIt.includes(i));

					if (itensRestantes.length === 0) {
						exceptGrupos.push(grupoItemId);
					}
				});
				const grupoItem = await GrupoItem.find({
					_id: { $nin: exceptGrupos }
				});
				return grupoItem.map(grupo => {
					return grupo;
				});
			}
		),
		frotaItensByGrupo: authenticated(
			async (parent, { id, grupoItemId }, { db: { GrupoItem, Frota } }) => {
				const frota = await Frota.findById(id);
				const grupo = await GrupoItem.findById(grupoItemId);
				return grupo.itens.filter(
					i => !frota.exceptGrupos.exceptItens.find(e => e.itemId === i.id)
				);
				/*const exceptGrupos = [];
				
				frota.exceptGrupos.map(({ grupoItemId, exceptItens }) => {
					const grupo = grupoAll.filter(g => g.id === grupoItemId)[0];
					const exceptIt = exceptItens.map(it => it.itemId);
					const itens = grupo.itens.map(it => it.id);
					const itensRestantes = itens.filter(i => !exceptIt.includes(i));

					if (itensRestantes.length === 0) {
						exceptGrupos.push(grupoItemId);
					}
				});
				const grupoItem = await GrupoItem.find({
					_id: { $nin: exceptGrupos }
				});
				return grupoItem.map(grupo => {
					return grupo;
				});
				*/
			}
		)
	},
	Mutation: {
		createFrota: authenticated(async (parent, { input }, { db: { Frota } }) => {
			const frota = new Frota(input);
			await frota.save();
			return frota;
		}),
		updateFrota: authenticated(
			async (parent, { id, input }, { db: { Frota } }) => {
				const frota = await Frota.findById(id);
				await frota.set(input).save();
				return frota;
			}
		),
		deleteFrota: authenticated(async (parent, { id }, { db: { Frota } }) => {
			const frotaRemoved = await Frota.findByIdAndRemove(id);

			if (!frotaRemoved) {
				throw new Error("Error removing person");
			}

			return frotaRemoved;
		})
	}
};
