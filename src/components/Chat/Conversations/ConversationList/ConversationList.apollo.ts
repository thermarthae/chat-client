import gql from 'graphql-tag';

export const GET_OPONENT_ID = gql`
	query getOponentId {
		chat @client {
			oponentId
		}
	}
`;
export interface IGetOponentIdResponse {
	chat: {
		oponentId: string;
	};
}
