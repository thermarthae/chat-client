import gql from 'graphql-tag';

export const SET_OPONENT_ID = gql`
	mutation setOponentId($id: String) {
		setOponentId(oponentId: $id) @client
	}
`;
