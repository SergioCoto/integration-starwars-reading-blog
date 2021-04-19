import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

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
						let peopleId = store.people.map(obj => obj.name).indexOf(item.name); // can also use hasOwnProperty method

						let filteredResults = store.favorites_raw.filter(function(currentElement) {
							return currentElement.item_id == item.id && currentElement.item_type == item.item_type;
						});

						// filter returns an array, so we have to specify the position to get the id value from filteredResults

						return (
							<a className="dropdown-item" key={index}>
								<Link to={peopleId !== -1 ? "/character/" + item.id : "/planet/" + item.id} key={index}>
									{item.name}{" "}
								</Link>
								<span onClick={() => actions.removeFavorite(filteredResults[0].id, item)}>
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
