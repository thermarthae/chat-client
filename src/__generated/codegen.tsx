// tslint:disable
// THIS IS A GENERATED FILE, DO NOT MODIFY

type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the
   * `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO
   * 8601 standard for representation of dates and times using the Gregorian calendar.
   */
  DateTime: any;
};

export type App = {
  isLoggedIn: Scalars["Boolean"];
};

export type Chat = {
  isAsideOpen: Scalars["Boolean"];
  oponentId?: Maybe<Scalars["String"]>;
};

/** Count of draft, unread and all user conversation */
export type ChatJewels = {
  /** Count of all conversation that user belongs to */
  conversationCount: Scalars["Int"];
  /** Count of all conversation that contain unsended messages */
  draftCount: Scalars["Int"];
  /** Count of all unseen conversations */
  unreadCount: Scalars["Int"];
};

export type Conversation = {
  _id: Scalars["ID"];
  name: Scalars["String"];
  users: Array<Maybe<User>>;
  seen: Scalars["Boolean"];
  draft: Scalars["String"];
  messages: Array<Message>;
};

export type ConversationMessagesArgs = {
  limit: Scalars["Int"];
  skip: Scalars["Int"];
};

export type Message = {
  _id: Scalars["ID"];
  author: User;
  conversation: Scalars["String"];
  /** String in simplified extended ISO format (ISO 8601) */
  time: Scalars["DateTime"];
  content: Scalars["String"];
  me: Scalars["Boolean"];
};

export type Mutation = {
  /** Send message to initialize conversation with given users */
  initConversation?: Maybe<Conversation>;
  /** Mark given conversation as read */
  markConversationAsRead?: Maybe<Scalars["String"]>;
  /** Send message in given conversation */
  sendMessage?: Maybe<Message>;
  /** Delete user account */
  deleteUserAccount?: Maybe<User>;
  /** Register new user */
  register?: Maybe<User>;
  setLoginStatus: App;
  toggleAside: Chat;
  setOponentId: Chat;
};

export type MutationInitConversationArgs = {
  userIdArr: Array<Maybe<Scalars["ID"]>>;
  message: Scalars["String"];
  name: Scalars["String"];
};

export type MutationMarkConversationAsReadArgs = {
  conversationId: Scalars["ID"];
};

export type MutationSendMessageArgs = {
  conversationId: Scalars["ID"];
  message: Scalars["String"];
};

export type MutationDeleteUserAccountArgs = {
  id: Scalars["ID"];
};

export type MutationRegisterArgs = {
  name: Scalars["String"];
  email: Scalars["String"];
  password: Scalars["String"];
};

export type MutationSetLoginStatusArgs = {
  loginStatus: Scalars["Boolean"];
};

export type MutationSetOponentIdArgs = {
  oponentId?: Maybe<Scalars["String"]>;
};

export type Query = {
  /** Find conversation */
  findConversation?: Maybe<Array<Maybe<Conversation>>>;
  /** Get count data of user conversations */
  getChatJewels?: Maybe<ChatJewels>;
  /** Get conversation by ID */
  getConversation: Conversation;
  /** Get current user conversations */
  getUserConversations?: Maybe<Array<Maybe<Conversation>>>;
  /** Get current user data */
  currentUser?: Maybe<User>;
  /** Find user */
  findUser?: Maybe<Array<Maybe<User>>>;
  /** Get user by ID */
  getUser?: Maybe<User>;
  /** Log in */
  login?: Maybe<User>;
  /** Log out */
  logout?: Maybe<User>;
  app: App;
  chat: Chat;
};

export type QueryFindConversationArgs = {
  query: Scalars["String"];
};

export type QueryGetConversationArgs = {
  id: Scalars["ID"];
};

export type QueryFindUserArgs = {
  query: Scalars["String"];
};

export type QueryGetUserArgs = {
  id: Scalars["ID"];
};

export type QueryLoginArgs = {
  username: Scalars["String"];
  password: Scalars["String"];
};

export type Subscription = {
  updatedConversation?: Maybe<Conversation>;
  /** Get new added message */
  newMessageAdded?: Maybe<Message>;
};

export type User = {
  _id: Scalars["ID"];
  name: Scalars["String"];
  email: Scalars["String"];
};
export type GetLoginStatusQueryVariables = {};

export type GetLoginStatusQuery = { __typename?: "Query" } & {
  app: { __typename?: "App" } & Pick<App, "isLoggedIn">;
};

export type SetOponentIdMutationVariables = {
  id?: Maybe<Scalars["String"]>;
};

export type SetOponentIdMutation = { __typename?: "Mutation" } & {
  setOponentId: { __typename?: "Chat" } & Pick<Chat, "oponentId">;
};

export type NewMessageAddedSubscriptionVariables = {};

export type NewMessageAddedSubscription = { __typename?: "Subscription" } & {
  newMessageAdded: Maybe<{ __typename?: "Message" } & MessageMailboxFragment>;
};

export type UpdatedConversationSubscriptionVariables = {};

export type UpdatedConversationSubscription = {
  __typename?: "Subscription";
} & {
  updatedConversation: Maybe<
    { __typename?: "Conversation" } & ConversationNavFragment
  >;
};

export type GetOponentIdQueryVariables = {};

export type GetOponentIdQuery = { __typename?: "Query" } & {
  chat: { __typename?: "Chat" } & Pick<Chat, "oponentId">;
};

export type ConversationNavFragment = { __typename?: "Conversation" } & Pick<
  Conversation,
  "_id" | "name" | "seen" | "draft"
> & {
  messages: Array<
    { __typename?: "Message" } & Pick<
      Message,
      "_id" | "content" | "time" | "me" | "conversation"
    >
  >;
};

export type GetConvArrQueryVariables = {};

export type GetConvArrQuery = { __typename?: "Query" } & {
  getUserConversations: Maybe<
    Array<Maybe<{ __typename?: "Conversation" } & ConversationNavFragment>>
  >;
};

export type FindConvsAndUsersQueryVariables = {
  query: Scalars["String"];
};

export type FindConvsAndUsersQuery = { __typename?: "Query" } & {
  findConversation: Maybe<
    Array<Maybe<{ __typename?: "Conversation" } & ConversationNavFragment>>
  >;
  findUser: Maybe<
    Array<Maybe<{ __typename?: "User" } & Pick<User, "_id" | "name">>>
  >;
};

export type GetAsideStatusQueryVariables = {};

export type GetAsideStatusQuery = { __typename?: "Query" } & {
  chat: { __typename?: "Chat" } & Pick<Chat, "isAsideOpen">;
};

export type ToggleAsideMutationVariables = {};

export type ToggleAsideMutation = { __typename?: "Mutation" } & {
  toggleAside: { __typename?: "Chat" } & Pick<Chat, "isAsideOpen">;
};

export type MarkConvAsReadMutationVariables = {
  id: Scalars["ID"];
};

export type MarkConvAsReadMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "markConversationAsRead"
>;

export type MessageMailboxFragment = { __typename?: "Message" } & Pick<
  Message,
  "_id" | "time" | "me" | "content" | "conversation"
> & { author: { __typename?: "User" } & Pick<User, "name"> };

export type ConversationMailboxFragment = {
  __typename?: "Conversation";
} & Pick<Conversation, "_id" | "name" | "seen" | "draft"> & {
  messages: Array<{ __typename?: "Message" } & MessageMailboxFragment>;
};

export type GetConvQueryVariables = {
  id: Scalars["ID"];
  skip?: Maybe<Scalars["Int"]>;
  limit?: Maybe<Scalars["Int"]>;
};

export type GetConvQuery = { __typename?: "Query" } & {
  getConversation: {
    __typename?: "Conversation";
  } & ConversationMailboxFragment;
};

export type SendMessageMutationVariables = {
  conversationId: Scalars["ID"];
  message: Scalars["String"];
};

export type SendMessageMutation = { __typename?: "Mutation" } & {
  sendMessage: Maybe<{ __typename?: "Message" } & MessageMailboxFragment>;
};

export type LoginQueryVariables = {
  username: Scalars["String"];
  password: Scalars["String"];
};

export type LoginQuery = { __typename?: "Query" } & {
  login: Maybe<{ __typename?: "User" } & Pick<User, "_id">>;
};

export type SetLoginStatusMutationVariables = {};

export type SetLoginStatusMutation = { __typename?: "Mutation" } & {
  setLoginStatus: { __typename?: "App" } & Pick<App, "isLoggedIn">;
};

export type LogoutQueryVariables = {};

export type LogoutQuery = { __typename?: "Query" } & {
  logout: Maybe<{ __typename?: "User" } & Pick<User, "_id">>;
};

import gql from "graphql-tag";
import * as ReactApolloHooks from "react-apollo-hooks";
export const ConversationNavFragmentDoc = gql`
  fragment ConversationNav on Conversation {
    _id
    name
    seen
    draft
    messages(limit: 1) {
      _id
      content
      time
      me
      conversation
    }
  }
