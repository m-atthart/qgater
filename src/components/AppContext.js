import React, { createContext, useEffect, useState } from "react";
import withFirebaseAuth from "react-with-firebase-auth";
import firebase from "firebase";
import "firebase/auth";

export const firebaseConfig = {
	apiKey: "AIzaSyBLdojSmkGG_1--HiupSbGT0IqZnlKnD0c",
	authDomain: "qgater-699cc.firebaseapp.com",
	projectId: "qgater-699cc",
	storageBucket: "qgater-699cc.appspot.com",
	messagingSenderId: "519594391886",
	appId: "1:519594391886:web:08b43593443b334c82461f"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAppAuth = firebaseApp.auth();

const providers = {
	googleProvider: new firebase.auth.GoogleAuthProvider()
};

export const AppContext = createContext(null);

const AppProvider = ({ children, signInWithGoogle, signOut, user }) => {
	const [displayName, setDisplayName] = useState();
	const [enterDisplayName, setEnterDisplayName] = useState(false);

	const getDisplayName = () => {
		if (user) {
			fetch(`/user`, {
				method: "post",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					email: user.email,
					displayName
				})
			})
				.then((res) => res.json())
				.then((json) => {
					if (json.status === 200) {
						setDisplayName(json.displayName);
						setEnterDisplayName(false);
					} else {
						setEnterDisplayName(true);
					}
				});
		}
	};

	const handleSignOut = () => {
		signOut();
	};

	useEffect(() => {
		if (user) getDisplayName();
		else setDisplayName(null);
	}, [user]);

	return (
		<AppContext.Provider
			value={{
				displayName,
				setDisplayName,
				enterDisplayName,
				getDisplayName,
				signInWithGoogle,
				handleSignOut
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export default withFirebaseAuth({ providers, firebaseAppAuth })(AppProvider);
