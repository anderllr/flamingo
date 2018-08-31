import { createStackNavigator } from "react-navigation";
import { StatusBar } from "react-native";

import Login from "../screens/Login";
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
				headerTitle: "Login"
			}
		}
	},
	{
		headerMode: "screen"
	}
);

export default createStackNavigator(
	{
		Home: {
			screen: LoginStack
		}
	},
	{
		mode: "modal",
		cardStyle: { paddingTop: StatusBar.currentHeight },
		headerMode: "none"
	}
);
