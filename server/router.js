const express = require("express");
const {
	addCircuit,
	getCircuits,
	deleteCircuit,
	getDisplayName,
	createIBMQJob
} = require("./handlers");

const router = express.Router();

router.post("/user", getDisplayName);
router.get("/circuits", getCircuits);
router.delete("/circuits/delete", deleteCircuit);
router.post("/circuits/add", addCircuit);
router.post("/circuits/ibmq", createIBMQJob);

module.exports = router;