`;
export const MessageMailboxFragmentDoc = gql`
  fragment MessageMailbox on Message {
    _id
    author {
      name
    }
    time
    me
    content
    conversation
  }
`;
export const ConversationMailboxFragmentDoc = gql`
  fragment ConversationMailbox on Conversation {
    _id
    name
    seen
    draft
    messages(skip: $skip, limit: $limit) {
      ...MessageMailbox
    }
  }
  ${MessageMailboxFragmentDoc}
`;
export const GetLoginStatusDocument = gql`
  query getLoginStatus {
    app @client {
      isLoggedIn
    }
  }
`;

export function useGetLoginStatusQuery(
  baseOptions?: ReactApolloHooks.QueryHookOptions<GetLoginStatusQueryVariables>
) {
  return ReactApolloHooks.useQuery<
    GetLoginStatusQuery,
    GetLoginStatusQueryVariables
  >(GetLoginStatusDocument, baseOptions);
}
export const SetOponentIdDocument = gql`
  mutation setOponentId($id: String) {
    setOponentId(oponentId: $id) @client {
      oponentId
    }
  }
`;

export function useSetOponentIdMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    SetOponentIdMutation,
    SetOponentIdMutationVariables
  >
) {
  return ReactApolloHooks.useMutation<
    SetOponentIdMutation,
    SetOponentIdMutationVariables
  >(SetOponentIdDocument, baseOptions);
}
export const NewMessageAddedDocument = gql`
  subscription newMessageAdded {
    newMessageAdded {
      ...MessageMailbox
    }
  }
  ${MessageMailboxFragmentDoc}
