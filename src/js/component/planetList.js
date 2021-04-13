import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { PropTypes } from "prop-types";

import { PlanetCard } from "./planetCard.js";
import { Loading } from "./loading.js";

import { ReactSearchAutocomplete } from "react-search-autocomplete";

export const PlanetList = () => {
	const { store, actions } = useContext(Context);

	const handleOnSearch = (string, results) => {
		console.log(string, results);
	};

	return (
		<div className="container-fluid p-3 my-3">
			<div className="d-flex align-items-center">
				<h3 className="text-danger">Planets</h3>

				<div style={{ width: 200, margin: 20 }}>
					<ReactSearchAutocomplete
						items={store.planets}
						onSearch={handleOnSearch}
						onSelect={actions.handleOnSelectPlanet}
						onFocus={actions.handleOnFocusPlanet}
						styling={{ zIndex: 2 }} // To display it on top of the search box below
						autoFocus
					/>
				</div>
			</div>
			<div className="card-deck overflow-auto">
				<div className="d-flex flex-row flex-nowrap">
					{store.loading ? (
						<Loading />
					) : (
						store.planets.map((planet, index) => {
							return <PlanetCard key={index} planet={planet} index={index} />;
						})
					)}
				</div>
			</div>
		</div>
	);
};
