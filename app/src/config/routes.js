import { createStackNavigator } from "react-navigation";

import {
	Login,
	Saida,
	Vistoria,
	SaidaFotos,
	Devolucao,
	DevolucaoFotos
} from "../screens";
import { CameraScreen } from "../components/CameraScreen";

const LoginStack = createStackNavigator(
	{
		Login: {
			screen: Login,
			navigationOptions: {
				headerTitle: "Login",
				headerTintColor: "white",
				headerStyle: {
					backgroundColor: "#00665a"
				}
			}
		}
	},
	{
		headerMode: "screen"
	}
);

const HomeStack = createStackNavigator(
	{
		Vistoria: {
			screen: Vistoria,
			navigationOptions: {
				headerTitle: "Vistoria",
				headerTintColor: "white",
				headerStyle: {
					backgroundColor: "#00665a"
				}
			}
		},
		Devolucao: {
			screen: Devolucao,
			navigationOptions: {
				headerTitle: "Devolução",
				headerTintColor: "white",
				headerStyle: {
					backgroundColor: "#00665a"
				}
			}
		},
		DevolucaoFotos: {
			screen: DevolucaoFotos,
			navigationOptions: {
				headerTitle: "Fotos da devolução",
				headerTintColor: "white",
				headerStyle: {
					backgroundColor: "#00665a"
				}
			}
		},
		Saida: {
			screen: Saida,
			navigationOptions: {
				headerTitle: "Checagem de Saída",
				headerTintColor: "white",
				headerStyle: {
					backgroundColor: "#00665a"
				}
			}
		},
		SaidaFotos: {
			screen: SaidaFotos,
			navigationOptions: {
				headerTitle: "Fotos de saída de frota",
				headerTintColor: "white",
				headerStyle: {
					backgroundColor: "#00665a"
				}
			}
		},
		CameraScreen: {
			screen: CameraScreen,
			navigationOptions: {
				header: null
			}
		}
	},
	{
		initialRouteName: "Vistoria",
		headerMode: "screen"
	}
);

export const createRootNavigator = (signedIn = false) => {
	return createStackNavigator(
		{
			Login: { screen: LoginStack },
			Home: { screen: HomeStack }
		},
		{
			mode: "modal",
			initialRouteName: signedIn ? "Home" : "Login",
			headerMode: "none",
			navigationOptions: {
				gesturesEnabled: false
			}
		}
	);
};
