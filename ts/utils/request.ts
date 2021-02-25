import axios, { AxiosResponse } from "axios";
import dotenv from "dotenv";
import { print, DocumentNode } from "graphql";

dotenv.config();

export const request = <GraphQLType, Variables>(
  documentPath: DocumentNode,
  variables?: Variables
) => {
  console.log(process.env.FAUNA_SECRET);
  return axios
    .post<
      {},
      AxiosResponse<{ data?: GraphQLType; errors?: Record<string, any>[] }>
    >(
      "https://graphql.fauna.com/graphql",
      {
        query: print(documentPath),
        variables: variables ?? {},
      },
      {
        headers: {
          authorization: `Bearer ${process.env.FAUNA_SECRET}`,
        },
      }
    )
    .then((res) => res.data)
    .then((s) => {
      if (s.errors) {
        console.log(s.errors);
        throw new Error("Something went wrong when accessing the DB...");
      }
      return s;
    });
};
