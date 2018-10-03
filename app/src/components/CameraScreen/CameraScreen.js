import { Constants, Camera, FileSystem, Permissions } from "expo";
import React, { Component } from "react";
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Platform
} from "react-native";
import { withNavigationFocus } from "react-navigation";
import isIPhoneX from "react-native-is-iphonex";

import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const landmarkSize = 2;

const flashModeOrder = {
	off: "on",
	on: "auto",
	auto: "torch",
	torch: "off"
};

const flashIcons = {
	off: "flash-off",
	on: "flash-on",
	auto: "flash-auto",
	torch: "highlight"
};

const wbOrder = {
	auto: "sunny",
	sunny: "cloudy",
	cloudy: "shadow",
	shadow: "fluorescent",
	fluorescent: "incandescent",
	incandescent: "auto"
};

const wbIcons = {
	auto: "wb-auto",
	sunny: "wb-sunny",
	cloudy: "wb-cloudy",
	shadow: "beach-access",
	fluorescent: "wb-iridescent",
	incandescent: "wb-incandescent"
};

const PHOTOS_DIR = FileSystem.documentDirectory + "flamingo";

class CameraScreen extends Component {
	state = {
		flash: "off",
		zoom: 0,
		autoFocus: "on",
		type: "back",
		whiteBalance: "auto",
		ratio: "16:9",
		ratios: [],
		permissionsGranted: false,
		pictureSize: undefined,
		pictureSizes: [],
		pictureSizeId: 0,
		showMoreOptions: false,
		fileName: ""
	};

	async componentWillMount() {
		const { status } = await Permissions.askAsync(Permissions.CAMERA);
		const { rollStatus } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
		this.setState({ permissionsGranted: status === "granted" });
		this.setState({ rollPermissionsGranted: rollStatus === "granted" });

		var folderInfo = await FileSystem.getInfoAsync(PHOTOS_DIR);
		if (!folderInfo.exists) await FileSystem.makeDirectoryAsync(PHOTOS_DIR);

		const { navigation } = this.props;
		const fileName = navigation.getParam("fileName", {});
		const fileAnt = navigation.getParam("fileAnt", {});
		const refreshList = navigation.getParam("refreshList", {});

		this.setState({ fileName, refreshList });

		await FileSystem.deleteAsync(`${PHOTOS_DIR}/${fileAnt}.jpeg`, {
			idempotent: true
		});
	}

	getRatios = async () => {
		const ratios = await this.camera.getSupportedRatios();
		return ratios;
	};

	toggleFlash = () =>
		this.setState({ flash: flashModeOrder[this.state.flash] });

	setRatio = ratio => this.setState({ ratio });

	toggleFocus = () =>
		this.setState({ autoFocus: this.state.autoFocus === "on" ? "off" : "on" });

	zoomOut = () =>
		this.setState({
			zoom: this.state.zoom - 0.1 < 0 ? 0 : this.state.zoom - 0.1
		});

	zoomIn = () =>
		this.setState({
			zoom: this.state.zoom + 0.1 > 1 ? 1 : this.state.zoom + 0.1
		});

	setFocusDepth = depth => this.setState({ depth });

	takePicture = () => {
		if (this.camera) {
			this.camera.takePictureAsync().then(this.onPictureSaved);
		}
	};

	handleMountError = ({ message }) => console.error("Mount: ", message);

	onPictureSaved = async photo => {
		await FileSystem.deleteAsync(`${PHOTOS_DIR}/${this.state.fileName}.jpeg`, {
			idempotent: true
		});

		await FileSystem.moveAsync({
			from: photo.uri,
			to: `${PHOTOS_DIR}/${this.state.fileName}.jpeg`
		});

		if (typeof this.state.refreshList === "function") {
			this.state.refreshList(this.state.fileName);
		}
		this.props.navigation.goBack();
	};

	onExit = () => {
		if (typeof this.state.refreshList === "function") {
			this.state.refreshList();
		}
		this.props.navigation.goBack();
	};
	onFacesDetected = ({ faces }) => this.setState({ faces });
	onFaceDetectionError = state => console.warn("Faces detection error:", state);

	collectPictureSizes = async () => {
		if (this.camera) {
			const pictureSizes = await this.camera.getAvailablePictureSizesAsync(
				this.state.ratio
			);
			let pictureSizeId = 0;
			if (Platform.OS === "ios") {
				pictureSizeId = pictureSizes.indexOf("High");
			} else {
				// returned array is sorted in ascending order - default size is the largest one
				pictureSizeId = pictureSizes.length - 1;
			}
			this.setState({
				pictureSizes,
				pictureSizeId,
				pictureSize: pictureSizes[pictureSizeId]
			});
		}
	};

	previousPictureSize = () => this.changePictureSize(1);
	nextPictureSize = () => this.changePictureSize(-1);

	changePictureSize = direction => {
		let newId = this.state.pictureSizeId + direction;
		const length = this.state.pictureSizes.length;
		if (newId >= length) {
			newId = 0;
		} else if (newId < 0) {
			newId = length - 1;
		}
		this.setState({
			pictureSize: this.state.pictureSizes[newId],
			pictureSizeId: newId
		});
	};

