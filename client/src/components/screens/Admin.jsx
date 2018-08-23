import React, { Fragment } from 'react';
import Main from '../template/Main';

export default props =>
    <Fragment>
        <Main icon="home" title="Início"
            subtitle="Flamingo Web App">
            <div className='display-4'>Bem vindo!</div>
            <hr />
            <p className="mb-0">Portal de administração do App de vistoria Flamingo Service {props.user}</p>
        </Main>
    </Fragment>
