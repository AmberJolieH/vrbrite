import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";

import "./LoginForm.css";

const LoginFormPage = () => {
	const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state.session.user);
	//set state
	const [credential, setCredential] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState([]);

	//redirect to home if user already logged in
	if (sessionUser) return <Redirect to="/" />;

	const handleSubmit = (e) => {
		e.preventDefault();
		setErrors([]);
		return dispatch(sessionActions.login({ credential, password })).catch(
			(res) => {
				if (res.data && res.data.errors) setErrors(res.data.errors);
			}
		);
	};
	return (
		<>
			<div className="login-background">
				<div className="login-form">
					<form onSubmit={handleSubmit}>
						<p className="logo" style={{ margin: "auto", fontSize:50, fontFamily:"inter"}}>
							VRbrite
						</p>
						<ul>
							{errors.map((error, idx) => (
								<li key={idx}>{error}</li>
							))}
						</ul>
						<input
							type="email"
							name="email"
							value={credential}
							placeholder="email address"
							onChange={(e) => setCredential(e.target.value)}
						/>

						<input
							type="password"
							name="password"
							value={password}
							placeholder="password"
							onChange={(e) => setPassword(e.target.value)}
						/>

						<button className="login-button" type="submit">
							login
						</button>
						<p className="sign-up">
							Don’t have a VRbrite account?{" "}
							<Link to="/signup">Sign up</Link> {"or "}
							<Link to="/login-demo">Demo</Link>
						</p>
					</form>
				</div>
			</div>
		</>
	);
};

export default LoginFormPage;
