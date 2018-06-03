import gql from "graphql-tag";

export const GET_APP_DATA = gql`
	query {
		app @client {
			language
			isLoggedIn
		}
	}
`;
