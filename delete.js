import * as dynamoDBLib from './libs/dynamoDB';
import { success, failure } from './libs/response';

export async function main (event, context, callback) {
	const params = {
		TableName: 'notes',
		Key: {
			userId: event.requestContext.identity.cognitoIdentityId,
			noteId: event.pathParameters.id
		}
	};

	try {
		await dynamoDBLib.call('delete', params);
		callback(null, success({ status: true }));
	} catch (exception) {
		callback(null, failure({ status: false }));
	}
}