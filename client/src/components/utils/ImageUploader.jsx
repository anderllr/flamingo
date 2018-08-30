import React, { Component } from "react";

import "./ImageUploader.css";

export default class ImageUploader extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loaded: false,
			active: false,
			imageSrc: "",
			baseColor: "gray",
			activeColor: "green",
			overlayColor: "rgba(255,255,255,0.3)"
		};
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ loaded: nextProps.imageUrl !== "" });
	}

	onDragEnter = e => {
		this.setState({ active: true });
	};

	onDragLeave = e => {
		this.setState({ active: false });
	};

	onDragOver = e => {
		e.preventDefault();
	};

	onDrop = e => {
		e.preventDefault();
		this.setState({ active: false });
		this.onFileChange(e, e.dataTransfer.files[0]);
	};

	onFileChange = (e, file) => {
		var file = file || e.target.files[0],
			pattern = /image-*/,
			reader = new FileReader();

		//		console.log("File: ", file);
		if (!file.type.match(pattern)) {
			alert("Formato inválido");
			return;
		}

		this.setState({ loaded: false });

		reader.onload = e => {
			//			console.log("ImageSRC: ", reader.result);
			this.props.onFileChoose(file, reader.result);
			this.setState({
				//				imageSrc: reader.result,
				loaded: true
			});
		};

		reader.readAsDataURL(file);
	};

	render() {
		const borderColor = this.state.active
				? this.state.activeColor
				: this.state.baseColor,
			iconColor = this.state.active
				? this.state.activeColor
				: this.state.loaded
					? this.state.overlayColor
					: this.state.baseColor;
		return (
			<div>
				<label
					className={`uploader ${this.state.loaded && "loaded"}`}
					onDragEnter={this.onDragEnter}
					onDragLeave={this.onDragLeave}
					onDragOver={this.onDragOver}
					onDrop={this.onDrop}
					style={{ outlineColor: borderColor }}
				>
					<img
						src={this.props.imageUrl}
						className={
							this.state.loaded && this.props.imageUrl !== ""
								? "loaded"
								: undefined
						}
						alt="Foto do Grupo para o App"
					/>

					<i className="icon fa fa-camera fa-2x" style={{ color: iconColor }} />
					<input
						type="file"
						accept="image/*"
						onChange={e => this.onFileChange(e)}
						ref="input"
					/>
				</label>
			</div>
		);
	}
}