`;

export function useNewMessageAddedSubscription(
  baseOptions?: ReactApolloHooks.SubscriptionHookOptions<
    NewMessageAddedSubscription,
    NewMessageAddedSubscriptionVariables
  >
) {
  return ReactApolloHooks.useSubscription<
    NewMessageAddedSubscription,
    NewMessageAddedSubscriptionVariables
  >(NewMessageAddedDocument, baseOptions);
}
export const UpdatedConversationDocument = gql`
  subscription updatedConversation {
    updatedConversation {
      ...ConversationNav
    }
  }
  ${ConversationNavFragmentDoc}
`;

export function useUpdatedConversationSubscription(
  baseOptions?: ReactApolloHooks.SubscriptionHookOptions<
    UpdatedConversationSubscription,
    UpdatedConversationSubscriptionVariables
  >
) {
  return ReactApolloHooks.useSubscription<
    UpdatedConversationSubscription,
    UpdatedConversationSubscriptionVariables
  >(UpdatedConversationDocument, baseOptions);
}
export const GetOponentIdDocument = gql`
  query getOponentId {
    chat @client {
      oponentId
    }
  }
`;

export function useGetOponentIdQuery(
  baseOptions?: ReactApolloHooks.QueryHookOptions<GetOponentIdQueryVariables>
) {
  return ReactApolloHooks.useQuery<
    GetOponentIdQuery,
    GetOponentIdQueryVariables
  >(GetOponentIdDocument, baseOptions);
}
export const GetConvArrDocument = gql`
  query getConvArr {
    getUserConversations {
      ...ConversationNav
    }
  }
  ${ConversationNavFragmentDoc}
`;

export function useGetConvArrQuery(
  baseOptions?: ReactApolloHooks.QueryHookOptions<GetConvArrQueryVariables>
) {
  return ReactApolloHooks.useQuery<GetConvArrQuery, GetConvArrQueryVariables>(
    GetConvArrDocument,
    baseOptions
  );
}
export const FindConvsAndUsersDocument = gql`
  query findConvsAndUsers($query: String!) {
    findConversation(query: $query) {
      ...ConversationNav
    }
    findUser(query: $query) {
      _id
      name
    }
  }
  ${ConversationNavFragmentDoc}
