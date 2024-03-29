import React, {Component, Fragment} from 'react';
import {View} from 'react-native';
import {verticalScale, moderateScale} from 'react-native-size-matters';
import {graphql, compose} from 'react-apollo';

import {Dropdown} from '../components/Dropdown';
import {Container} from '../components/Container';
import {RoundButton} from '../components/Button';
import {InputWithTitle} from '../components/InputText';
import styles from './styles';

import {ListFrotaSaida, ListFrotaDevolucao, ListCaminhao} from './queries';
import {GET_CLIENTES} from '../config/resources/queries/clientesQuery';
import {GET_FROTA} from '../config/resources/queries/frotaQuery';

class Vistoria extends Component {
  constructor (props) {
    super (props);
    this.state = {
      active: 'saida',
      nrFrota: 0,
      name: '',
      cliente: '',
      dtInicio: '',
      dtFim: '',
      nrFrotaSaida: 0,
      nameSaida: '',
      idCliente: '',
      descCliente: '',
      idFrota: '',
      descFrota: '',
      frotaId: null,
      clienteId: null,
      refetchSaida: false,
      hideFrete: false,
    };
  }

  handleInputChange = (field, value) => {
    if (field === 'nrFrota') {
      if (!value) value = 0;
      else if (value === '') value = 0;
      else value = parseInt (value);
    }
    const newState = {
      ...this.state,
      [field]: value,
    };
    this.setState (newState);
  };

  onHandlePress = item => {
    //TODO Finish handle to other pages
    this.props.navigation.navigate ('Saida', {
      frota: item,
      onSearchSaida: this.onSearchSaida.bind (this),
    });
  };

  onHandleCaminhao = ({id, freteId}) => {
    this.setState ({hideFrete: true});
    //TODO Finish handle to other pages
    this.props.navigation.navigate ('Frete', {
      caminhaoId: id,
      freteId: freteId,
      onSearchCaminhao: this.onSearchCaminhao.bind (this),
      now: Date.now (),
    });
  };

  onHandleDev = ({id, clienteId, frotaId}) => {
    //TODO Finish handle to other pages
    this.props.navigation.navigate ('Devolucao', {
      id,
      clienteId,
      frotaId,
      onSearchSaida: this.onSearchSaida.bind (this),
    });
  };

  onSearchCaminhao = () => {
    this.setState ({hideFrete: false});
  };
  onSearchSaida = () => {
    const {nrFrota, name} = this.state;
    this.setState ({
      nrFrotaSaida: nrFrota,
      nameSaida: name,
      refetchSaida: true,
    });
  };

  onSearchDevolucao = () => {
    const {idCliente, idFrota} = this.state;
    this.setState ({
      frotaId: idFrota,
      clienteId: idCliente,
    });
  };

  onChangeDropdown = (option, type) => {
    if (type === 'cliente') {
      this.setState ({idCliente: option.key, descCliente: option.label});
    } else if (type === 'frota') {
      this.setState ({idFrota: option.key, descFrota: option.label});
    }
  };

  /**************************************************************************/
  /* ROTINAS PARA OS BUTTONS LATERAIS */

  showDevolucao = () => {
    this.setState ({
      active: 'devolucao',
      idFrota: '',
      descFrota: '',
      idCliente: '',
      descCliente: '',
      frotaId: '',
      clienteId: '',
    });
  };

  renderSaida () {
    return (
      <Fragment>
        <View
          style={{
            flexDirection: 'row',
            marginBottom: verticalScale (2),
            marginTop: verticalScale (2),
            justifyContent: 'flex-start',
          }}
        >
          <InputWithTitle
            title="Número"
            size={40}
            height={32}
            keyboardType="numeric"
            onChangeText={value => this.handleInputChange ('nrFrota', value)}
            value={
              this.state.nrFrota === 0 ? '' : this.state.nrFrota.toString ()
            }
          />
          <InputWithTitle
            title="Nome da Frota"
            size={85}
            height={32}
            onChangeText={value => this.handleInputChange ('name', value)}
            value={this.state.name}
          />
          <View
            style={{
              marginTop: verticalScale (6),
            }}
          >
            <RoundButton
              text="BUSCAR"
              size={70}
              height={32}
              fontSize={8}
              icon={{name: 'search', type: 'ion'}}
              active={false}
              onPress={() => this.onSearchSaida ()}
            />
          </View>
        </View>
        <ListFrotaSaida
          onHandlePress={this.onHandlePress}
          name={this.state.nameSaida}
          nrFrota={this.state.nrFrotaSaida}
          refetch={this.state.refetchSaida}
          updateRefetch={() => this.setState ({refetchSaida: false})}
        />
      </Fragment>
    );
  }
  // TODO: button to search devolucao
  renderDevolucao () {
    const clientes = [];

    if (!this.props.getClientes.loading && this.props.getClientes.clientes) {
      this.props.getClientes.clientes.map (({id, name}) => {
        clientes.push ({key: id, label: name});
      });
    }

    const frota = [];

    if (!this.props.getFrota.loading && this.props.getFrota.frota) {
      this.props.getFrota.frota.map (({id, nrFrota, name}) => {
        frota.push ({key: id, label: `${nrFrota}-${name}`});
      });
    }

    return (
      <Fragment>
        <View
          style={{
            flexDirection: 'row',
            marginBottom: verticalScale (2),
            marginTop: verticalScale (2),
            justifyContent: 'flex-start',
          }}
        >
          <Dropdown
            data={frota}
            title="Frota"
            placeholder="Selecione a frota"
            height={32}
            size={172}
            value={this.state.descFrota}
            onChange={option => this.onChangeDropdown (option, 'frota')}
          />
          <Dropdown
            data={clientes}
            title="Cliente"
            placeholder="Selecione o cliente"
            height={32}
            size={172}
            value={this.state.descCliente}
            onChange={option => this.onChangeDropdown (option, 'cliente')}
          />
          <View
            style={{
              marginTop: verticalScale (7),
            }}
          >
            <RoundButton
              text="BUSCAR"
              size={70}
              height={32}
              fontSize={8}
              icon={{name: 'search', type: 'ion'}}
              active={false}
              onPress={() => this.onSearchDevolucao ()}
            />
          </View>
        </View>
        <ListFrotaDevolucao
          onHandlePress={this.onHandleDev}
          frotaId={this.state.frotaId}
          clienteId={this.state.clienteId}
          refetch={this.state.refetchSaida}
          updateRefetch={() => this.setState ({refetchSaida: false})}
        />
      </Fragment>
    );
  }

