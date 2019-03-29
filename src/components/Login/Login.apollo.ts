import gql from 'graphql-tag';

export const LOG_IN = gql`
	query login ($username: String!, $password: String!) {
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
