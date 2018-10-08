import { authenticated } from "./auth.resolver";

export default {
	Query: {
		caminhoes: authenticated(async (parent, args, { db: { Caminhao } }) => {
			const caminhao = await Caminhao.find(args).sort("name");
			return caminhao.map(c => {
				return c;
			});
		}),
		caminhaoById: authenticated(async (parent, args, { db: { Caminhao } }) => {
			const caminhao = await Caminhao.findById(args.id);
			return caminhao;
		})
	},
	Mutation: {
		createCaminhao: authenticated(
			async (parent, { input }, { db: { Caminhao } }) => {
				const caminhao = await new Caminhao(input).save();
				return caminhao;
			}
		),
		updateCaminhao: authenticated(
			async (parent, { id, input }, { db: { Caminhao } }) => {
				const caminhao = await Caminhao.findById(id);
				await caminhao.set(input).save();
				return caminhao;
			}
		),
		deleteCaminhao: authenticated(
			async (parent, { id }, { db: { Caminhao } }) => {
				const caminhaoRemoved = await Caminhao.findByIdAndRemove(id);

				if (!caminhaoRemoved) {
					throw new Error("Erro ao remover o caminhão");
				}

				return caminhaoRemoved;
			}
		)
	}
};
