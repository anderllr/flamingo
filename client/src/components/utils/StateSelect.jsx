import React from "react";

export default props => {
	return (
		<div>
			<label>Estado</label>
			<select
				name={props.name}
				className={props.className}
				value={props.value}
				onChange={props.onChange}
			>
				<option value="12">AC</option>
				<option value="27">AL</option>
				<option value="13">AM</option>
				<option value="16">AP</option>
				<option value="29">BA</option>
				<option value="23">CE</option>
				<option value="53">DF</option>
				<option value="32">ES</option>
				<option value="52">GO</option>
				<option value="21">MA</option>
				<option value="31">MG</option>
				<option value="50">MS</option>
				<option value="51">MT</option>
				<option value="15">PA</option>
				<option value="25">PB</option>
				<option value="26">PE</option>
				<option value="22">PI</option>
				<option value="41">PR</option>
				<option value="33">RJ</option>
				<option value="24">RN</option>
				<option value="11">RO</option>
				<option value="14">RR</option>
				<option value="43">RS</option>
				<option value="42">SC</option>
				<option value="28">SE</option>
				<option value="35">SP</option>
				<option value="17">TO</option>
			</select>
		</div>
	);
};
