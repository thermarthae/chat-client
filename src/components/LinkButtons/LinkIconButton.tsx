import React from 'react';
import { NavLink } from 'react-router-dom';
import IconButton, { IconButtonProps } from '@material-ui/core/IconButton';

interface ILinkIconButtonProps extends IconButtonProps {
	to: string;
	activeClassName?: string;
	exact?: boolean;
}
const LinkIconButton = (props: ILinkIconButtonProps) => (
	<IconButton color='inherit' {...props} component={NavLink as any} />
);

export default LinkIconButton;
