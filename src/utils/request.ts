import axios, { AxiosResponse } from "axios";
import dotenv from "dotenv";
import { print, DocumentNode } from "graphql";

dotenv.config();

export const request = <GraphQLType = undefined, Variables = undefined>(
  documentPath: DocumentNode,
  variables?: Variables
) => {
  return axios
    .post<{}, AxiosResponse<GraphQLType>>(
      "https://graphql.fauna.com/graphql",
      {
        query: print(documentPath),
        variables: variables ?? {},
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.FAUNA_SECRET}`,
        },
      }
    )
    .then((res) => res.data);
};
