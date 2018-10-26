import "./Nav.css";
import React from "react";
import { Link } from "react-router-dom";
import { SideNav, Nav } from "react-sidenav";

const theme = {
	selectionColor: "#ddd",
	color: "#fff"
};

export default props => (
	<aside className="menu-area">
		<nav className="menu">
			<SideNav defaultSelectedPath="1" theme={theme}>
				<Nav id="1">
					<Link to="/admin">
						<i className="fa fa-home icon" /> Início
					</Link>
				</Nav>
				<Nav id="2">
					<Link to="/admin">
						<i className="fa fa-align-justify icon" /> Cadastros
					</Link>
					<Nav id="1">
						<Link to="/admin/users">
							<i className="fa fa-users icon" /> Usuários
						</Link>
					</Nav>
					<Nav id="2">
						<Link to="/admin/clientes">
							<i className="fa fa-address-book icon" /> Clientes
						</Link>
					</Nav>
					<Nav id="3">
						<Link to="/admin/itens">
							<i className="fa fa-compass icon" /> Itens
						</Link>
					</Nav>
					<Nav id="4">
						<Link to="/admin/frota">
							<i className="fa fa-empire icon" /> Frota
						</Link>
					</Nav>
					<Nav id="5">
						<Link to="/admin/caminhao">
							<i className="fa fa-truck icon" /> Caminhão
						</Link>
					</Nav>
				</Nav>
				<Nav id="3">
					<Link to="/admin">
						<i className="fa fa-search icon" /> Consultas
					</Link>
					<Nav id="1">
						<Link to="/admin/consultafrete">
							<i className="fa fa-truck icon" /> Consulta Frete
						</Link>
					</Nav>
				</Nav>
			</SideNav>
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