  renderFrete () {
    if (this.state.hideFrete) return <View />;
    return <ListCaminhao onHandlePress={this.onHandleCaminhao} />;
  }

  renderConsulta () {
    return (
      <View>
        <View
          style={{
            flexDirection: 'row',
            marginBottom: verticalScale (2),
            marginTop: verticalScale (2),
            justifyContent: 'flex-start',
          }}
        >
          <InputWithTitle
            title="Número da Frota"
            size={70}
            onChangeText={value => this.handleInputChange ('nrFrota', value)}
            value={this.state.nrFrota.toString ()}
          />
          <InputWithTitle
            title="Nome da Frota"
            size={120}
            onChangeText={value => this.handleInputChange ('name', value)}
            value={this.state.name}
          />
          <InputWithTitle
            title="Cliente"
            size={120}
            onChangeText={value => this.handleInputChange ('cliente', value)}
            value={this.state.cliente}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginBottom: 20,
            marginTop: 5,
            justifyContent: 'flex-start',
            alignItems: 'flex-end',
          }}
        >
          <InputWithTitle
            title="Data de"
            size={80}
            onChangeText={value => this.handleInputChange ('dtInicio', value)}
            value={this.state.dtInicio}
          />
          <InputWithTitle
            title="Até"
            size={80}
            onChangeText={value => this.handleInputChange ('dtFim', value)}
            value={this.state.dtFim}
          />
          <InputWithTitle
            title="Status"
            size={80}
            onChangeText={value => this.handleInputChange ('status', value)}
            value={this.state.status}
          />
          <RoundButton
            text="BUSCAR"
            size={60}
            height={30}
            fontSize={8}
            icon={{name: 'search', type: 'ion'}}
            onPress={() => console.log ('Buscou')}
          />
        </View>
      </View>
    );
  }

  render () {
    return (
      <Container backgroundColor={'#fff'}>
        <View style={styles.asideMain}>
          <RoundButton
            text="SAÍDA"
            sizeP="75%"
            height={50}
            fontSize={8}
            icon={{name: 'exit', type: 'ion'}}
            onPress={() => this.setState ({active: 'saida'})}
            active={this.state.active === 'saida'}
          />
          <RoundButton
            text="DEVOLUÇÃO"
            sizeP="75%"
            height={50}
            fontSize={8}
            icon={{name: 'return-left', type: 'ion'}}
            onPress={() => this.showDevolucao ()}
            active={this.state.active === 'devolucao'}
          />
          <RoundButton
            text="FRETE"
            sizeP="75%"
            height={50}
            fontSize={8}
            icon={{name: 'truck', type: 'fa'}}
            onPress={() => this.setState ({active: 'frete', hideFrete: false})}
            active={this.state.active === 'frete'}
          />

        </View>
        <View style={styles.backgroundMain}>
          {this.state.active === 'saida'
            ? this.renderSaida ()
            : this.state.active === 'devolucao'
                ? this.renderDevolucao ()
                : this.state.active === 'frete'
                    ? this.renderFrete ()
                    : this.renderConsulta ()}
        </View>
      </Container>
    );
  }
}
/*
const mapStateToProps = state => ({
	token: state.reducerLogin.token
});

const WithGraphql = graphql(GET_CLIENTES)(Vistoria);

export default connect(
	mapStateToProps,
	{ changeToken }
)(WithGraphql);


export default compose(
	connect(mapStateToProps, {changeToken}),
	graphql(GET_CLIENTES),
  )(RepositoryList); 
*/

export default compose (
  graphql (GET_CLIENTES, {name: 'getClientes'}),
  graphql (GET_FROTA, {name: 'getFrota'})
) (Vistoria);
