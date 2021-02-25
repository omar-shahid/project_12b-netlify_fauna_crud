import { APIGatewayProxyResultV2 } from "aws-lambda";

export const sendResponse = (
  statusCode: number,
  body: Record<string, any>
): APIGatewayProxyResultV2 => ({
  statusCode,
  body: JSON.stringify(body),
});
