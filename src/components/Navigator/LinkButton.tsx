import React from 'react';
import IconButton, { IconButtonProps } from '@material-ui/core/IconButton';
import { NavLink } from 'react-router-dom';

interface ILinkButtonProps extends IconButtonProps {
	to: string;
	activeClassName?: string;
	exact?: boolean;
}
const LinkButton = (props: ILinkButtonProps) => (
	<IconButton {...props} color='inherit' component={NavLink as any} />
);

export default LinkButton;
