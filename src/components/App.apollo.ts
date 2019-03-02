import gql from 'graphql-tag';

export const GET_LOGIN_STATUS = gql`
	query getLoginStatus {
		app @client {
			isLoggedIn
		}
	}
`;
