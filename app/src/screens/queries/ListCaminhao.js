import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {FlatList} from 'react-native';
import {graphql} from 'react-apollo';

import {GET_CAMINHAO_LISTA} from '../../config/resources/queries/caminhaoQuery';
import ListItemCaminhao from './ListItemCaminhao';

class ListFrotaCaminhao extends Component {
  static propTypes = {
    onPress: PropTypes.func,
  };

  constructor (props) {
    super (props);
  }

  componentDidMount () {
    console.log ('Montou o Caminhão...');
    this.refetchData ();
  }

  refetchData = async () => {
    console.log ('Entrou aqui...');
    await this.props.data.refetch ();
    // this.props.updateRefetch ();
  };

  render () {
    return (
      <FlatList
        data={this.props.data.caminhaoLista}
        keyExtractor={item => item.id.toString ()}
        renderItem={({item, index}) => (
          <ListItemCaminhao
            data={item}
            onPress={() => this.props.onHandlePress (item)}
          />
        )}
      />
    );
  }
}

export default graphql (GET_CAMINHAO_LISTA) (ListFrotaCaminhao);
