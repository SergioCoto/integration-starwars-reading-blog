import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

import { Favorites } from "./favorites.js";

export const Navbar = () => {
	const { store, actions } = useContext(Context);

	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-3 px-5 d-flex justify-content-between">
			<Link to="/">
				<h1 className="navbar-brand mb-0 mr-4 pl-5">StarWars</h1>
			</Link>
			{store.token ? <p className="m-0 text-warning">Welcome {store.current_username}</p> : null}
			{store.token ? <Favorites /> : null}
			{store.token ? (
				<Link to="/">
					<button onClick={() => actions.logout()} className="btn btn-outline-warning">
						Log out
					</button>
				</Link>
			) : (
				<Link to="/login">
					<button className="btn btn-warning">Log in</button>
				</Link>
			)}
		</nav>
	);
};
