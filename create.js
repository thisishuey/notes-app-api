import uuid from 'uuid';
import * as dynamoDBLib from './libs/dynamoDB';
import { success, failure } from './libs/response';

export async function main (event, context, callback) {
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

	try {
		await dynamoDBLib.call('put', params);
		callback(null, success(params.Item));
	} catch (exception) {
		callback(null, failure({ status: false }));
	}
}
