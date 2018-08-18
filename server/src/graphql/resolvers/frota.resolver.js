import { authenticated } from './auth.resolver';

export default {
	Marca: {
		modelos: authenticated(async (marca, args, { db }) => {
			return marca.modelos;
		})
	},
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
		frotaByNumber: authenticated(async (parent, { nrFrota }, { db: { Frota } }) => {
			const frota = await Frota.find({ nrFrota });
			return frota[0];
		}),
		marca: authenticated(async (parent, args, { db: { Marca } }) => {
			const marca = await Marca.find(args);
			return marca.map(m => {
				return m;
			});
		}),
		marcaById: authenticated(async (parent, args, { db: { Marca } }) => {
			const marca = await Marca.findById(args.id);
			return marca;
		}),
		modelosByMarca: authenticated(async (parent, { marcaId }, { db: { Marca } }) => {
			const marca = await Marca.findById(marcaId);
			return marca.modelos;
		})
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
		createModelo: authenticated(async (parent, { marcaId, modelo }, { db: { Marca } }) => {
			const marca = await Marca.findById(marcaId);

			//Push returns number of array members
			const res = marca.modelos.push({ modelo });

			await marca.save();

			return marca.modelos[res - 1];
		}),
		updateModelo: authenticated(async (parent, { marcaId, id, modelo }, { db: { Marca } }) => {
			const marca = await Marca.findById(marcaId);
			const modeloT = marca.modelos.id(id);
			modeloT.set({ modelo });
			await marca.save();
			return marca.modelos.id(id);
		}),
		deleteModelo: authenticated(async (parent, { marcaId, id }, { db: { Marca } }) => {
			const marca = await Marca.findById(marcaId);
			const modeloRemoved = await marca.modelos.id(id).remove();
			await marca.save();

			if (!modeloRemoved) {
				throw new Error('Error removing modelo');
			}

			return modeloRemoved;
		}),
	},
};
