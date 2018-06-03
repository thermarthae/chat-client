import gql from "graphql-tag";

export const GET_ASIDE_STATUS = gql`
	query {
		chat @client {
			isAsideOpen
		}
	}
`;
