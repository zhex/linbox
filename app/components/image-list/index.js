import './index.styl';
import React, { Component } from 'react';

const protoTypes = {};

class ImageList extends Component {
	static prototypes: protoTypes;

	add() {
		if (this.props.onAdd) this.props.onAdd.call(this);
	}

	remove(img) {
		if (this.props.onRemove) this.props.onRemove.call(this, img);
	}

	render() {
		return (
			<ul className="image-list">
				{ this.props.images.map((img, idx) => {
					return (
						<li key={idx}>
							<img src={img + '_100x100.jpg'} />
							<a className="remove" onClick={ this.remove.bind(this, img) }>&times;</a>
						</li>
					);
				}) }
				<li className="add" onClick={ this.add.bind(this) }></li>
			</ul>
		);
	}
}

export default ImageList;
