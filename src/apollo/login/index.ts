import { gql } from "apollo-boost";

export const LOG_IN = gql`
	query ($username: String!, $password: String!){
		getAccess(username: $username, password: $password) {
			access_token
			refresh_token
			error {
				code
				message
			}
		}
	}
`;
export interface ILogInResponse {
	getAccess: {
		access_token: string;
		refresh_token: string;
		error?: {
			code: number;
			message: string;
		}
	};
}

export const SET_LOGIN_STATUS = gql`
	mutation {
		setLoginStatus(loginStatus: true) @client
	}
`;
