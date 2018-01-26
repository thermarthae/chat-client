import * as React from "react";

import "../../style/submenu.component.scss";

export default class Submenu extends React.Component {
	public render() {
		return (
			<div id="submenu">
				<div className="head">
					<div className="searchbar">
						<div className="btn">🔍</div>
						<input placeholder="Serach"/>
					</div>
				</div>
				<div className="list">
					<div className="line active">
						<div className="avatar">
							<div className="status"></div>
							<div className="img"></div>
						</div>
						<span className="name">Tomasz Przykładowy</span>
						<span className="message">asjbdsabjasdbjasasd...</span>
						<span className="menu btn"></span>
						<span className="date">2 min</span>
					</div>
					<div className="line unseen">
						<div className="avatar">
							<div className="status"></div>
							<div className="img"></div>
						</div>
						<span className="name">Tomasz Przykładowy</span>
						<span className="message">asjbdsabjasdbjasasd...</span>
						<span className="menu btn"></span>
						<span className="date">2 min</span>
					</div>
					<div className="line active unseen">
						<div className="avatar">
							<div className="status"></div>
							<div className="img"></div>
						</div>
						<span className="name">Tomasz Przykładowy</span>
						<span className="message">asjbdsabjasdbjasasd...</span>
						<span className="menu btn"></span>
						<span className="date">2 min</span>
					</div>
					<div className="line active">
						<div className="avatar">
							<div className="status"></div>
							<div className="img"></div>
						</div>
						<span className="name">Tomasz Przykładowy</span>
						<span className="message">asjbdsabjasdbjasasd...</span>
						<span className="menu btn"></span>
						<span className="date">2 min</span>
					</div>
					<div className="line unseen">
						<div className="avatar">
							<div className="status"></div>
							<div className="img"></div>
						</div>
						<span className="name">Tomasz Przykładowy</span>
						<span className="message">asjbdsabjasdbjasasd...</span>
						<span className="menu btn"></span>
						<span className="date">2 min</span>
					</div>
				</div>
			</div>
		);
	}
}
