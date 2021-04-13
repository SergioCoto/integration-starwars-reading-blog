import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

import PropTypes from "prop-types";

import "../../styles/demo.scss";

import img400x200 from "../../img/img400x200.png";

export const PlanetCard = props => {
	const { store, actions } = useContext(Context);

	let isFavorite = store.favorites.includes(props.planet.name);

	return (
		<div className="card">
			<img src={img400x200} className="card-img-top" alt="..." style={{ width: "300px" }} />
			<div className="card-body">
				<h5 className="card-title">{props.planet.name}</h5>
				<p className="card-text">Gender: {props.planet.population}</p>
				<p className="card-text">Hair Color: {props.planet.terrain}</p>
				<div className="d-flex justify-content-between">
					<Link to={"/planet/" + props.index}>
						<button className="btn btn-outline-primary">Learn more!</button>
					</Link>
					<button className="btn btn-outline-warning" onClick={() => actions.addFavorite(props.planet)}>
						<i className={isFavorite ? "fas fa-heart" : "far fa-heart"} />
					</button>
				</div>
			</div>
		</div>
	);
};

PlanetCard.propTypes = {
	index: PropTypes.number,
	planet: PropTypes.shape({
		name: PropTypes.string,
		population: PropTypes.string,
		terrain: PropTypes.string
	})
};
