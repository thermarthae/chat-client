import { gql } from "apollo-boost";

export const SET_LOGOUT_STATUS = gql`
	mutation {
		setLoginStatus(loginStatus: false) @client
	}
`;
