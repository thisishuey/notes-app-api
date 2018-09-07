export function success (body) {
	return buildResponse(200, body);
}

export function failure (body) {
	return buildResponse(500, body);
}

function buildResponse (statusCode, body) {
	return {
		statusCode,
		header: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Credentials': true
		},
		body: JSON.stringify(body)
	};
}
