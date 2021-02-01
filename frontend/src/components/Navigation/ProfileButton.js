import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import MenuIcon from '@material-ui/icons/Menu';
const ProfileButton = ({ user }) => {
	const dispatch = useDispatch();
	const [showMenu, setShowMenu] = useState(false);

	const openMenu = () => {
		if (showMenu) return;
		setShowMenu(true);
	};

	useEffect(() => {
		if (!showMenu) return;
		const closeMenu = () => {
			setShowMenu(false);
		};
		document.addEventListener("click", closeMenu);

		return () => document.removeEventListener("click", closeMenu);
	}, [showMenu]);

	const logout = (e) => {
		e.preventDefault();
		dispatch(sessionActions.logout());
	};

	return (
		<div className="profile-button">
			
			<button
				
				className="profile-button__trigger"
				style={{
					color: "black",
					fontSize: 10,
					backgroundColor: "transparent",
				}}
				
				onClick={openMenu}
			><MenuIcon />
				<i className="fas fa-ellipsis-v"></i>
				
			</button>

			{showMenu && (
				<ul className="profile-button__dropdown">
					<li>{user.username}</li>
					<li>{user.email}</li>
					<li>
						<button className="button" onClick={logout}>
							Log Out
						</button>
					</li>
				</ul>
			)}
		</div>
	);
};

export default ProfileButton;
