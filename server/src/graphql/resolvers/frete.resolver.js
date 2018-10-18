import { authenticated } from "./auth.resolver";

export default {
	Query: {
		frete: authenticated(async (parent, args, { db: { Frete } }) => {
			const frete = await Frete.find(args).sort({ dtFrete: -1 });
			return frete.map(f => {
				return f;
			});
		}),
		freteById: authenticated(async (parent, args, { db: { Frete } }) => {
			const frete = await Frete.findById(args.id);
			return frete;
		})
	},
	Mutation: {
		createFrete: authenticated(async (parent, { input }, { db: { Frete } }) => {
			const frete = await new Frete(input).save();
			return frete;
		}),
		updateFrete: authenticated(
			async (parent, { id, input }, { db: { Frete } }) => {
				const frete = await Frete.findById(id);
				await frete.set(input).save();
				return frete;
			}
		),
		deleteFrete: authenticated(async (parent, { id }, { db: { Frete } }) => {
			const freteRemoved = await Frete.findByIdAndRemove(id);

			if (!freteRemoved) {
				throw new Error("Erro ao remover o frete");
			}

			return freteRemoved;
		}),
		deleteFreteAll: authenticated(async (parent, args, { db: { Frete } }) => {
			const freteRemoved = await Frete.deleteMany({});

			if (!freteRemoved) {
				throw new Error("Erro ao remover o frete");
			}

			return freteRemoved;
		})
	}
};
