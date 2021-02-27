import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import { print } from 'graphql';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  Time: any;
  /** The `Long` scalar type represents non-fractional signed whole numeric values. Long can represent values between -(2^63) and 2^63 - 1. */
  Long: any;
};








export type Mutation = {
  __typename?: 'Mutation';
  /** Create a new document in the collection of 'Task' */
  createTask: Task;
  /** Update an existing document in the collection of 'Task' */
  updateTask?: Maybe<Task>;
  /** Delete an existing document in the collection of 'Task' */
  deleteTask?: Maybe<Task>;
};


export type MutationCreateTaskArgs = {
  data: TaskInput;
};


export type MutationUpdateTaskArgs = {
  id: Scalars['ID'];
  data: TaskInput;
};


export type MutationDeleteTaskArgs = {
  id: Scalars['ID'];
};

/** 'Task' input values */
export type TaskInput = {
  description: Scalars['String'];
  completed?: Maybe<Scalars['Boolean']>;
};


export type Query = {
  __typename?: 'Query';
  /** Find a document from the collection of 'Task' by its id. */
  findTaskByID?: Maybe<Task>;
  allTasks: TaskPage;
};


export type QueryFindTaskByIdArgs = {
  id: Scalars['ID'];
};


export type QueryAllTasksArgs = {
  _size?: Maybe<Scalars['Int']>;
  _cursor?: Maybe<Scalars['String']>;
};

export type Task = {
  __typename?: 'Task';
  /** The document's ID. */
  _id: Scalars['ID'];
  /** The document's timestamp. */
  _ts: Scalars['Long'];
  description: Scalars['String'];
  completed?: Maybe<Scalars['Boolean']>;
};

/** The pagination object for elements of type 'Task'. */
export type TaskPage = {
  __typename?: 'TaskPage';
  /** The elements of type 'Task' in this page. */
  data: Array<Maybe<Task>>;
  /** A cursor for elements coming after the current page. */
  after?: Maybe<Scalars['String']>;
  /** A cursor for elements coming before the current page. */
  before?: Maybe<Scalars['String']>;
};


export type CreateTaskMutationVariables = Exact<{
  description: Scalars['String'];
  completed: Scalars['Boolean'];
}>;


export type CreateTaskMutation = (
  { __typename?: 'Mutation' }
  & { createTask: (
    { __typename?: 'Task' }
    & Pick<Task, '_id'>
  ) }
);

export type DeleteTaskMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteTaskMutation = (
  { __typename?: 'Mutation' }
  & { deleteTask?: Maybe<(
    { __typename?: 'Task' }
    & Pick<Task, '_id'>
  )> }
);

export type UpdateTaskMutationVariables = Exact<{
  id: Scalars['ID'];
  data: TaskInput;
}>;


export type UpdateTaskMutation = (
  { __typename?: 'Mutation' }
  & { updateTask?: Maybe<(
    { __typename?: 'Task' }
    & Pick<Task, '_id'>
  )> }
);

export type AllTasksQueryVariables = Exact<{ [key: string]: never; }>;


export type AllTasksQuery = (
  { __typename?: 'Query' }
  & { allTasks: (
    { __typename?: 'TaskPage' }
    & { data: Array<Maybe<(
      { __typename?: 'Task' }
      & Pick<Task, 'description' | 'completed' | '_id'>
    )>> }
  ) }
);


export const CreateTaskDocument = gql`
    mutation createTask($description: String!, $completed: Boolean!) {
  createTask(data: {description: $description, completed: $completed}) {
    _id
  }
}
    `;
export const DeleteTaskDocument = gql`
    mutation deleteTask($id: ID!) {
  deleteTask(id: $id) {
    _id
  }
}
    `;
export const UpdateTaskDocument = gql`
    mutation updateTask($id: ID!, $data: TaskInput!) {
  updateTask(id: $id, data: $data) {
    _id
  }
}
    `;
export const AllTasksDocument = gql`
    query AllTasks {
  allTasks {
    data {
      description
      completed
      _id
    }
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: () => Promise<T>) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = sdkFunction => sdkFunction();
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    createTask(variables: CreateTaskMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateTaskMutation> {
      return withWrapper(() => client.request<CreateTaskMutation>(print(CreateTaskDocument), variables, requestHeaders));
    },
    deleteTask(variables: DeleteTaskMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<DeleteTaskMutation> {
      return withWrapper(() => client.request<DeleteTaskMutation>(print(DeleteTaskDocument), variables, requestHeaders));
    },
    updateTask(variables: UpdateTaskMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpdateTaskMutation> {
      return withWrapper(() => client.request<UpdateTaskMutation>(print(UpdateTaskDocument), variables, requestHeaders));
    },
    AllTasks(variables?: AllTasksQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<AllTasksQuery> {
      return withWrapper(() => client.request<AllTasksQuery>(print(AllTasksDocument), variables, requestHeaders));
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;