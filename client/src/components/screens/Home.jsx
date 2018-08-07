import React from 'react';
import { Link } from 'react-router-dom';

export default props => (
    <div>
        <h1>Página de abertura</h1>
        <Link to="/admin">
            <i className="fa fa-home"></i> Admin
        </Link>
    </div>
)