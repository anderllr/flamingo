import React from 'react';
import PropTypes from 'prop-types';
import { View, Image } from 'react-native';

import styles from './styles';

const Icon = ({ iconType }) => {
    
    const imageIcon = {
        ABA: require('./images/abastecimento.png'),
        APL: require('./images/aplicacao.png'),
        FIN: require('./images/financeiro.png'),
        INV: require('./images/inventario.png'),
        MAQ: require('./images/maquinas.png'),   
        PRA: require('./images/pragas.png')                             
    };

    return (
        <View>
            {iconType === 'ABA' ? <Image style={styles.icon} resizeMode='contain' source={imageIcon.ABA} /> :
             iconType === 'APL' ? <Image style={styles.icon} resizeMode='contain' source={imageIcon.APL} /> :
             iconType === 'FIN' ? <Image style={styles.icon} resizeMode='contain' source={imageIcon.FIN} /> :
             iconType === 'INV' ? <Image style={styles.icon} resizeMode='contain' source={imageIcon.INV} /> :
             iconType === 'MAQ' ? <Image style={styles.icon} resizeMode='contain' source={imageIcon.MAQ} /> :                                       
             <Image style={styles.icon} resizeMode='contain' source={imageIcon.PRA} />}
           
        </View>
    )
};

Icon.propTypes = {
    iconType: PropTypes.string
};

export default Icon;