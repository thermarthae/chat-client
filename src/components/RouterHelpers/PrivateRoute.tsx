import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router';

interface IPrivateRouteProps extends RouteProps {
	auth: boolean;
	component: React.ComponentType<any>;
	whenUnlogged?: boolean;
}

const PrivateRoute = ({ auth, component: Component, whenUnlogged, ...rest }: IPrivateRouteProps) => {
	return (
		<Route
			{...rest}
			render={props => {
				if (whenUnlogged) {
					if (!auth) return <Component {...props} />;
					return <Redirect to={{ pathname: '/', state: { from: props.location } }} />;
				}
				else {
					if (auth) return <Component {...props} />;
					return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />;
				}
			}}
		/>
	);
};
export default PrivateRoute;
