import React, { useState, useEffect } from "react";

const InputsField = ({ result, onClick }) => {
	const [isShown, setIsShown] = useState(false);

	return (
		<>
			<input
				onClick={(e) => {
					setIsShown((current) => !current), onClick(e);
				}}
				style={{ margin: "2px" }}
				type="checkbox"
				id={result.id}
				name={result.data.name}
				value={result.data.name}
			/>
			<label
				htmlFor={result.id}
				style={{
					color: isShown ? "#3fc" : "black",
				}}
			>
				{result.data.name}
			</label>
		</>
	);
};
export default InputsField;
