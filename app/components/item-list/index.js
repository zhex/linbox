import './index.styl';
import React, { Component } from 'react';

const protoTypes = {};

class ItemList extends Component {
	static prototypes: protoTypes;

	add() {
		if (this.props.onAdd) this.props.onAdd();
	}

	remove(item) {
		if (this.props.onRemove) this.props.onRemove(item);
	}

	render() {
		return (
			<ul className="item-list">
				{ this.props.items.map((item, idx) => {
					return (
						<li key={idx}>
							<img src={item.url + '_100x100.jpg'} />
							<a className="remove" onClick={ this.remove.bind(this, item) }>&times;</a>
						</li>
					);
				}) }
				<li className="add" onClick={ this.add.bind(this) }></li>
			</ul>
		);
	}
}

export default ItemList;
