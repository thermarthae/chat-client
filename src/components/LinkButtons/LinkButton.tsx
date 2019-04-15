import React from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';
import Button, { ButtonProps } from '@material-ui/core/Button';

const NavLinkRef = React.forwardRef<HTMLAnchorElement, NavLinkProps>(
	(props, ref) => <NavLink {...props} innerRef={ref} />
);

type PartialNavLinkProps = Pick<NavLinkProps, 'to' | 'activeClassName' | 'exact' | 'innerRef' | 'strict'>;
type TLinkButtonProps = ButtonProps & PartialNavLinkProps;

const LinkButton = (props: TLinkButtonProps) => (
	<Button color='primary' {...props} component={NavLinkRef as any} />
);

export default LinkButton;
