import gql from 'graphql-tag';

export const GET_ASIDE_STATUS = gql`
	query getAsideStatus {
		chat @client {
			isAsideOpen
		}
	}
`;
export interface IGetAsideStatusRes {
	chat: {
		isAsideOpen: boolean;
	};
}
