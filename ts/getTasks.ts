import { AllTasksDocument, AllTasksQuery } from "./GeneratedGraphQL";
import { FunctionHandler } from "../types";
import { request } from "./utils/request";
import { sendResponse } from "./utils/sendResponse";

export const handler: FunctionHandler = async () => {
  try {
    const data = await request<AllTasksQuery, undefined>(AllTasksDocument);
    console.log(data);
    return sendResponse(200, data);
  } catch (e) {
    console.log(e);
    return sendResponse(500, { error: "Someting went wrong" });
  }
};
