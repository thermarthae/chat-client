import * as React from "react";
import { FormattedMessage } from "react-intl";

import "../style/error.component.scss";

const Error = ({ location }: any) => {
	console.error("Error 404: ", location.pathname);
	return (
		<div id="error">
			<FormattedMessage id="error" />
		</div>
	);
};
export default Error;
