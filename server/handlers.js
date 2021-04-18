const admin = require("firebase-admin");
const serviceAccount = require("./qgater-admin.json");

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });

const db = admin.firestore();

const addCircuit = async ({ title, displayName, email, private, q0, q1 }) => {
	await db
		.collection("qcircuits")
		.add({ title, displayName, email, private, q0, q1, timestamp: new Date() });
};

const getCircuits = async (req, res) => {
	const email = req.body.email;

	let publicQCircuits = db
		.collection("qcircuits")
		.where("private", "==", false)
		.orderBy("timestamp", "desc")
		.limit(20)
		.get();
	let privateQCircuits = db
		.collection("qcircuits")
		.where("private", "==", true)
		.where("email", "==", email)
		.orderBy("timestamp", "desc")
		.limit(20)
		.get();

	[publicQCircuits, privateQCircuits] = await Promise.all([
		publicQCircuits,
		privateQCircuits
	]);

	const publicCircuits = [];
	const privateCircuits = [];
	publicQCircuits.forEach((doc) => {
		const circuit = doc.data();
		delete circuit.email;
		delete circuit.private;
		delete circuit.timestamp;
		publicCircuits.push(circuit);
	});
	privateQCircuits.forEach((doc) => {
		const circuit = doc.data();
		delete circuit.email;
		delete circuit.private;
		delete circuit.timestamp;
		privateCircuits.push(circuit);
	});

	res.status(200).json({
		status: 200,
		publicCircuits,
		privateCircuits
	});
};

const searchCircuits = async (searchTerm) => {
	return;
};

const getUser = async (email) => {
	const doc = await db.collection("users").doc(email).get();
	return { displayName: doc.data()?.displayName };
};

const getDisplayName = async (req, res) => {
	if (req.body.displayName) {
		await db
			.collection("users")
			.doc(req.body.email)
			.set({ displayName: req.body.displayName });
		res.status(200).json({
			status: 200,
			displayName: req.body.displayName
		});
		return;
	} else {
		const user = await getUser(req.body.email);
		if (user.displayName) {
			res.status(200).json({ status: 200, displayName: user.displayName });
			return;
		} else {
			res
				.status(400)
				.json({ status: 400, message: "new user. send displayName in body" });
			return;
		}
	}
};

module.exports = {
	addCircuit,
	getCircuits,
	getDisplayName
};