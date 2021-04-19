import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

import { Favorites } from "./favorites.js";

export const Navbar = () => {
	const { store, actions } = useContext(Context);

	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-3 px-5 d-flex justify-content-between">
			<Link to="/">
				<h1 className="navbar-brand mb-0 h1 pl-5">StarWars</h1>
			</Link>

			{!store.token ? null : <Favorites />}

			{!store.token ? (
				<Link to="/login">
					<button className="btn btn-warning">Log in</button>
				</Link>
			) : (
				<Link to="/">
					<button onClick={() => actions.logout()} className="btn btn-outline-warning">
						Log out
					</button>
				</Link>
			)}
		</nav>
	);
};
