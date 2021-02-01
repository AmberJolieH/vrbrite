import React from "react";
import { ReactComponent as ImageBanner } from "../images/profile.svg"
const Footer = () => {
	return (
		<footer

			className="Footer"
			style={{
				width: "100%",
				backgroundColor: "white",
				padding: "3.0rem 1rem",
				boxSizing: "border-box",
				marginTop: "10px"
			}}
		>

			<p
				style={{
					textAlign: "center",
					color: "black",
					fontSize: 15,
					marginLeft: "135.8px"
				}}
			>
				Amber J Horn {new Date().getFullYear()}

			</p>
			<div
				style={{
					fontSize: 22,
					display: "flex",
					justifyContent: "center",
					alignItems: "flex-end"
				}}
			>

				<a href="https://github.com/AmberJolieH">
					<i
						style={{ color: "black", margin: "0px 10px 0px 135px" }}
						className="fab fa-github"
					></i>
				</a>
				<img className="profilePic"
					src="https://media-exp1.licdn.com/dms/image/C4E03AQH57dNVzFET6w/profile-displayphoto-shrink_200_200/0/1606153412830?e=1617840000&v=beta&t=GZmHwLy59rpR_5A7NJkJJh4BYSeQi528cy11bELWoVc"
					alt="new"
					style={{
						height: "100px",
						width: "100px",
						borderRadius: "100px",
						marginLeft: "6.5px"
					}}
				/>
				<a href="https://www.linkedin.com/in/amber-horn-202743152">
					<i
						style={{ color: "black", margin: "0px 10px 0px" }}
						className="fab fa-linkedin"
					></i>
				</a>

			</div>


		</footer>
	);
};

export default Footer;
