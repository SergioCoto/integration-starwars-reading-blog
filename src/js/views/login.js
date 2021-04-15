import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useHistory } from "react-router-dom"; // hook used to redirect to another route

import "../../styles/home.scss";

import { CharacterList } from "../component/characterList.js";
import { PlanetList } from "../component/planetList.js";
import { FavoritesList } from "../component/favoritesList.js";

export const Login = () => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const history = useHistory();

	console.log("This is your token: ", store.token);

	const handleClick = () => {
		actions.login(email, password).then(() => {
			actions.getFavorites();
			actions.getFavoritesRaw();
		});
	};

	if (store.token && store.token != "" && store.token != undefined) {
		history.push("/"); // redirect to "/" = home once logged in
	}

	return (
		<div className="container-fluid text-center">
			<h1>Login</h1>
			{store.token && store.token != "" && store.token != undefined ? (
				"You are logged in with this token" + store.token
			) : (
				<div className="d-flex justify-content-center">
					<form>
						<div className="row mb-3">
							<input
								type="text"
								placeholder="email"
								value={email}
								onChange={e => setEmail(e.target.value)}
							/>
						</div>

						<div className="row mb-3">
							<input
								type="password"
								placeholder="password"
								value={password}
								onChange={e => setPassword(e.target.value)}
							/>
						</div>

						<div className="row mb-3">
							<button type="button" className="btn btn-info" onClick={handleClick}>
								Login
							</button>
						</div>
					</form>
				</div>
			)}
		</div>
	);
};
