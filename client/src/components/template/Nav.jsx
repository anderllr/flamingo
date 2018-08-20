import './Nav.css';
import React from 'react';
import { Link } from 'react-router-dom';

export default props =>
    <aside className="menu-area">
        <nav className="menu">
            <Link to="/admin">
                <i className="fa fa-home"></i> Início
            </Link>
            <Link to="/admin/users">
                <i className="fa fa-users"></i> Usuários
            </Link>
        </nav>

        <button className="btn btn-outline-danger my-2 my-sm-0"
            onClick={() => {
                sessionStorage.removeItem('access_token');
                props.push('/login');
            }}
        >

            <i className="fa fa-sign-out"></i> Logout</button>
    </aside>;
