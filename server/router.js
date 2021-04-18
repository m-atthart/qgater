const express = require("express");
const { addCircuit, getCircuits, getDisplayName } = require("./handlers");

const router = express.Router();

router.post("/user", getDisplayName);
router.get("/circuits", getCircuits);
router.post("/circuits/add", addCircuit);

module.exports = router;
