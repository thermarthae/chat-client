import * as React from "react";

import "../../style/menu.component.scss";

export default class Menu extends React.Component {
	public render() {
		return (
			<div id="menu">
				<div className="head">
					<span className="title">Inbox</span>
					<span className="btn">I</span>
				</div>
				<div className="wrapper">
					<div className="container">
						<div className="line btn">
							<span className="name">All Messages</span>
							<span className="count">0</span>
						</div>
						<div className="line btn">
							<span className="name">Unread</span>
							<span className="count">0</span>
						</div>
						<div className="line btn">
							<span className="name">Important</span>
							<span className="count">0</span>
						</div>
						<div className="line btn">
							<span className="name">Draft</span>
							<span className="count">0</span>
						</div>
					</div>
					<div className="separator"></div>
					<div className="container">
						<div className="line btn">
							<span className="name">Teams</span>
							<span className="count">0</span>
						</div>
						<div className="line btn">
							<span className="name">Groups</span>
							<span className="count">0</span>
						</div>
						<div className="line btn">
							<span className="name">Locations</span>
						</div>
					</div>
					<div className="separator"></div>
					<div className="container">
						<div className="line btn">
							<span className="name">Help</span>
						</div>
						<div className="line btn">
							<span className="name">Settings</span>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
