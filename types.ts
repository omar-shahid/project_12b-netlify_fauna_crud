import {
  APIGatewayEvent,
  APIGatewayProxyResultV2,
  Callback,
  Context,
} from "aws-lambda";

export type FunctionHandler = (
  event?: APIGatewayEvent,
  context?: Context,
  callback?: Callback
) => Promise<APIGatewayProxyResultV2>;
