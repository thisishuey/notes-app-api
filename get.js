import * as dynamoDBLib from './libs/dynamoDB';
import { success, notFound, failure } from './libs/response';

export async function main (event, context, callback) {
	const params = {
		TableName: 'notes',
		Key: {
			userId: event.requestContext.identity.cognitoIdentityId,
			noteId: event.pathParameters.id
		}
	}

	try {
		const result = await dynamoDBLib.call('get', params);
		if (result.Item) {
			callback(null, success(result.Item));
		} else {
			callback(null, notFound({ status: false, error: 'Item not found.' }));
		}
	} catch (exception) {
		callback(null, failure({ status: false }));
	}
}