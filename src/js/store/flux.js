import jwt_decode from "jwt-decode"; //library that helps decoding JWTs token which are Base64Url encoded

// $ npm install jwt-decode

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			people: [],
			planets: [],
			favorites: [],
			loading: true,
			token: null,
			favorites_raw: []
		},
		actions: {
			login: (email, password) => {
				const URL = "https://3000-purple-monkey-z1qygdjf.ws-us03.gitpod.io/token"; // API to create token
				const CONFIG = {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						email: email,
						password: password
					})
				};

				fetch(URL, CONFIG)
					.then(resp => {
						if (resp.status === 200) return resp.json();
						else alert("There was some error while creating the token");
					})
					.then(data => {
						console.log("Token created from back-end", data);
						sessionStorage.setItem("token", data.access_token);
						setStore({ token: data.access_token });
					})
					.catch(error => {
						console.error("CREATE Token error: ", error);
					});

				// With sessionStorage , the data is persisted only until the window or tab is closed.
				// With localStorage , the data is persisted until the user manually clears the browser cache or until your web app clears the data.
			},

			// to setStore with token on every refresh, so this function is called on appContext.js file
			storeSessionToken: () => {
				const token = sessionStorage.getItem("token");
				if (token && token != "" && token != undefined) setStore({ token: token });
			},

			logout: () => {
				sessionStorage.removeItem("token");
				setStore({ token: null, favorites: [] });
			},

			getPeople: () => {
				fetch("https://3000-purple-monkey-z1qygdjf.ws-us03.gitpod.io/character/")
					.then(resp => {
						console.log("GET people request: ", resp.ok);
						resp.status >= 200 && resp.status < 300
							? console.log("GET people successful, status: ", resp.status)
							: console.error("GET people failed, status: ", resp.status);
						return resp.json();
					})
					.then(data => {
						setStore({ people: data, loading: false });
						console.log("People array: ", data);
					})
					.catch(error => console.error("GET people error: ", error));
			},

			getPlanets: () => {
				fetch("https://3000-purple-monkey-z1qygdjf.ws-us03.gitpod.io/planet/")
					.then(resp => {
						console.log("GET planets request: ", resp.ok);
						resp.status >= 200 && resp.status < 300
							? console.log("GET planets successful, status: ", resp.status)
							: console.error("GET planets failed, status: ", resp.status);
						return resp.json();
					})
					.then(data => {
						setStore({ planets: data, loading: false });
						console.log("Planets array: ", data);
					})
					.catch(error => console.error("GET planets error: ", error));
			},

			getUsers: () => {
				fetch("https://3000-purple-monkey-z1qygdjf.ws-us03.gitpod.io/user")
					.then(resp => {
						console.log("GET user request: ", resp.ok);
						resp.status >= 200 && resp.status < 300
							? console.log("GET user successful, status: ", resp.status)
							: console.error("GET user failed, status: ", resp.status);
						return resp.json();
					})
					.then(data => {
						setStore({ user: data, loading: false });
						console.log("User array: ", data);
					})
					.catch(error => console.error("GET user error: ", error));
			},

			getFavorites: () => {
				const store = getStore();

				if (store.token && store.token != "" && store.token != undefined) {
					const URL = "https://3000-purple-monkey-z1qygdjf.ws-us03.gitpod.io/favorite";
					const CONFIG = {
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							Authorization: "Bearer " + store.token
						}
					};

					fetch(URL, CONFIG)
						.then(resp => {
							console.log("GET favorites request: ", resp.ok);
							resp.status >= 200 && resp.status < 300
								? console.log("GET favorites successful, status: ", resp.status)
								: console.error("GET favorites failed, status: ", resp.status);
							return resp.json();
						})
						.then(data => {
							setStore({ favorites: data, loading: false });
							console.log("Favorites array from getFavorites(): ", data);
						})
						.catch(error => console.error("GET favorites error: ", error));
				}
			},

			getFavoritesRaw: () => {
				const store = getStore();

				if (store.token && store.token != "" && store.token != undefined) {
					const URL = "https://3000-purple-monkey-z1qygdjf.ws-us03.gitpod.io/favorite_raw";
					const CONFIG = {
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							Authorization: "Bearer " + store.token
						}
					};

					fetch(URL, CONFIG)
						.then(resp => {
							console.log("GET favorite_raw request: ", resp.ok);
							resp.status >= 200 && resp.status < 300
								? console.log("GET favorite_raw successful, status: ", resp.status)
								: console.error("GET favorite_raw failed, status: ", resp.status);
							return resp.json();
						})
						.then(data => {
							setStore({ favorites_raw: data, loading: false });
							console.log("Favorite_raw array from getFavoritesRaw(): ", data);
						})
						.catch(error => console.error("GET favorite_raw error: ", error));
				}
			},

			addFavorite: item => {
				const store = getStore();
				// store.favorites.includes(item.name)
				//     ? setStore({ favorites: store.favorites })
				//     : setStore({ favorites: store.favorites.concat(item) });
				// console.log("Favorites added in front-end: ", store.favorites);

				const token = sessionStorage.getItem("token");
				console.log(token);
				const tokenPayload = jwt_decode(token).sub; // jwt_decode returns the jwt object payload. Using "jwt debugger" we can see that .sub retuns the id in this case
				console.log("ID obtained from token with jwt_decode: ", tokenPayload);
				console.log("Item passed as parameter to addFavorite(): ", item);

				const filter = {
					id: item.id,
					item_type: item.item_type
				};

				const filteredResults = store.favorites.filter(function(elem) {
					for (let key in filter) {
						if (elem[key] === undefined || elem[key] != filter[key]) return false;
					}
					return true;
				});
				console.log("Filtered result: ", filteredResults);

				if (filteredResults.length == 0) {
					const URL = "https://3000-purple-monkey-z1qygdjf.ws-us03.gitpod.io/favorite";
					const CONFIG = {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							Authorization: "Bearer " + store.token
						},
						body: JSON.stringify({
							item_id: item.id,
							item_type: item.item_type,
							user_id: tokenPayload
						})
					};

					fetch(URL, CONFIG)
						.then(resp => {
							if (resp.status === 200) return resp.json();
							else alert("There was some error while adding the favorite");
						})
						.then(data => {
							console.log("Favorite added to DB: ", data);
						})
						.catch(error => {
							console.error("CREATE Token error: ", error);
						});

					setStore({ favorites: store.favorites.concat(item) });
				} else alert("Item already added to favorites");
			},

			removeFavorite: favoriteId => {
				const store = getStore();
				// store.favorites.splice(indexOf(index), 1);
				// setStore({ favorites: store.favorites });
				// console.log("Removed favorites:", store.favorites);

				console.log("This the fav ID to remove: ", favoriteId);

				const URL = `https://3000-purple-monkey-z1qygdjf.ws-us03.gitpod.io/favorite/${favoriteId}`;
				const CONFIG = {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + store.token
					}
				};

				fetch(URL, CONFIG)
					.then(resp => {
						console.log("DELETE favorites request: ", resp.ok);
						resp.status >= 200 && resp.status < 300
							? console.log("DELETE favorites successful, status: ", resp.status)
							: console.error("DELETE favorites failed, status: ", resp.status);
						return resp.json();
					})
					.then(getActions().getFavorites())
					.catch(error => console.error("DELETE favorites error: ", error));

				console.log("This is the URL: ", URL);
			},

			handleOnSelectCharacter: item => {
				console.log("Selected character on search", item);
				setStore({ people: [item] });
			},

			handleOnFocusCharacter: () => {
				console.log("Focused");
				getActions().getPeople();
			},

			handleOnSelectPlanet: item => {
				console.log("Selected planet on search", item);
				setStore({ planets: [item] });
			},

			handleOnFocusPlanet: () => {
				console.log("Focused");
				getActions().getPlanets();
			},

			// Use getActions to call a function within a function
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			loadSomeData: () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
			}
		}
	};
};

export default getState;