`;

export function useFindConvsAndUsersQuery(
  baseOptions?: ReactApolloHooks.QueryHookOptions<
    FindConvsAndUsersQueryVariables
  >
) {
  return ReactApolloHooks.useQuery<
    FindConvsAndUsersQuery,
    FindConvsAndUsersQueryVariables
  >(FindConvsAndUsersDocument, baseOptions);
}
export const GetAsideStatusDocument = gql`
  query getAsideStatus {
    chat @client {
      isAsideOpen
    }
  }
`;

export function useGetAsideStatusQuery(
  baseOptions?: ReactApolloHooks.QueryHookOptions<GetAsideStatusQueryVariables>
) {
  return ReactApolloHooks.useQuery<
    GetAsideStatusQuery,
    GetAsideStatusQueryVariables
  >(GetAsideStatusDocument, baseOptions);
}
export const ToggleAsideDocument = gql`
  mutation toggleAside {
    toggleAside @client {
      isAsideOpen
    }
  }
`;

export function useToggleAsideMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    ToggleAsideMutation,
    ToggleAsideMutationVariables
  >
) {
  return ReactApolloHooks.useMutation<
    ToggleAsideMutation,
    ToggleAsideMutationVariables
  >(ToggleAsideDocument, baseOptions);
}
export const MarkConvAsReadDocument = gql`
  mutation markConvAsRead($id: ID!) {
    markConversationAsRead(conversationId: $id)
  }
`;

export function useMarkConvAsReadMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    MarkConvAsReadMutation,
    MarkConvAsReadMutationVariables
  >
) {
  return ReactApolloHooks.useMutation<
    MarkConvAsReadMutation,
    MarkConvAsReadMutationVariables
  >(MarkConvAsReadDocument, baseOptions);
}
export const GetConvDocument = gql`
  query getConv($id: ID!, $skip: Int, $limit: Int) {
    getConversation(id: $id) {
      ...ConversationMailbox
    }
  }
  ${ConversationMailboxFragmentDoc}
`;

export function useGetConvQuery(
  baseOptions?: ReactApolloHooks.QueryHookOptions<GetConvQueryVariables>
) {
  return ReactApolloHooks.useQuery<GetConvQuery, GetConvQueryVariables>(
    GetConvDocument,
    baseOptions
  );
}
export const SendMessageDocument = gql`
  mutation sendMessage($conversationId: ID!, $message: String!) {
    sendMessage(conversationId: $conversationId, message: $message) {
      ...MessageMailbox
    }
  }
  ${MessageMailboxFragmentDoc}
`;

export function useSendMessageMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    SendMessageMutation,
    SendMessageMutationVariables
  >
) {
  return ReactApolloHooks.useMutation<
    SendMessageMutation,
    SendMessageMutationVariables
  >(SendMessageDocument, baseOptions);
}
export const LoginDocument = gql`
  query login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      _id
    }
  }
`;

export function useLoginQuery(
  baseOptions?: ReactApolloHooks.QueryHookOptions<LoginQueryVariables>
) {
  return ReactApolloHooks.useQuery<LoginQuery, LoginQueryVariables>(
    LoginDocument,
    baseOptions
  );
}
export const SetLoginStatusDocument = gql`
  mutation setLoginStatus {
    setLoginStatus(loginStatus: true) @client {
      isLoggedIn
    }
  }
`;

export function useSetLoginStatusMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    SetLoginStatusMutation,
    SetLoginStatusMutationVariables
  >
) {
  return ReactApolloHooks.useMutation<
    SetLoginStatusMutation,
    SetLoginStatusMutationVariables
  >(SetLoginStatusDocument, baseOptions);
}
export const LogoutDocument = gql`
  query logout {
    logout {
      _id
    }
  }
`;

export function useLogoutQuery(
  baseOptions?: ReactApolloHooks.QueryHookOptions<LogoutQueryVariables>
) {
  return ReactApolloHooks.useQuery<LogoutQuery, LogoutQueryVariables>(
    LogoutDocument,
    baseOptions
  );
}
