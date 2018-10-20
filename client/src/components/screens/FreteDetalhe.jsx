import React from "react";
import { graphql } from "react-apollo";

import { Main } from "../template";
import { GET_FRETE_DETALHE } from "../resources/queries/freteQuery";

const FreteDetalhe = props => {
	if (props.freteId === "") return <div />;

	if (props.getFrete.loading) return <div>Loading...</div>;

	const renderForm = () => {
		console.log("Props: ", props);
		return (
			<div className="form">
				<div className="row">
					<div className="col-12 col-md-3">
						<div className="form-group">
							<label>Data</label>
							<input
								type="text"
								className="form-control form-control-danger"
								value={props.getFrete.freteDetalhe.dtFrete}
								readOnly
							/>
						</div>
					</div>
					<div className="col-12 col-md-2">
						<div className="form-group">
							<label>Entregas</label>
							<input
								type="text"
								className="form-control form-control-danger"
								value={props.getFrete.freteDetalhe.qtEntrega}
								readOnly
							/>
						</div>
					</div>
					<div className="col-12 col-md-3">
						<div className="form-group">
							<label>Status</label>
							<input
								type="text"
								className="form-control form-control-danger"
								value={props.getFrete.freteDetalhe.status}
								readOnly
							/>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-12 col-md-6">
						<div className="form-group">
							<label>Cliente</label>
							<input
								type="text"
								className="form-control form-control-danger"
								value={props.getFrete.freteDetalhe.descCliente1}
								readOnly
							/>
						</div>
					</div>
					<div className="col-12 col-md-6">
						<div className="form-group">
							<label>Cliente 2</label>
							<input
								type="text"
								className="form-control form-control-danger"
								value={props.getFrete.freteDetalhe.descCliente2}
								readOnly
							/>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-12 col-md-6">
						<div className="form-group">
							<label>Frota</label>
							<input
								type="text"
								className="form-control form-control-danger"
								value={props.getFrete.freteDetalhe.descFrota}
								readOnly
							/>
						</div>
					</div>
					<div className="col-12 col-md-6">
						<div className="form-group">
							<label>Frota Terceiro</label>
							<input
								type="text"
								className="form-control form-control-danger"
								value={props.getFrete.freteDetalhe.frotaTerceiro}
								readOnly
							/>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-12 col-md-2">
						<div className="form-group">
							<label>Km Flamingo</label>
							<input
								type="text"
								className="form-control form-control-danger"
								value={props.getFrete.freteDetalhe.kmInicial}
								readOnly
							/>
						</div>
					</div>
					<div className="col-12 col-md-2">
						<div className="form-group">
							<label>Km Destino 1</label>
							<input
								type="text"
								className="form-control form-control-danger"
								value={props.getFrete.freteDetalhe.kmCliente1}
								readOnly
							/>
						</div>
					</div>
					<div className="col-12 col-md-2">
						<div className="form-group">
							<label>Km Destino 2</label>
							<input
								type="text"
								className="form-control form-control-danger"
								value={props.getFrete.freteDetalhe.kmCliente2}
								readOnly
							/>
						</div>
					</div>
					<div className="col-12 col-md-2">
						<div className="form-group">
							<label>Km Final</label>
							<input
								type="text"
								className="form-control form-control-danger"
								value={props.getFrete.freteDetalhe.kmFinal}
								readOnly
							/>
						</div>
					</div>
					<div className="col-12 col-md-2">
						<div className="form-group">
							<label>Munck Inicial</label>
							<input
								type="text"
								className="form-control form-control-danger"
								value={props.getFrete.freteDetalhe.hrMunckInicial}
								readOnly
							/>
						</div>
					</div>
					<div className="col-12 col-md-2">
						<div className="form-group">
							<label>Munck Final</label>
							<input
								type="text"
								className="form-control form-control-danger"
								value={props.getFrete.freteDetalhe.hrMunckFinal}
								readOnly
							/>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-12 col-md-4">
						<div className="form-group">
							<label>Qtde Pedágio</label>
							<input
								type="text"
								className="form-control form-control-danger"
								value={props.getFrete.freteDetalhe.qtPedagio}
								readOnly
							/>
						</div>
					</div>
					<div className="col-12 col-md-4">
						<div className="form-group">
							<label>Valor Despesas</label>
							<input
								type="text"
								className="form-control form-control-danger"
								value={props.getFrete.freteDetalhe.vlDespesas}
								readOnly
							/>
						</div>
					</div>
				</div>
			</div>
		);
	};

	const headerProps = {
		icon: "truck",
		title: "Detalhamento do frete",
		subtitle: `${props.getFrete.freteDetalhe.descCaminhao} - ${
			props.getFrete.freteDetalhe.placa
		}`,
		hideIconUser: true
	};

	return (
		<Main {...headerProps}>
			<form>{renderForm()}</form>
		</Main>
	);
};

export default graphql(GET_FRETE_DETALHE, {
	name: "getFrete",
	options: props => ({
		variables: {
			id: !props.freteId ? null : props.freteId
		},
		fetchPolicy: "cache-and-network" //"network-only"
	})
})(FreteDetalhe);
