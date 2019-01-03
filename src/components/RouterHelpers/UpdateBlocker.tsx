import React from 'react';

interface IUpdateBlocker {
	isLoggedIn: boolean;
	children: (href: string) => React.ReactNode;
}

export default class UpdateBlocker extends React.Component<IUpdateBlocker> {
	private locationHref = location.href.replace(/\/$/, '');

	public shouldComponentUpdate(nextProps: IUpdateBlocker) {
		if (nextProps.isLoggedIn !== this.props.isLoggedIn) return true;

		const newLocation = location.href.replace(/\/$/, '');
		if (this.locationHref !== newLocation) {
			this.locationHref = newLocation;
			return true;
		}
		return false;
	}

	public render() {
		return this.props.children(this.locationHref);
	}
}