	renderNoPermissions = () => (
		<View style={styles.noPermissions}>
			<Text style={{ color: "white" }}>
				Camera permissions not granted - cannot open camera preview.
			</Text>
		</View>
	);

	renderTopBar = () => (
		<View style={styles.topBar}>
			<TouchableOpacity style={styles.toggleButton} onPress={this.onExit}>
				<MaterialIcons name={"close"} size={32} color="white" />
			</TouchableOpacity>
			<TouchableOpacity style={styles.toggleButton} onPress={this.toggleFlash}>
				<MaterialIcons
					name={flashIcons[this.state.flash]}
					size={32}
					color="white"
				/>
			</TouchableOpacity>
			<TouchableOpacity style={styles.toggleButton} onPress={this.toggleFocus}>
				<Text
					style={[
						styles.autoFocusLabel,
						{ color: this.state.autoFocus === "on" ? "white" : "#6b6b6b" }
					]}
				>
					AF
				</Text>
			</TouchableOpacity>
			<TouchableOpacity style={styles.toggleButton} onPress={this.zoomIn}>
				<MaterialIcons name="zoom-in" size={32} color="white" />
			</TouchableOpacity>
			<TouchableOpacity style={styles.toggleButton} onPress={this.zoomOut}>
				<MaterialIcons name="zoom-out" size={32} color="white" />
			</TouchableOpacity>
		</View>
	);

	renderBottomBar = () => (
		<View style={styles.bottomBar}>
			<View style={{ flex: 1 }}>
				<TouchableOpacity onPress={this.takePicture}>
					<Ionicons name="ios-radio-button-on" size={70} color="white" />
				</TouchableOpacity>
			</View>
		</View>
	);

	renderCamera = () => (
		<View style={{ flex: 1 }}>
			<Camera
				ref={ref => {
					this.camera = ref;
				}}
				style={styles.camera}
				type={this.state.type}
				flashMode={this.state.flash}
				autoFocus={this.state.autoFocus}
				whiteBalance={this.state.whiteBalance}
				ratio={this.state.ratio}
				pictureSize={this.state.pictureSize}
				onMountError={this.handleMountError}
				zoom={this.state.zoom}
			>
				{this.renderTopBar()}
				{this.renderBottomBar()}
			</Camera>
		</View>
	);

	render() {
		const cameraScreenContent = this.state.permissionsGranted
			? this.renderCamera()
			: this.renderNoPermissions();
		return <View style={styles.container}>{cameraScreenContent}</View>;
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#000"
	},
	camera: {
		flex: 1,
		justifyContent: "space-between"
	},
	topBar: {
		flex: 0.2,
		backgroundColor: "transparent",
		flexDirection: "row",
		justifyContent: "space-around",
		paddingTop: Constants.statusBarHeight / 2
	},
	bottomBar: {
		paddingBottom: isIPhoneX ? 25 : 0,
		backgroundColor: "transparent",
		alignItems: "center",
		flex: 0.2
	},
	noPermissions: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		padding: 10
	},
	gallery: {
		flex: 1,
		flexDirection: "row",
		flexWrap: "wrap"
	},
	toggleButton: {
		flex: 0.25,
		height: 40,
		marginHorizontal: 2,
		marginBottom: 10,
		marginTop: 20,
		padding: 5,
		alignItems: "center",
		justifyContent: "center"
	},
	autoFocusLabel: {
		fontSize: 20,
		fontWeight: "bold"
	},
	bottomButton: {
		flex: 0.3,
		height: 58,
		justifyContent: "center",
		alignItems: "center"
	},
	options: {
		position: "absolute",
		bottom: 80,
		left: 30,
		width: 200,
		height: 160,
		backgroundColor: "#000000BA",
		borderRadius: 4,
		padding: 10
	},
	detectors: {
		flex: 0.5,
		justifyContent: "space-around",
		alignItems: "center",
		flexDirection: "row"
	},
	pictureQualityLabel: {
		fontSize: 10,
		marginVertical: 3,
		color: "white"
	},
	pictureSizeContainer: {
		flex: 0.5,
		alignItems: "center",
		paddingTop: 10
	},
	pictureSizeChooser: {
		alignItems: "center",
		justifyContent: "space-between",
		flexDirection: "row"
	},
	pictureSizeLabel: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center"
	},
	facesContainer: {
		position: "absolute",
		bottom: 0,
		right: 0,
		left: 0,
		top: 0
	},
	face: {
		padding: 10,
		borderWidth: 2,
		borderRadius: 2,
		position: "absolute",
		borderColor: "#FFD700",
		justifyContent: "center",
		backgroundColor: "rgba(0, 0, 0, 0.5)"
	},
	landmark: {
		width: landmarkSize,
		height: landmarkSize,
		position: "absolute",
		backgroundColor: "red"
	},
	faceText: {
		color: "#FFD700",
		fontWeight: "bold",
		textAlign: "center",
		margin: 10,
		backgroundColor: "transparent"
	},
	row: {
		flexDirection: "row"
	}
});

export default withNavigationFocus(CameraScreen);
