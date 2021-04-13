import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

import "../../styles/demo.scss";

export const Favorites = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="dropdown pr-5 ml-auto">
			<a
				className="btn btn-primary dropdown-toggle"
				href="#"
				role="button"
				id="dropdownMenuLink"
				data-toggle="dropdown"
				aria-haspopup="true"
				aria-expanded="false">
				Favorites <span className="badge badge-secondary">{store.favorites.length}</span>
			</a>

			<div className="dropdown-menu">
				{store.favorites.length == 0 ? (
					<a className="dropdown-item text-center">(empty)</a>
				) : (
					store.favorites.map((item, index) => {
						let peopleId = store.people.map(obj => obj.name).indexOf(item);

						let planetId = store.planets.map(obj => obj.name).indexOf(item);

						return (
							<a className="dropdown-item" key={index}>
								<Link to={peopleId !== -1 ? "/people/" + peopleId : "/planet/" + planetId} key={index}>
									{item}{" "}
								</Link>
								<span onClick={() => actions.removeFavorite(index)}>
									<i className="fas fa-trash-alt float-right" />
								</span>
							</a>
						);
					})
				)}
			</div>
		</div>
	);
};
