import * as React from "react";
import { FormattedMessage } from "react-intl";

import IconButton from "@material-ui/core/IconButton";
import PersonAdd from "@material-ui/icons/PersonAdd";

const Head = () => {
	return (
		<div className="head">
			<span className="title">
				<FormattedMessage id="chat.menu.title" />
			</span>
			<IconButton className="btn">
				<PersonAdd style={{ fontSize: "inherit" }} />
			</IconButton>
		</div>
	);
};

export default Head;
