import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { ReactComponent as ImageBanner } from "../../images/VRbrite.svg";
const Navigation = () => {
	const user = useSelector((store) => store.session.user);

	return (
		<div className="navigation">
			<NavLink exact to="/" className="right-nav">
				<h2 className="logo" style={{
					marginLeft: ".01rem",
					marginTop: ".01rem",
					position: "absolute",
					bottom: "20%",
					left: ".001%",
				}}>
					<ImageBanner
						alt="vr guy"
						className="vrguy"
						position="absolute"
						bottom="20%"
						left="5%"
						/>
				</h2>
			</NavLink>

			<ul className="right-nav">
				<li>
					<NavLink exact to="/events">
						Events{" "}
					</NavLink>
				</li>
				{!!user ? (
					<>
						<li>
							<NavLink to="/tickets">Tickets</NavLink>
						</li>
						<li>
							<ProfileButton user={user} />
						</li>
					</>
				) : (
						<>
							<li>
								<NavLink to="/login">Login</NavLink>
							</li>
							<li>
								<NavLink to="/signup">Sign up</NavLink>
							</li>
						</>
					)}
			</ul>
		</div>
	);
};

export default Navigation;
