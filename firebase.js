import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyDRpfbU0yF3tfYneJG5FOKTt6V45_ZhaMw",
	authDomain: "signal-clone-590.firebaseapp.com",
	projectId: "signal-clone-590",
	storageBucket: "signal-clone-590.appspot.com",
	messagingSenderId: "819373911666",
	appId: "1:819373911666:web:f914ff2231efa65ea91ceb",
	measurementId: "G-0T2DTKGD5W",
};

let app;

if (firebase.apps.length === 0) {
	app = firebase.initializeApp(firebaseConfig);
} else {
	app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };
