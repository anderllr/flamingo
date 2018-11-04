import React from 'react';
import {graphql, compose} from 'react-apollo';

import {Main} from '../template';
import {GET_FRETE_DETALHE} from '../resources/queries/freteQuery';
import {UPDATE_FRETE} from '../resources/mutations/freteMutation';

const FreteDetalhe = props => {
  if (props.freteId === '') return <div />;

  if (props.getFrete.loading) return <div>Loading...</div>;

  const update = e => {
    e.preventDefault ();
    const {
      id,
      qtEntrega,
      caminhaoId,
      dtFrete,
      clienteId1,
      frotaId,
      kmInicial,
      kmCliente1,
      kmCliente2,
      kmFinal,
      hrMunckInicial,
      hrMunckFinal,
      status,
    } = props.getFrete.freteDetalhe;
    const freteInput = {
      qtEntrega,
      caminhaoId,
      dtFrete,
      clienteId1,
      frotaId,
      kmInicial,
      kmCliente1,
      kmCliente2,
      kmFinal,
      hrMunckInicial,
      hrMunckFinal,
      status,
    };
    props
      .updateFrete ({variables: {id, freteInput}})
      .then (async () => {
        props.getFrete.refetch ();
      })
      .catch (e => {
        console.log ('Error: ', e);
      });
  };

  const renderForm = () => {
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
                className="form-control font-weight-bold"
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
                value={new Intl.NumberFormat ('pt-BR', {
                  minimumFractionDigits: 1,
                  maximumFractionDigits: 1,
                }).format (props.getFrete.freteDetalhe.kmInicial)}
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
                value={new Intl.NumberFormat ('pt-BR', {
                  minimumFractionDigits: 1,
                  maximumFractionDigits: 1,
                }).format (props.getFrete.freteDetalhe.kmCliente1)}
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
                value={new Intl.NumberFormat ('pt-BR', {
                  minimumFractionDigits: 1,
                  maximumFractionDigits: 1,
                }).format (props.getFrete.freteDetalhe.kmCliente2)}
                readOnly
              />
            </div>
          </div>
          <div className="col-12 col-md-2">
            <div className="form-group">
              <label>Km Retorno</label>
              <input
                type="text"
                className="form-control form-control-danger"
                value={new Intl.NumberFormat ('pt-BR', {
                  minimumFractionDigits: 1,
                  maximumFractionDigits: 1,
                }).format (props.getFrete.freteDetalhe.kmFinal)}
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
                value={
                  props.getFrete.freteDetalhe.hrMunckInicial
                    ? props.getFrete.freteDetalhe.hrMunckInicial
                    : ''
                }
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
                value={
                  props.getFrete.freteDetalhe.hrMunckFinal
                    ? props.getFrete.freteDetalhe.hrMunckFinal
                    : ''
                }
                readOnly
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-3">
            <div className="form-group">
              <label>Vl. Pedágio 1</label>
              <input
                type="text"
                className="form-control form-control-danger"
                value={new Intl.NumberFormat ('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format (props.getFrete.freteDetalhe.vlPedagio1)}
                readOnly
              />
            </div>
          </div>
          <div className="col-12 col-md-3">
            <div className="form-group">
              <label>Vl. Pedágio 2</label>
              <input
                type="text"
                className="form-control form-control-danger"
                value={new Intl.NumberFormat ('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format (props.getFrete.freteDetalhe.vlPedagio2)}
                readOnly
              />
            </div>
          </div>
          <div className="col-12 col-md-3">
            <div className="form-group">
              <label>Vl. Pedágio 3</label>
              <input
                type="text"
                className="form-control form-control-danger"
                value={new Intl.NumberFormat ('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format (props.getFrete.freteDetalhe.vlPedagio3)}
                readOnly
              />
            </div>
          </div>
          <div className="col-12 col-md-3">
            <div className="form-group">
              <label>Vl.Total Pedágio</label>
              <input
                type="text"
                className="form-control form-control-danger"
                value={new Intl.NumberFormat ('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format (props.getFrete.freteDetalhe.vlDespesas)}
                readOnly
              />
            </div>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-12 col-md-3">
            <div className="form-group">
              <label>Valor Km</label>
              <input
                type="text"
                className="form-control font-weight-bold"
                value={new Intl.NumberFormat ('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format (props.getFrete.freteDetalhe.vlKm)}
                readOnly
              />
            </div>
          </div>
          <div className="col-12 col-md-1">
            <div className="form-group">
              <div
                style={{
                  height: '100%',
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <button
                  style={{height: '40px', width: '40px', marginTop: 30}}
                  className="btn btn-success"
                  onClick={e => update (e)}
                >
                  <i className="fa fa-cogs" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-2">
            <div className="form-group">
              <label>Km Dest.1</label>
              <input
                type="text"
                className="form-control"
                value={new Intl.NumberFormat ('pt-BR', {
                  minimumFractionDigits: 1,
                  maximumFractionDigits: 1,
                }).format (props.getFrete.freteDetalhe.qtKmCliente1)}
                readOnly
              />
            </div>
          </div>
          <div className="col-12 col-md-2">
            <div className="form-group">
              <label>Vl.Dest.1</label>
              <input
                type="text"
                className="form-control font-weight-bold"
                value={new Intl.NumberFormat ('pt-BR', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format (props.getFrete.freteDetalhe.vlFreteCliente1)}
                readOnly
              />
            </div>
          </div>
          <div className="col-12 col-md-2">
            <div className="form-group">
              <label>Km Dest.2</label>
              <input
                type="text"
                className="form-control form-control-danger"
                value={new Intl.NumberFormat ('pt-BR', {
                  minimumFractionDigits: 1,
                  maximumFractionDigits: 1,
                }).format (props.getFrete.freteDetalhe.qtKmCliente2)}
                readOnly
              />
            </div>
          </div>
          <div className="col-12 col-md-2">
            <div className="form-group">
              <label>Vl. Dest.2</label>
              <input
                type="text"
                className="form-control font-weight-bold"
                value={new Intl.NumberFormat ('pt-BR', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format (props.getFrete.freteDetalhe.vlFreteCliente2)}
                readOnly
              />
            </div>
          </div>
          <div className="col-12 col-md-2">
            <div className="form-group">
              <label>Km Retorno</label>
              <input
                type="text"
                className="form-control"
                value={new Intl.NumberFormat ('pt-BR', {
                  minimumFractionDigits: 1,
                  maximumFractionDigits: 1,
                }).format (props.getFrete.freteDetalhe.qtKmRetorno)}
                readOnly
              />
            </div>
          </div>
          <div className="col-12 col-md-2">
            <div className="form-group">
              <label>Vl.Retorno</label>
              <input
                type="text"
                className="form-control font-weight-bold"
                value={new Intl.NumberFormat ('pt-BR', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format (props.getFrete.freteDetalhe.vlFreteRetorno)}
                readOnly
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-2">
            <div className="form-group">
              <label>Valor Munck</label>
              <input
                type="text"
                className="form-control font-weight-bold"
                value={new Intl.NumberFormat ('pt-BR', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format (props.getFrete.freteDetalhe.vlHoraMunck)}
                readOnly
              />
            </div>
          </div>
          <div className="col-12 col-md-2">
            <div className="form-group">
              <label>Horas Munck</label>
              <input
                type="text"
                className="form-control form-control-danger"
                value={props.getFrete.freteDetalhe.qtHoraMunck}
                readOnly
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-3">
            <div className="form-group">
              <label>
                <strong>Frete Total</strong>
              </label>
              <input
                type="text"
                className="form-control font-weight-bold"
                value={new Intl.NumberFormat ('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format (props.getFrete.freteDetalhe.vlFreteTotal)}
                readOnly
              />
            </div>
          </div>
          <div className="col-12 col-md-3">
            <div className="form-group">
              <label>
                <strong>Total Munck</strong>
              </label>
              <input
                type="text"
                className="form-control font-weight-bold"
                value={new Intl.NumberFormat ('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format (props.getFrete.freteDetalhe.vlMunckTotal)}
                readOnly
              />
            </div>
          </div>
          <div className="col-12 col-md-3">
            <div className="form-group">
              <label>
                <strong>Total Pedágio</strong>
              </label>
              <input
                type="text"
                className="form-control font-weight-bold"
                value={new Intl.NumberFormat ('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format (props.getFrete.freteDetalhe.vlDespesas)}
                readOnly
              />
            </div>
          </div>
          <div className="col-12 col-md-3">
            <div className="form-group">
              <label>
                <strong>TOTAL GERAL</strong>
              </label>
              <input
                type="text"
                className="form-control font-weight-bold"
                value={new Intl.NumberFormat ('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format (
                  props.getFrete.freteDetalhe.vlFreteTotal +
                    props.getFrete.freteDetalhe.vlMunckTotal +
                    props.getFrete.freteDetalhe.vlDespesas
                )}
                readOnly
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const headerProps = {
    icon: 'truck',
    title: 'Detalhamento do frete',
    subtitle: `${props.getFrete.freteDetalhe.descCaminhao} - ${props.getFrete.freteDetalhe.placa}`,
    hideIconUser: true,
  };

  return (
    <Main {...headerProps}>
      <form>{renderForm ()}</form>
    </Main>
  );
};

export default compose (
  graphql (GET_FRETE_DETALHE, {
    name: 'getFrete',
    options: props => ({
      variables: {
        id: !props.freteId || props.freteId === ''
          ? '000000000000'
          : props.freteId,
      },
      fetchPolicy: 'cache-and-network', //"network-only"
    }),
  }),
  graphql (UPDATE_FRETE, {name: 'updateFrete'})
) (FreteDetalhe);
