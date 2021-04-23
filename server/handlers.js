const admin = require("firebase-admin");
const serviceAccount = require("./qgater-admin.json");
const fetch = require("node-fetch");
const { timeout, qobjify } = require("./utils");
const {
	getBackends,
	createJob,
	cancelJob,
	deleteJob,
	uploadQobj,
	callbackUpload,
	callbackDownload,
	jobStatus,
	resultUrl
} = require("./ibmReqs");

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });

const db = admin.firestore();

const addCircuit = async (req, res) => {
	const { title, displayName, email, privacy, q0, q1 } = req.body;
	await db
		.collection("qcircuits")
		.add({ title, displayName, email, privacy, q0, q1, timestamp: new Date() });
	res.status(201).json({
		status: 201
	});
};

const getCircuits = async (req, res) => {
	const email = req.query.email;

	let communityQCircuits = db
		.collection("qcircuits")
		.where("privacy", "==", false)
		.where("email", "!=", email)
		.orderBy("email", "asc")
		.orderBy("timestamp", "desc")
		.limit(20)
		.get();
	let userQCircuits = db
		.collection("qcircuits")
		.where("email", "==", email)
		.orderBy("timestamp", "desc")
		.limit(20)
		.get();

	[communityQCircuits, userQCircuits] = await Promise.all([
		communityQCircuits,
		userQCircuits
	]);

	const communityCircuits = [];
	const userCircuits = [];
	communityQCircuits.forEach((doc) => {
		const circuit = doc.data();
		circuit.id = doc.id;
		delete circuit.email;
		delete circuit.privacy;
		delete circuit.timestamp;
		communityCircuits.push(circuit);
	});
	userQCircuits.forEach((doc) => {
		const circuit = doc.data();
		circuit.id = doc.id;
		delete circuit.email;
		delete circuit.timestamp;
		userCircuits.push(circuit);
	});

	res.status(200).json({
		status: 200,
		communityCircuits,
		userCircuits
	});
};

const deleteCircuit = async (req, res) => {
	await db.collection("qcircuits").doc(req.body.id).delete();
	res.status(200).json({ status: 200 });
};

const searchCircuits = async (req, res) => {
	const searchTerm = req.query.searchTerm;
	return;
};

let jobId;
const backend = "ibmq_qasm_simulator";

const createIBMQJob = async (req, res) => {
	const { q0, q1 } = req.body;
	const qobj = qobjify(q0, q1);

	const job = await fetch(createJob(backend));
	if (job.status !== 200) {
		res.status(502).send();
		return;
	}
	const jobData = await job.json();
	const uploadUrl = jobData.objectStorageInfo.uploadUrl;
	jobId = jobData.id;
	console.log(jobId);

	const upload = await fetch(uploadQobj(uploadUrl, qobj));
	if (upload.status !== 200) {
		res.status(502).send();
		return;
	}

	//res.status(200).json({ uploadUrl: job.objectStorageInfo.uploadUrl });
	//return
	//};

	//const callbackUploaded = async (req, res) => {
	const callback = await fetch(callbackUpload(jobId));
	if (callback.status !== 200) {
		res.status(502).send();
		return;
	}
	let status = await fetch(jobStatus(jobId));
	let statusData = await status.json();
	let stat = statusData.status;
	while (stat !== "COMPLETED") {
		await timeout(5);
		status = await fetch(jobStatus(jobId));
		statusData = await status.json();
		stat = statusData.status;
	}
	const download = await fetch(resultUrl(jobId));
	const downloadData = await download.json();
	const downloadUrl = downloadData.url;
	//res.status(200).json({ downloadUrl });
	//return

	const results = await fetch(downloadUrl);
	if (results.status !== 200) {
		res.status(502).send();
		return;
	}
	const resultsData = await results.json();
	const counts = resultsData.results[0].data.counts;
	res.status(200).json({
		"00": counts["0x0"] || 0,
		"01": counts["0x1"] || 0,
		10: counts["0x2"] || 0,
		11: counts["0x3"] || 0,
		timeTaken: resultsData.time_taken
	});

	await fetch(deleteJob(jobId));
	return;
};

const runCircuitOnIBMQC = async (req, res) => {
	const { q0, q1 } = req.body;

	res.status(200).json({
		status: 200
	});
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
	deleteCircuit,
	getDisplayName,
	createIBMQJob
};
