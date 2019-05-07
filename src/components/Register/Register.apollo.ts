import gql from 'graphql-tag';

export const REGISTER = gql`
	mutation register($username: String!, $email: String!, $password: String!) {
		register(name: $username, email: $email, password: $password) {
			_id
			name
			email
		}
	}
`;
export interface IRegisterRes {
	register: {
		_id: string;
		name: string;
		email: string;
	};
}
