import * as React from "react";
import { FormattedMessage } from "react-intl";

import "../style/error.component.scss";

const Error = () => {
	return <div id="error">
		<FormattedMessage id="error" />
	</div>;
};
export default Error;
