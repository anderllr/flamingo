import mongoose from 'mongoose';

const FrotaSchema = new mongoose.Schema(
	{
		nrFrota: { type: Number, required: true },
		name: { type: String, required: true },
		ano: { type: Number, required: true },
		chassi: { type: String, required: true },
		modeloId: { type: String, required: true },
		marcaId: { type: String, required: true }
	},
	{ collection: 'frota' }
);

export const Frota = mongoose.model('Frota', FrotaSchema);
