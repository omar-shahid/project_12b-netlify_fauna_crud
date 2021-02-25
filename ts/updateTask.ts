import { FunctionHandler } from "../types";
import {
  UpdateTaskDocument,
  UpdateTaskMutation,
  UpdateTaskMutationVariables,
} from "./GeneratedGraphQL";
import { request } from "./utils/request";
import { sendResponse } from "./utils/sendResponse";

export const handler: FunctionHandler = async (ev) => {
  if (!ev?.body) return sendResponse(401, { error: "Expected Input" });
  const input = JSON.parse(ev.body) as UpdateTaskMutationVariables;
  const data = await request<UpdateTaskMutation, UpdateTaskMutationVariables>(
    UpdateTaskDocument,
    input
  );
  return sendResponse(200, data);
};
