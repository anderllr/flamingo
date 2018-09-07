import { Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const INPUT_HEIGHT = 40;
const BORDER_RADIUS = 4;

const styles = EStyleSheet.create({
	sizeContainer: {
		width: '100%',
	},
	container: {
		backgroundColor: '$white',
		height: INPUT_HEIGHT,
		borderRadius: BORDER_RADIUS,
		marginRight: 10,
	},
	input: {
		fontSize: 16,
		paddingLeft: 10,
		justifyContent: 'center',
		fontWeight: '400',
		color: '$darkText',
	},
	text: {
		color: '$white',
		fontSize: 16,
		fontWeight: '300',
	},
});

export default styles;
