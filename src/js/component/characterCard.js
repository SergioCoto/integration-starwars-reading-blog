import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

import PropTypes from "prop-types";

import "../../styles/demo.scss";

import img400x200 from "../../img/img400x200.png";

export const CharacterCard = props => {
	const { store, actions } = useContext(Context);

	let favoriteNameArray = store.favorites.map(obj => obj.name); // turn favorites object into name array because includes method only works with arrays
	let isFavorite = favoriteNameArray.includes(props.character.name);

	return (
		<div className="card">
			<img src={img400x200} className="card-img-top" alt="..." style={{ width: "300px" }} />
			<div className="card-body">
				<h5 className="card-title">{props.character.name}</h5>
				<p className="card-text">Gender: {props.character.gender}</p>
				<p className="card-text">Hair Color: {props.character.hair_color}</p>
				<p className="card-text">Eye Color: {props.character.eye_color}</p>
				<div className="d-flex justify-content-between">
					<Link to={`/character/${props.character.id}`}>
						<button className="btn btn-outline-primary">Learn more!</button>
					</Link>
					<button
						className="btn btn-outline-warning"
						onClick={() => {
							store.token ? actions.addFavorite(props.character) : alert("Please login to add favorites");
						}}>
						<i className={isFavorite ? "fas fa-heart" : "far fa-heart"} />
					</button>
				</div>
			</div>
		</div>
	);
};

CharacterCard.propTypes = {
	index: PropTypes.number,
	character: PropTypes.shape({
		name: PropTypes.string,
		gender: PropTypes.string,
		hair_color: PropTypes.string,
		eye_color: PropTypes.string,
		id: PropTypes.number
	})
};
