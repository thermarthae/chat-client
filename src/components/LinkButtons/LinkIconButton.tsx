import React from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';
import IconButton, { IconButtonProps } from '@material-ui/core/IconButton';

const NavLinkRef = React.forwardRef<HTMLAnchorElement, NavLinkProps>(
	(props, ref) => <NavLink {...props} innerRef={ref} />
);

type PartialNavLinkProps = Pick<NavLinkProps, 'to' | 'activeClassName' | 'exact' | 'innerRef' | 'strict'>;
type TLinkButtonProps = IconButtonProps & PartialNavLinkProps;

const LinkIconButton = (props: TLinkButtonProps) => (
	<IconButton color='inherit' {...props} component={NavLinkRef as any} />
);

export default LinkIconButton;
