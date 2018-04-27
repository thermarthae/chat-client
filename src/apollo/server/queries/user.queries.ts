import { gql } from "apollo-boost";

export const getAccess = gql`
	query ($username: String!, $password: String!){
		getAccess(username: $username, password: $password) {
			user {
				_id
				name
				email
				isAdmin
			}
			access_token
			refresh_token
			error {
				code
				message
			}
		}
	}
`;

export interface IGetAccessResponse {
	getAccess: {
		user: {
			_id: string
			name: string
			email: string
			isAdmin: boolean
		}
		access_token: string;
		refresh_token: string;
		error?: {
			code: number;
			message: string;
		}
	};
}
