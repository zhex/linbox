import './index.styl';
import React, { Component } from 'react';
import classnames from 'classnames';

class Overlay extends Component {
	onClick() {
		if (this.props.onClick) this.props.onClick();
	}

	render() {
		let classes = classnames('overlay', {
			'hidden': !this.props.show
		});

		return (
			<div className={classes} onClick={this.onClick.bind(this)}></div>
		);
	}
}


export default Overlay;
