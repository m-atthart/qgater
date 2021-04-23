const { Request } = require("node-fetch");
require("dotenv").config();

const baseUrl = "https://api.quantum-computing.ibm.com/api";
const groupUrl = "/Network/ibm-q/Groups/open/Projects/main";
const apiToken = process.env.API_TOKEN;
const authToken = process.env.AUTH_TOKEN;

const getAuthToken = () => {
	return new Request(`${baseUrl}/users/loginWithToken`, {
		method: "post",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({ apiToken })
	});
};

const getBackends = () => {
	return new Request(`${baseUrl}/Backends`, {
		method: "get",
		headers: {
			"X-Access-Token": authToken
		}
	});
};

const createJob = (backend) => {
	return new Request(`${baseUrl}${groupUrl}/Jobs`, {
		method: "post",
		headers: {
			"Content-Type": "application/json",
			"X-Access-Token": authToken
		},
		body: JSON.stringify({
			backend: {
				name: backend
			},
			allowObjectStorage: true,
			name: "CirQit Circuit",
			tags: ["CirQit"]
		})
	});
};

const cancelJob = (jobId) => {
	return new Request(`${baseUrl}${groupUrl}/Jobs/${jobId}/cancel`, {
		method: "post",
		headers: {
			"X-Access-Token": authToken
		}
	});
};

const deleteJob = (jobId) => {
	return new Request(`${baseUrl}${groupUrl}/Jobs/${jobId}`, {
		method: "delete",
		headers: {
			"X-Access-Token": authToken
		}
	});
};

const uploadQobj = (url, qobj) => {
	return new Request(url, {
		method: "put",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(qobj)
	});
};

const callbackUpload = (jobId) => {
	return new Request(`${baseUrl}${groupUrl}/Jobs/${jobId}/jobDataUploaded`, {
		method: "post",
		headers: {
			"X-Access-Token": authToken
		}
	});
};

const callbackDownload = (jobId) => {
	return new Request(`${baseUrl}${groupUrl}/Jobs/${jobId}/resultDownloaded`, {
		method: "post",
		headers: {
			"X-Access-Token": authToken
		}
	});
};

const jobStatus = (jobId) => {
	return new Request(`${baseUrl}${groupUrl}/Jobs/${jobId}/status/v/1`, {
		method: "get",
		headers: {
			"X-Access-Token": authToken
		}
	});
};

const resultUrl = (jobId) => {
	return new Request(`${baseUrl}${groupUrl}/Jobs/${jobId}/resultDownloadUrl`, {
		method: "get",
		headers: {
			"X-Access-Token": authToken
		}
	});
};

const timeout = (s) => {
	return new Promise((res) => setTimeout(res, s * 1000));
};

const qobjify = (q0, q1) => {
	return {
		qobj_id: "bell_test",
		type: "QASM",
		schema_version: "1.3.0",
		experiments: [
			{
				header: {
					description: "|11>+|00> Bell"
				},
				config: {},
				instructions: [
					{
						name: "u2",
						qubits: [0],
						params: [0, 3.14159]
					},
					{
						name: "cx",
						qubits: [0, 1]
					},
					{
						name: "measure",
						qubits: [0, 1],
						memory: [0, 1]
					}
				]
			}
		],
		header: {
			description: "Bell states"
		},
		config: {
			shots: 256,
			memory_slots: 2
		}
	};
};

module.exports = {
	getBackends,
	createJob,
	cancelJob,
	deleteJob,
	uploadQobj,
	callbackUpload,
	callbackDownload,
	jobStatus,
	resultUrl,
	timeout,
	qobjify
};
