import React from "react";

const DefaultDescription = () => {
	return "blah blah blah"
		.split("\n")
		.map((str, strIndex) => <p key={strIndex}>{str}</p>);
};

export default DefaultDescription;
