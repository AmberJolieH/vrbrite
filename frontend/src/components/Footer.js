import React from "react";
import { ReactComponent as ImageBanner } from "../images/profile.svg"
const Footer = () => {
	return (
		<footer
		
			className="Footer"
			style={{
				width: "100%",
				backgroundColor: "white",
				padding: "0rem 0rem",
				boxSizing: "border-box",
				marginTop: "-10px"
			}}
		>
			
			<p
				style={{
					textAlign: "center",
					color: "black",
					fontSize: 15,
				}}
			>
				Amber J Horn {new Date().getFullYear()}
					
			</p>
			<div
				style={{
					fontSize: 22,
					display: "flex",
					justifyContent: "center",

				}}
			>
			<img className="profilePic"
					src="https://lh3.googleusercontent.com/s7Na3AwjUMRrOdC4VAM-I1LySSP5NlSQWj_O_hZQKm2AC0Sw_NkVxWVE4utSj1NOckygtNa_kbtXU5ToRvoBT03aTMfaDHHXq2cJeo2hnOFpQFIMuyQgwHJ8KBa00O1179mvRIg4X2kfWhzbBwD0-YswbBVBBK5-vB2E00gxYpYEd6a7O1vAr2O1Rgv-VLwe32VMOugrv4EeinZJdgRnlAmkc9ThswffA_wswxrrVecb3DbZWoD6zlqdIYQd1Ut8QEk0vkdAyPvF-H-__CJjU0Rlhf5iMUdOrqnNXDWRDN_kayZBCzUEWCjzu6niWXwZFAx39RV5P9HhIj-TsntcevFkq61udbsJ600LEASbhQsiR5lLulmcnlyA5s0luVy01IHUYRvX_61zBsxx1kjXguF5rKhEMbTtypeNUrkNsi1-XOjhRtzIwD0H3aAP3Sy-MUzJOGs6oGTf2MNA0N5Y3PmGSPSsv-Asxu6BElhbaAOliczqrYZ19hwthJD1NcJIhimDM4MGfsNQ31JaVBJwGp4A8pTXwuYDLw4N1oSdXfrg8PmMDlZv7VUcBy2vINwblRHb7lHWcF8O6EJ6gzIGtGrGwKFP_kSBNcNs-UvVTOIE6cP4JdO-5vjPZpFvoQUion5aY_eVb_JF8vfLDSpnyrHNEYViTxZdjsNXICdNH06TiLdkkW9Ea6NKlyPwEg=w942-h936-no?authuser=0"
					alt="new"
					style={{
						height:"100px",
						width:"100px",
						borderRadius:"100px",
						marginLeft: "80px"
					}}
			/>
				<a href="https://github.com/AmberJolieH">
					<i
						style={{ color: "black", margin: "0px 10px 150px" }}
						className="fab fa-github"
					></i>
				</a>
				<a href="https://www.linkedin.com/in/amber-horn-202743152">
					<i
						style={{ color: "black", margin: "0px 10px 165px" }}
						className="fab fa-linkedin"
					></i>
				</a>
				
			</div>
		
					
		</footer>
	);
};

export default Footer;
