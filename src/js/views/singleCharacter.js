import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

import img800x600 from "../../img/img800x600.png";

export const SingleCharacter = props => {
	const { store, actions } = useContext(Context);
	const params = useParams();

	let character = store.people[params.theid];

	return (
		<div className="container text-center w-75">
			<div className="row no-gutters p-3">
				<div className="col-md-6">
					<img src={img800x600} className="card-img" alt="..." style={{ width: "300px" }} />
				</div>
				<div className="col-md-6">
					<div className="card-body">
						<h5 className="card-title">{character.name}</h5>
						<p className="card-text">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce non nisi bibendum, egestas ex
							at, rutrum lorem. Nunc purus arcu, finibus eu pulvinar nec, molestie eu libero. Mauris ut
							tellus quis ipsum porttitor consequat vel ut dui. Mauris elementum nisl at finibus rutrum.
							Aenean vestibulum risus quam, ac mollis tellus iaculis a. Mauris enim ligula, ullamcorper
							porttitor erat a, sollicitudin sagittis diam. Nam ut enim dapibus, fringilla lacus sit amet,
							gravida neque.
						</p>
					</div>
				</div>
			</div>
			<div className="row border-danger border-top p-3 text-danger">
				<div className="col">
					<p>Name</p>
					<p>{character.name}</p>
				</div>
				<div className="col">
					<p>Birth Year</p>
					<p>{character.birth_year}</p>
				</div>
				<div className="col">
					<p>Gender</p>
					<p>{character.gender}</p>
				</div>
				<div className="col">
					<p>Height</p>
					<p>{character.height}</p>
				</div>
				<div className="col">
					<p>Skin Color</p>
					<p>{character.skin_color}</p>
				</div>
				<div className="col">
					<p>Eye Color</p>
					<p>{character.eye_color}</p>
				</div>
			</div>
			<div className="d-flex justify-content-start">
				<Link to="/">
					<div className="btn btn-outline-primary">Back to home</div>
				</Link>
			</div>
		</div>
	);
};

SingleCharacter.propTypes = {
	match: PropTypes.object
};
