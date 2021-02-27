import { FunctionHandler } from "../types";
import {
  CreateTaskDocument,
  CreateTaskMutation,
  CreateTaskMutationVariables,
} from "./GeneratedGraphQL";
import { request } from "./utils/request";
import { sendResponse } from "./utils/sendResponse";

export const handler: FunctionHandler = async (ev) => {
  if (!ev?.body) return sendResponse(401, { error: "Expected input" });
  const b = JSON.parse(ev?.body) as {
    description: string;
    completed: boolean;
  };
  const { description, completed } = b;
  console.log(b);
  const data = await request<CreateTaskMutation, CreateTaskMutationVariables>(
    CreateTaskDocument,
    { description, completed }
  );
  return sendResponse(200, data.data ?? {});
};
