import React, { useContext } from "react";
import { Context } from "../store/appContext";

import { PropTypes } from "prop-types";

import { CharacterCard } from "./characterCard.js";
import { Loading } from "./loading.js";

import { ReactSearchAutocomplete } from "react-search-autocomplete";

export const CharacterList = () => {
	const { store, actions } = useContext(Context);

	const handleOnSearch = (string, results) => {
		console.log(string, results);
	};

	return (
		<div className="container-fluid p-3">
			<div className="d-flex align-items-center">
				<h3 className="text-danger">Characters</h3>

				<div style={{ width: 200, margin: 20 }}>
					<ReactSearchAutocomplete
						items={store.people}
						onSearch={handleOnSearch}
						onSelect={actions.handleOnSelectCharacter}
						onFocus={actions.handleOnFocusCharacter}
						styling={{ zIndex: 2 }} // To display it on top of the search box below
					/>
				</div>
			</div>

			<div className="card-deck overflow-auto">
				<div className="d-flex flex-row flex-nowrap">
					{store.loading ? (
						<Loading />
					) : (
						store.people.map((character, index) => {
							return <CharacterCard key={index} character={character} index={index} />;
						})
					)}
				</div>
			</div>
		</div>
	);
};
