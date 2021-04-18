const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const morgan = require("morgan");

const PORT = 8000;

app.use(bodyParser.json());
app.use(morgan("tiny"));

const router = require("./router.js");
app.use("/", router);

app.listen(PORT, () => {
	console.log(`Server is listening on ${PORT}`);
});
