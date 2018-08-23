//Utils routines to work
import React from "react";

export const validateFields = (requiredFields, obj) => {
	let errors = [];
	requiredFields.map(({ field, name }, i) => {
		const value = obj[field];
		if (value === "" || value === "1900-01-01" || value === 0) {
			errors.push(`* Campo (${name}) é obrigatório!`);
		}
	});
	return errors;
};

export const renderAlert = alert => {
	const { type, title, msg } = alert;
	//console.log("msg: ", msg);
	if (msg.length > 0) {
		return (
			<div className={`alert alert-${type}`} role="alert">
				<h4 className="alert-heading">{title}!</h4>
				{msg.map((error, i) => {
					return <p key={i}>{error}</p>;
				})}
			</div>
		);
	}
};
