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
