import mongoose from 'mongoose';

const MarcaSchema = new mongoose.Schema(
	{
		marca: { type: String, required: true }
	},
	{
		collection: 'marca'
	}
)

const ModeloSchema = new mongoose.Schema(
	{
		modelo: { type: String, required: true }
	},
	{
		collection: 'modelo'
	}
)

const ItemFrotaSchema = new mongoose.Schema(
	{
		itemId: { type: String, required: true }
	}
)

const GrupoItemFrotaSchema = new mongoose.Schema(
	{
		grupoItemId: { type: String, required: true },
		itens: [ItemFrotaSchema]
	}
)

const FrotaSchema = new mongoose.Schema(
	{
		nrFrota: { type: Number, required: true },
		name: { type: String, required: true },
		ano: { type: Number, required: true },
		chassi: { type: String, required: true },
		modeloId: { type: String, required: true },
		marcaId: { type: String, required: true },
		grupos: [GrupoItemFrotaSchema]
	},
	{ collection: 'frota' }
);

export const Marca = mongoose.model('Marca', MarcaSchema);
export const Modelo = mongoose.model('Modelo', ModeloSchema);
export const Frota = mongoose.model('Frota', FrotaSchema);
