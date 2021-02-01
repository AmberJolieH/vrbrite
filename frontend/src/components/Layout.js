import React from "react";
import Navigation from "./Navigation";
import Footer from "./Footer";

const Layout = ({ children }) => (
	<>
		<Navigation />
		<div style={{ minHeight: "55.5vh" }}>{children}</div>
		<Footer />
	</>
);

export default Layout;
