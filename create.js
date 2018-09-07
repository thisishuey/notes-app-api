import uuid from 'UUID';
import AWS from 'aws-sdk';

AWS.config.update({ region: 'us-east-1' });
const dynamoDB = new AWS.DynamoDB.DocumentClient();

export function main (event, context, callback) {
	const data = JSON.parse(event.body);

	const params = {
		TableName: 'notes',
		Item: {
			userId: event.requestContext.identity.cognitoIdentityId,
			noteId: uuid.v1(),
			content: data.content,
			attachment: data.attachment,
			created: Date.now(),
			modified: Date.now()
		}
	};

	dynamoDB.put(params, (error, data) => {
		const headers = {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Credentials': true
		};

		if (error) {
			const response = {
				headers,
				statusCode: 500,
				body: JSON.stringify({ status: false })
			};
			callback(null, response);
			return;
		}

		const response = {
			headers,
			statusCode: 200,
			body: JSON.stringify(params.Item)
		};
		callback(null, response);
	});
}
