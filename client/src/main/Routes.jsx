import React from "react";
import { Switch, Route, Redirect } from "react-router";

import AdminRoutes from "./AdminRoutes";

import {
	Login,
	Admin,
	User,
	Clientes,
	Itens,
	Frota,
	Caminhao
} from "../components/screens";

//<Route exact path='/' component={Home} /> --retirei por não ter página inicial no caso

export default props => (
	<Switch>
		<Route exact path="/login" component={Login} />
		<AdminRoutes exact path="/admin" component={Admin} />
		<AdminRoutes path="/admin/users" component={User} />
		<AdminRoutes path="/admin/clientes" component={Clientes} />
		<AdminRoutes path="/admin/itens" component={Itens} />
		<AdminRoutes path="/admin/frota" component={Frota} />
		<AdminRoutes path="/admin/caminhao" component={Caminhao} />
		<Redirect from="*" to="/admin" />
	</Switch>
);
