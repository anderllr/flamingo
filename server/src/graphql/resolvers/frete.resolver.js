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

					match.date = date;
				}
				if (frotaId && frotaId !== "")
					match.frotaId = mongoose.Types.ObjectId(frotaId);
				if (clienteId && clienteId !== "")
					match.clienteId1 = mongoose.Types.ObjectId(clienteId);

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
		),
		freteDetalhe: authenticated(async (parent, { id }, { db: { Frete } }) => {
			const frete = await Frete.aggregate([
				{
					$match: {
						_id: mongoose.Types.ObjectId(id)
					}
				},
				{
					$lookup: {
						from: "caminhao", //"userinfo",       // other table name
						localField: "caminhaoId", //"userId",   // name of users table field
						foreignField: "_id", //"userId", // name of userinfo table field
						as: "caminhao" // alias for userinfo table
					}
				},
				{ $unwind: { path: "$caminhao", preserveNullAndEmptyArrays: true } },
				// Join with user_info table
				{
					$lookup: {
						from: "clientes", //"userinfo",       // other table name
						localField: "clienteId1", //"userId",   // name of users table field
						foreignField: "_id", //"userId", // name of userinfo table field
						as: "cliente" // alias for userinfo table
					}
				},
				{ $unwind: { path: "$cliente", preserveNullAndEmptyArrays: true } },
				{
					$lookup: {
						from: "clientes", //"userinfo",       // other table name
						localField: "clienteId2", //"userId",   // name of users table field
						foreignField: "_id", //"userId", // name of userinfo table field
						as: "cliente2" // alias for userinfo table
					}
				},
				{ $unwind: { path: "$cliente2", preserveNullAndEmptyArrays: true } },
				{
					$lookup: {
						from: "frota", //"userinfo",       // other table name
						localField: "frotaId", //"userId",   // name of users table field
						foreignField: "_id", //"userId", // name of userinfo table field
						as: "frota" // alias for userinfo table
					}
				},
				{ $unwind: { path: "$frota", preserveNullAndEmptyArrays: true } },
				{
					$project: {
						_id: 1,
						dtFrete: 1,
						caminhaoId: 1,
						descCaminhao: "$caminhao.name",
						placa: "$caminhao.placa",
						qtEntrega: 1,
						descCliente1: "$cliente.name",
						descCliente2: { $ifNull: ["$cliente2.name", ""] },
						nrFrota: { $ifNull: ["$frota.nrFrota", ""] },
						descFrota: { $ifNull: ["$frota.name", ""] },
						frotaTerceiro: 1,
						status: 1,
						frotaId: 1,
						clienteId1: 1,
						kmInicial: 1,
						kmCliente1: 1,
						kmCliente2: 1,
						kmFinal: 1,
						hrMunckInicial: 1,
						hrMunckFinal: 1,
						qtPedagio: 1,
						vlDespesas: 1,
						itens: 1
					}
				}
			]);

			return frete.map(
				({
					_id,
					dtFrete,
					caminhaoId,
					descCaminhao,
					placa,
					qtEntrega,
					descCliente1,
					descCliente2,
					nrFrota,
					descFrota,
					frotaTerceiro,
					status,
					frotaId,
					clienteId1,
					kmInicial,
					kmCliente1,
					kmCliente2,
					kmFinal,
					hrMunckInicial,
					hrMunckFinal,
					qtPedagio,
					vlDespesas,
					itens
				}) => ({
					id: _id,
					dtFrete,
					caminhaoId,
					descCaminhao,
					placa,
					qtEntrega,
					descCliente1,
					descCliente2,
					nrFrota,
					descFrota: `${nrFrota}-${descFrota}`,
					frotaTerceiro,
					status,
					frotaId,
					clienteId1,
					kmInicial,
					kmCliente1,
					kmCliente2,
					kmFinal,
					hrMunckInicial,
					hrMunckFinal,
					qtPedagio,
					vlDespesas,
					itens
				})
			)[0];
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
