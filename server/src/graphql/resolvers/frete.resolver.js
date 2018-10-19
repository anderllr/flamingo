import mongoose from "mongoose";
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
		}),
		freteConsulta: authenticated(
			async (
				parent,
				{ dtFreteIni, dtFreteFim, clienteId, frotaId },
				{ db: { Frete } }
			) => {
				const match = {};

				if (
					(dtFreteIni && dtFreteIni !== "") ||
					(dtFreteFim && dtFreteFim !== "")
				) {
					const date = {};
					if (dtFreteIni && dtFreteIni !== "") {
						date.$gte = `${dtFreteIni.split("/")[2]}-${
							dtFreteIni.split("/")[1]
						}-${dtFreteIni.split("/")[0]}`;
					}

					if (dtFreteFim && dtFreteFim !== "") {
						date.$lte = `${dtFreteFim.split("/")[2]}-${
							dtFreteFim.split("/")[1]
						}-${dtFreteFim.split("/")[0]}`;
					}

					console.log("Date: ", date);

					match.date = date;
				}
				if (frotaId && frotaId !== "")
					match.frotaId = mongoose.Types.ObjectId(frotaId);
				if (clienteId && clienteId !== "")
					match.clienteId1 = mongoose.Types.ObjectId(clienteId);

				console.log("Match: ", match);

				const frete = await Frete.aggregate([
					{
						$lookup: {
							from: "clientes",
							localField: "clienteId1",
							foreignField: "_id",
							as: "cliente"
						}
					},
					{ $unwind: { path: "$cliente", preserveNullAndEmptyArrays: true } },
					{
						$lookup: {
							from: "clientes",
							localField: "clienteId2",
							foreignField: "_id",
							as: "cliente2"
						}
					},
					{ $unwind: { path: "$cliente2", preserveNullAndEmptyArrays: true } },
					{
						$lookup: {
							from: "frota",
							localField: "frotaId",
							foreignField: "_id",
							as: "frota"
						}
					},
					{ $unwind: { path: "$frota", preserveNullAndEmptyArrays: true } },
					{
						$project: {
							_id: 1,
							dtFrete: 1,
							descCliente1: "$cliente.name",
							descCliente2: { $ifNull: ["$cliente2.name", ""] },
							nrFrota: { $ifNull: ["$frota.nrFrota", ""] },
							descFrota: { $ifNull: ["$frota.name", ""] },
							frotaTerceiro: 1,
							status: 1,
							frotaId: 1,
							clienteId1: 1,
							date: {
								$concat: [
									{ $substrBytes: ["$dtFrete", 6, 4] },
									"-",
									{ $substrBytes: ["$dtFrete", 3, 2] },
									"-",
									{ $substrBytes: ["$dtFrete", 0, 2] }
								]
							}
						}
					},
					{
						$match: match
					},
					{ $sort: { date: -1 } },
					{ $limit: 30 }
				]);

				return frete.map(
					({
						_id,
						dtFrete,
						descCliente1,
						descCliente2,
						nrFrota,
						descFrota,
						frotaTerceiro,
						status
					}) => ({
						id: _id,
						dtFrete,
						descCliente1,
						descCliente2,
						descFrota: `${nrFrota}-${descFrota}`,
						frotaTerceiro,
						status
					})
				);
			}
		)
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
