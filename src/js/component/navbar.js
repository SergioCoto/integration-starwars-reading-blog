import React from "react";
import { Link } from "react-router-dom";

import { Favorites } from "./favorites.js";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light mb-3 px-5">
			<Link to="/">
				<span className="navbar-brand mb-0 h1 pl-5">StarWars</span>
			</Link>

			<Favorites />
		</nav>
	);
};
