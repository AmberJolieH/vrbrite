import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import "./SignupForm.css";

function SignupFormPage() {
	const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state.session.user);
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);

	if (sessionUser) return <Redirect to="/" />;

	const handleSubmit = (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			setErrors([]);
			return dispatch(
				sessionActions.signup({ email, username, password })
			).catch((res) => {
				if (res.data && res.data.errors) setErrors(res.data.errors);
			});
		}
		return setErrors([
			"Confirm Password field must be the same as the Password field",
		]);
	};

	return (
		<div className="signup-form-container">
			<form className="signup-form" onSubmit={handleSubmit}>
				<strong
					className="logo"
					style={{ margin: "auto", fontSize: 50 }}
				>
					VRbrite
				</strong>
				<h1 className="signup-text">Sign up</h1>
				<ul>
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</ul>

				<input
					placeholder="email address"
					type="text"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>

				<input
					placeholder="username"
					type="text"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					required
				/>

				<input
					placeholder="password"
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>

				<input
					placeholder="confirm password"
					type="password"
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
					required
				/>

				<button type="submit" className="signup-button">
					Submit
				</button>
				<p>
					Already have an account? <Link to="/login">Login</Link>
					{" or "}
					<Link to="/login-demo">Demo</Link>
				</p>
			</form>
		</div>
	);
}

export default SignupFormPage;
