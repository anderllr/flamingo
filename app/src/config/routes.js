import { createStackNavigator } from "react-navigation";
import { StatusBar } from "react-native";

import Login from "../screens/Login";
import Vistoria from "../screens/Vistoria";
//import Home from '../screens/Home';
//import CurrencyList from '../screens/CurrencyList';
//import Options from '../screens/Options';
//import Themes from '../screens/Themes';
/*
const HomeStack = StackNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            header: null,
        }
    },
    Options: {
        screen: Options,
        navigationOptions: {
            headerTitle: 'Options',
        }
    },
    Themes: {
        screen: Themes,
        navigationOptions: {
            headerTitle: 'Themes',
        },
    },
},
    {
        headerMode: 'screen',
    }
);

const CurrencyListStack = StackNavigator({
    CurrencyList: {
        screen: CurrencyList,
        navigationOptions: ({ navigation }) => ({
            headerTitle: navigation.state.params.title,
        }),
    },
});

export default StackNavigator(
    {
        Home: {
            screen: HomeStack,
        },
        CurrencyList: {
            screen: CurrencyListStack,
        },
    },
    {
        mode: 'modal',
        cardStyle: { paddingTop: StatusBar.currentHeight },
        headerMode: 'none',
    },
);
*/

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
		}
	},
	{
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
