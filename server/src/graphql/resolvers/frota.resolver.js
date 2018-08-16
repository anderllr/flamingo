import { authenticated } from './auth.resolver';

export default {

	Query: {
		frota: async (parent, args, { db: { Frota } }) => {
			const frota = await Frota.findById(args.id);
			return frota;
		},
		frotaByNumber: async (parent, { nrFrota }, { db: { Frota } }) => {
			const frota = await Frota.find({ nrFrota });
			return frota;
		},
		marca: async (parent, args, { db: { Marca } }) => {
			const marca = await Marca.findById(args.id);
			return marca;
		},
		modelo: async (parent, args, { db: { Modelo } }) => {
			const modelo = await Modelo.findById(args.id);
			return modelo;
		}
	},
	Mutation: {
		createFrota: authenticated(async (parent, { input }, { db: { Frota } }) => {
			const frota = new Frota(input);
			await frota.save();
			return frota;
		}),
		createMarca: authenticated(async (parent, { marca }, { db: { Marca } }) => {
			const tmarca = new Marca({ marca });
			await tmarca.save();
			return tmarca;
		}),
		createModelo: authenticated(async (parent, { modelo }, { db: { Modelo } }) => {
			const tmodelo = new Modelo({ modelo });
			await tmodelo.save();
			return tmodelo;
		}),
		updateFrota: authenticated(async (parent, { id, input }, { db: { Frota } }) => {
			const frota = await Frota.findById(id);
			await frota.set(input).save();
			return frota;
		}),
		updateMarca: authenticated(async (parent, { id, marca }, { db: { Marca } }) => {
			const tmarca = await Marca.findById(id);
			await tmarca.set({ marca }).save();
			return tmarca;
		}),
		updateModelo: authenticated(async (parent, { id, modelo }, { db: { Modelo } }) => {
			const tmodelo = await Modelo.findById(id);
			await tmodelo.set({ modelo }).save();
			return tmodelo;
		}),
		deleteFrota: authenticated(async (parent, { id }, { db: { Frota } }) => {
			const frotaRemoved = await Frota.findByIdAndRemove(id);

			if (!frotaRemoved) {
				throw new Error('Error removing person');
			}

			return frotaRemoved;
		}),
		deleteMarca: authenticated(async (parent, { id }, { db: { Marca } }) => {
			const marcaRemoved = await Marca.findByIdAndRemove(id);

			if (!marcaRemoved) {
				throw new Error('Error removing person');
			}

			return marcaRemoved;
		}),
		deleteModelo: authenticated(async (parent, { id }, { db: { Modelo } }) => {
			const modeloRemoved = await Modelo.findByIdAndRemove(id);

			if (!modeloRemoved) {
				throw new Error('Error removing person');
			}

			return modeloRemoved;
		}),
	},
};
