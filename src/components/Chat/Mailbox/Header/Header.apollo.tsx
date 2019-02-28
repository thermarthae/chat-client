import gql from 'graphql-tag';

export const TOGGLE_ASIDE = gql`
	mutation toggleAside {
		toggleAside @client {
			isAsideOpen
		}
	}
`;
