import { gql } from "apollo-boost";

export const GET_APP_DATA = gql`
	query {
		app {
			language @client
			isLoggedIn @client
		}
	}
`;
