import { AllTasksDocument, AllTasksQuery } from "./GeneratedGraphQL";
import { FunctionHandler } from "../types";
import { request } from "./utils/request";

export const handler: FunctionHandler = async () => {
  const data = await request<AllTasksQuery>(AllTasksDocument);
  console.log(data);
  return {
    statusCode: 200,
    body: JSON.stringify({ s: data.data.allTasks.data }),
  };
};
