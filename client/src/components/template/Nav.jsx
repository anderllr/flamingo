import "./Nav.css";
import React from "react";
import { Link } from "react-router-dom";

export default props => (
	<aside className="menu-area">
		<nav className="menu">
			<Link to="/admin">
				<i className="fa fa-home icon" /> Início
			</Link>
			<Link to="/admin/users">
				<i className="fa fa-users icon" /> Usuários
			</Link>
			<Link to="/admin/clientes">
				<i className="fa fa-address-book icon" /> Clientes
			</Link>
			<Link to="/admin/itens">
				<i className="fa fa-compass icon" /> Itens
			</Link>
			<Link to="/admin/frota">
				<i className="fa fa-truck icon" /> Frota
			</Link>
		</nav>
		<div className="text-center logout">
			<button
				className="btn btn-outline-danger my-2 my-sm-0"
				onClick={() => {
					sessionStorage.removeItem("access_token");
					props.push("/login");
				}}
			>
				<i className="fa fa-sign-out" /> Logout
			</button>
		</div>
	</aside>
);
