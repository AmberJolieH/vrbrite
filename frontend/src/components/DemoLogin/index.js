import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { loginDemo } from "../../store/session";

const DemoUser = () => {
	const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state.session.user);
	useEffect(() => {
		dispatch(loginDemo());
	}, [dispatch]);

	if (sessionUser) return <Redirect to="/" />;

	return <p>Loading...</p>;
};

export default DemoUser;
