import React, { Fragment } from 'react';
import Main from '../template/Main';

export default props =>
    <Fragment>
        <Main icon="home" title="Início"
            subtitle="Segundo projeto react">
            <div className='display-4'>Welcome!</div>
            <hr />
            <p className="mb-0">App to register personal information to show in personal public profile! ---> {props.user}</p>
        </Main>
    </Fragment>
