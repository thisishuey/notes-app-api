import * as dynamoDBLib from './libs/dynamoDB';
import { success, failure } from './libs/response';

export async function main (event, context, callback) {
	const data = JSON.parse(event.body);
	const params = {
		TableName: 'notes',
		Key: {
			userId: event.requestContext.identity.cognitoIdentityId,
			noteId: event.pathParameters.id
		},
		UpdateExpression: 'SET content = :content, attachment = :attachment, modified = :modified',
		ExpressionAttributeValues: {
			":attachment": data.attachment ? data.attachment : null,
			":content": data.content ? data.content : null,
			":modified": Date.now()
		},
		ReturnValues: 'ALL_NEW'
	};

	try {
		const result = await dynamoDBLib.call('update', params);
		callback(null, success(result.Attributes));
	} catch (exception) {
		console.log(exception);
		callback(null, failure({ status: false }));
	}
}