import { FunctionHandler } from "../types";
import {
  DeleteTaskDocument,
  DeleteTaskMutation,
  DeleteTaskMutationVariables,
} from "./GeneratedGraphQL";
import { request } from "./utils/request";
import { sendResponse } from "./utils/sendResponse";

export const handler: FunctionHandler = async (ev) => {
  if (!ev?.body) return sendResponse(200, { error: "expected id" });
  const { id } = JSON.parse(ev.body) as { id: string };
  const data = await request<DeleteTaskMutation, DeleteTaskMutationVariables>(
    DeleteTaskDocument,
    { id }
  );
  return sendResponse(200, data);
};
