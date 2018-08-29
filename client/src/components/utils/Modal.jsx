import React from "react";

const Modal = ({ handleClose, show, children, style }) => {
	return (
		<div className={show ? "modal display-block" : "modal display-none"}>
			<section className="modal-main">
				<div style={style}>{children}</div>

				<div className="modal-footer">
					<button className="btn btn-danger ml-2" onClick={handleClose}>
						<i className="fa fa-window-close" /> Fechar
					</button>
				</div>
			</section>
		</div>
	);
};

export default Modal;
