import * as React from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";

import Input from "@material-ui/core/Input";
import IconButton from "@material-ui/core/IconButton";

import Search from "@material-ui/icons/Search";
import Cancel from "@material-ui/icons/Cancel";

interface ISearchboxProps {}
const Searchbox: React.SFC<ISearchboxProps & InjectedIntlProps> = props => {
	const { intl: { formatMessage } } = props;

	return (
		<div className="head searchbox">
			<Input
				classes={{ root: "searchbar" }}
				disableUnderline
				placeholder={formatMessage({ id: "chat.users.search" })}
				startAdornment={
					<Search className="btn" />
				}
				endAdornment={
					<IconButton
						className="cancel"
						onClick={e => e.preventDefault()}
						onMouseDown={e => e.preventDefault()}
					>
						<Cancel style={{ fontSize: "inherit" }} />
					</IconButton>
				}
			/>
		</div>
	);
};

export default injectIntl(Searchbox);
