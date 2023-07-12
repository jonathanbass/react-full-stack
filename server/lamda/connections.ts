import { DeleteItemCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

export const handler = async(event: any) => {
    const connectionId = event.requestContext.connectionId;
    const routeKey = event.requestContext.routeKey;
    const dynamoClient = new DynamoDBClient({ region: "eu-west-1" });
    const documentClient = DynamoDBDocumentClient.from(dynamoClient);
    const tableName = "connections";
    
    switch (routeKey) {
        case "$connect":

            const insertParams = {
                TableName: tableName,
                Item: { connectionId: connectionId }
            };
    
            await documentClient.send(new PutCommand(insertParams));
            
            break;
        case "$disconnect":
            
            const deleteParams = {
                TableName: tableName,
                Key: {
                    connectionId: {
                        S: connectionId
                    }
                }
            };
    
            const scanCommand = new DeleteItemCommand(deleteParams);
            await documentClient.send(scanCommand);
            
            break;
        case "$default":
            
            break;
    }
    
    const response = {
        statusCode: 200,
    };
    return response;
};
