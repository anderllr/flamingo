import mongoose from "mongoose";

const ItemCaminhaoSchema = new mongoose.Schema({
	item: { type: String, required: true }
});

const CaminhaoSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		ano: { type: Number, required: true },
		placa: { type: String, required: false },
		itens: [ItemCaminhaoSchema]
	},
	{ collection: "caminhao" }
);

export const Caminhao = mongoose.model("Caminhao", CaminhaoSchema);
