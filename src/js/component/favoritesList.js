import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

import "../../styles/demo.scss";

export const FavoritesList = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container-fluid">
			<h3 className="text-danger">Favorites List</h3>
			{store.favorites.length === 0 ? (
				<p className="text-muted">No favorites selected</p>
			) : (
				<div className="bg-light">
					{store.favorites.map((item, index) => {
						let peopleId = store.people.map(obj => obj.name).indexOf(item);

						let planetId = store.planets.map(obj => obj.name).indexOf(item);

						return (
							<Link to={peopleId !== -1 ? "/people/" + peopleId : "/planet/" + planetId} key={index}>
								<button className="btn btn-outline-success m-2">{item}</button>
							</Link>
						);
					})}
				</div>
			)}
		</div>
	);
};
