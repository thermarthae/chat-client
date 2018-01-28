import * as React from "react";
import { FormattedMessage } from "react-intl";

import "../style/error.component.scss";

const Error = ({ location }: any) => {
	return (
		<div id="error">
			<FormattedMessage id="error" defaultMessage={`Error 404 - ${location.pathname}`}/>
		</div>
	);
};
export default Error;
