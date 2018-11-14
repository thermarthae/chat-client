import gql from 'graphql-tag';

export const GET_LOGIN_STATUS = gql`
	query {
		app @client {
			isLoggedIn
		}
	}
`;

export const LOGOUT = gql`
	query logout {
		logout {
			_id
		}
	}
`;
