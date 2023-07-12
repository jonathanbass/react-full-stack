// import { ApiGatewayManagementApiClient, PostToConnectionCommand } from "@aws-sdk/client-apigatewaymanagementapi";
import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";

export const handler = async(event: any) => {
    const dynamoClient = new DynamoDBClient({ region: "eu-west-1" });
    const documentClient = DynamoDBDocumentClient.from(dynamoClient);
    
    const scanMovies = new ScanCommand({ TableName: "movies" });
    const moviesData = await documentClient.send(scanMovies);
    const movies = moviesData.Items?.map((item) => unmarshall(item));
    
    const scanConnections = new ScanCommand({ TableName: "connections" });
    const connectionsData = await documentClient.send(scanConnections);
    const connections = connectionsData.Items?.map((item) => unmarshall(item));
    
    // const apiClient = new ApiGatewayManagementApiClient({ endpoint: "https://x2m3y2i03d.execute-api.eu-west-1.amazonaws.com/production" });
    
    for (const connection of connections ?? []) {
        const requestParams = {
            ConnectionId: connection.connectionId,
            Data: Buffer.from(JSON.stringify({ "movies-updated": movies })),
        };
        
        // const command = new PostToConnectionCommand(requestParams);
        
        try {
            // await apiClient.send(command);
        } catch (error) {
            console.log(error);
        }
    }
    
    const response = {
        statusCode: 200,
    };
    return response;
};
