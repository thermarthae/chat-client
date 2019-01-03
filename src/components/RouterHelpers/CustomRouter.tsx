import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import UpdateBlocker from './UpdateBlocker';

interface ICustomRouterProps {
	isLoggedIn: boolean;
	children: (href: string) => React.ReactNode;
}

const CustomRouter = ({ isLoggedIn, children }: ICustomRouterProps) => (
	<BrowserRouter>
		<UpdateBlocker isLoggedIn={isLoggedIn}>
			{locationHref => children(locationHref)}
		</UpdateBlocker>
	</BrowserRouter>
);
export default CustomRouter;
