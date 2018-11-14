import gql from 'graphql-tag';

export const LOG_IN = gql`
	query Login ($username: String!, $password: String!){
		login(username: $username, password: $password) {
			_id
		}
	}
`;
export interface ILogInResponse {
	login: {
		_id: string;
	};
}

export const SET_LOGIN_STATUS = gql`
	mutation SetLoginStatus {
		setLoginStatus(loginStatus: true) @client
	}
`;
