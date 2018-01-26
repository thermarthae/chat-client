import * as React from "react";

import "../../style/inbox.component.scss";

export default class Inbox extends React.Component {
	public render() {
		return (
			<div id="inbox">
				<div className="head">
					<div className="id">
						<span className="name">Maciek Pijak</span>
						<span className="typing">muwi...</span>
					</div>
					<div className="btn btn-big">🔍</div>
					<div className="btn btn-big">🔍</div>
					<div className="btn btn-big">🔍</div>
				</div>
				<div className="middle">
					<div className="message">
						<div className="author">
							<div className="img"></div>
						</div>
						<div className="content">
							<span>Lorem Ipsum is simply dummy text of </span>
						</div>
						<div className="options"></div>
					</div>
					<div className="message">
						<div className="author">
							<div className="img"></div>
						</div>
						<div className="content">
							<span>Lorem Ipsum is simply dummy text of </span>
						</div>
						<div className="options"></div>
					</div>
					<div className="message me">
						<div className="author">
							<div className="img"></div>
						</div>
						<div className="content">
							<span>Lorem Ipsum is simply dummy text of </span>
						</div>
						<div className="options"></div>
					</div>
					<div className="message">
						<div className="author">
							<div className="img"></div>
						</div>
						<div className="content">
							<span>Lorem Ipsum is simply dummy text of </span>
						</div>
						<div className="options"></div>
					</div>
					<div className="message">
						<div className="author">
							<div className="img"></div>
						</div>
						<div className="content">
							<span>Lorem Ipsum is simply dummy text of </span>
						</div>
						<div className="options"></div>
					</div>
					<div className="message me">
						<div className="author">
							<div className="img"></div>
						</div>
						<div className="content">
							<span>Lorem Ipsum is simply dummy text of </span>
						</div>
						<div className="options"></div>
					</div>
					<div className="message me">
						<div className="author">
							<div className="img"></div>
						</div>
						<div className="content">
							<span>Lorem Ipsum is simply dummy text of </span>
						</div>
						<div className="options"></div>
					</div>
				</div>
				<div className="bottom">
					<textarea placeholder="Type your message..." className="input"></textarea>
					<div className="emoticon btn"></div>
					<div className="send btn"></div>
				</div>
			</div>
		);
	}
}

// <div style="position: absolute;color: var(--text-secondary-dark-color);font-size: 0.9em;font-weight: 700;right: 5px;bottom: -16px;">16:34</div>
