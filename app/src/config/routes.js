import { createStackNavigator } from "react-navigation";
import { Platform } from "react-native";
import { verticalScale } from "react-native-size-matters";
import { Constants } from "expo";

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

const headerStyle =
	Platform.OS === "ios"
		? { backgroundColor: "#00665a" }
		: {
				backgroundColor: "#00665a",
				height: verticalScale(40),
				paddingTop: -Constants.statusBarHeight,
				marginTop: -verticalScale(25)
		  };

const headerTitleStyle =
	Platform.OS === "ios"
		? {}
		: {
				fontWeight: "100",
				marginBottom: verticalScale(5)
		  };

const HomeStack = createStackNavigator(
	{
		Vistoria: {
			screen: Vistoria,
			navigationOptions: {
				headerTitle: "Vistoria",
				headerTintColor: "white",
				headerStyle: headerStyle,
				headerTitleStyle: headerTitleStyle
			}
		},
		Devolucao: {
			screen: Devolucao,
			navigationOptions: {
				headerTitle: "Devolução",
				headerTintColor: "white",
				headerStyle: headerStyle,
				headerTitleStyle: headerTitleStyle
			}
		},
		DevolucaoFotos: {
			screen: DevolucaoFotos,
			navigationOptions: {
				headerTitle: "Fotos da devolução",
				headerTintColor: "white",
				headerStyle: headerStyle,
				headerTitleStyle: headerTitleStyle
			}
		},
		Saida: {
			screen: Saida,
			navigationOptions: {
				headerTitle: "Checagem de Saída",
				headerTintColor: "white",
				headerStyle: headerStyle,
				headerTitleStyle: headerTitleStyle
			}
		},
		SaidaFotos: {
			screen: SaidaFotos,
			navigationOptions: {
				headerTitle: "Fotos de saída de frota",
				headerTintColor: "white",
				headerStyle: headerStyle,
				headerTitleStyle: headerTitleStyle
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
