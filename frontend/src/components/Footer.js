import React from "react";

const Footer = () => {
	return (
		<footer
			className="Footer"
			style={{
				width: "100%",
				backgroundColor: "white",
				padding: "0rem 10rem",
				boxSizing: "border-box",
				marginTop: "20px"
			}}
		>
			<p
				style={{
					textAlign: "center",
					color: "grey",
					fontSize: 16,
				}}
			>
				Created by Amber J Horn {new Date().getFullYear()}
			</p>
			<div
				style={{
					fontSize: 22,
					display: "flex",
					justifyContent: "center",

				}}
			>
				<a href="https://github.com/AmberJolieH">
					<i
						style={{ color: "grey", margin: "0px 10px 150px" }}
						className="fab fa-github"
					></i>
				</a>
				<a href="https://www.linkedin.com/in/amber-horn-202743152">
					<i
						style={{ color: "grey", margin: "0 10px" }}
						className="fab fa-linkedin"
					></i>
				</a>
			</div>
		</footer>
	);
};

export default Footer;
