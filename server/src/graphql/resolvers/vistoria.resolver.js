import { authenticated } from "./auth.resolver";

export default {
	Query: {
		vistoria: authenticated(async (parent, args, { db: { Vistoria } }) => {
			const vistoria = await Vistoria.find(args);
			return vistoria.map(v => {
				return v;
			});
		}),
		vistoriaById: authenticated(async (parent, args, { db: { Vistoria } }) => {
			const vistoria = await Vistoria.findById(args.id);
			return vistoria;
		})
	},
	Mutation: {
		createVistoria: authenticated(
			async (parent, { input }, { db: { Vistoria } }) => {
				const vistoria = new Vistoria(input);
				await vistoria.save();
				return vistoria;
			}
		),
		updateVistoria: authenticated(
			async (parent, { id, input }, { db: { Vistoria } }) => {
				const vistoria = await Vistoria.findById(id);
				await vistoria.set(input).save();
				return vistoria;
			}
		),
		deleteVistoria: authenticated(
			async (parent, { id }, { db: { Vistoria } }) => {
				const vistoriaRemoved = await Vistoria.findByIdAndRemove(id);

				if (!vistoriaRemoved) {
					throw new Error("Error removing person");
				}

				return vistoriaRemoved;
			}
		)
	}
};
