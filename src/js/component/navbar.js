import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

import { Favorites } from "./favorites.js";

export const Navbar = () => {
	const { store, actions } = useContext(Context);

	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light mb-3 px-5 d-flex justify-content-between">
			<Link to="/">
				<span className="navbar-brand mb-0 h1 pl-5">StarWars</span>
			</Link>

			{!store.token ? null : <Favorites />}

			{!store.token ? (
				<Link to="/login">
					<button className="btn btn-primary">Log in</button>
				</Link>
			) : (
				<button onClick={() => actions.logout()} className="btn btn-primary">
					Log out
				</button>
			)}
		</nav>
	);
};
