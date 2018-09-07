import * as dynamoDBLib from './libs/dynamoDB';
import { success, failure } from './libs/response';

export async function main (event, context, callback) {
	const params = {
		TableName: 'notes',
		KeyConditionExpression: 'userId = :userId',
		ExpressionAttributeValues: {
			':userId': event.requestContext.identity.cognitoIdentityId
		}
	};

	try {
		const result = await dynamoDBLib.call('query', params);
		callback(null, success(result.Items));
	} catch (exception) {
		callback(null, failure({ status: false }));
	}
}
