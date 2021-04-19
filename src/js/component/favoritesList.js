import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

import "../../styles/demo.scss";

export const FavoritesList = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container-fluid bg-light">
			<h3 className="text-danger">Favorites List</h3>

			{store.token && store.favorites.length === 0 ? (
				<p className="text-muted">No favorites selected</p>
			) : store.token ? (
				<div className="">
					{store.favorites.map((item, index) => {
						let peopleId = store.people.map(obj => obj.name).indexOf(item.name); // can also use method .hasOwnProperty()

						let planetId = store.planets.map(obj => obj.name).indexOf(item.name); // not necessary, used when working with public swapi.tech api

						return (
							<Link to={peopleId !== -1 ? "/character/" + item.id : "/planet/" + item.id} key={index}>
								<button className="btn btn-warning m-2">{item.name}</button>
							</Link>
						);
					})}
				</div>
			) : (
				<p>Login to see your favorites list</p>
			)}
		</div>
	);
};

// Button used to test getFavorites() fetch function
// <button
// 	className="btn btn-success"
// 	onClick={() => {
// 		actions.getFavorites();
// 		actions.getFavoritesRaw();
// 	}}>
// 	Click to show your saved favorites
// </button>
