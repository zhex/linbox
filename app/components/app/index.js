import './index.styl';
import React, { Component } from 'react';
import moment from 'moment';
import { ipcRenderer } from 'electron';

import ItemList from 'components/item-list';
import SearchPane from 'components/search-pane';
import Overlay from 'components/overlay';

class App extends Component {
	constructor() {
		super();
		this.state = {
			items: [],
			showSearchPane: false
		};
		this.date = moment().format('M月D日');
		this.time = '11:00';
	}

	render() {
		return (
			<div className="wrapper">
				<div className="main">
					<section className="row">
						<div className="col">
							<label>活动日期</label>
							<input ref="dateInput" type="text" defaultValue={this.date} />
						</div>

						<div className="col">
							<label>开始时间</label>
							<input ref="timeInput" type="text" defaultValue={this.time} />
						</div>
					</section>

					<p>活动商品</p>
					<ItemList
						items={this.state.items}
						onAdd={this.add.bind(this)}
						onRemove={this.remove.bind(this)} />

					<div className="button-section">
						<button className="build" onClick={this.buildHTML.bind(this)}>生成代码并复制</button>
					</div>
				</div>

				<Overlay
					show={this.state.showSearchPane}
					onClick={this.closeSearchPane.bind(this)} />
				<SearchPane
					show={this.state.showSearchPane}
					onAddImages={this.onAddImages.bind(this)} />
			</div>
		);
	}

	add() {
		this.setState({showSearchPane: true});
	}

	remove(item) {
		let items = this.state.items.slice(0);
		let idx = items.indexOf(item);
		items.splice(idx, 1);
		this.setState({ items });
	}

	closeSearchPane() {
		this.setState({showSearchPane: false});
	}

	onAddImages(items) {
		let newItems = this.state.items.slice(0);
		this.setState({
			items: newItems.concat(items),
			showSearchPane: false
		});
	}

	buildHTML() {
		ipcRenderer.send('build', {
			date: this.refs.dateInput.value,
			time: this.refs.timeInput.value,
			items: this.state.items
		});
	}
}

export default App;
