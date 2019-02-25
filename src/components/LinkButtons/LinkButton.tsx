import React from 'react';
import { NavLink } from 'react-router-dom';
import Button, { ButtonProps } from '@material-ui/core/Button';

interface ILinkButtonProps extends ButtonProps {
	to: string;
	activeClassName?: string;
	exact?: boolean;
}
const LinkButton = (props: ILinkButtonProps) => (
	<Button color='primary' {...props} component={NavLink as any} />
);

export default LinkButton;
