import './index.styl';
import React, { Component } from 'react';
import moment from 'moment';
import { ipcRenderer } from 'electron';

import ImageList from 'components/image-list';
import SearchPane from 'components/search-pane';
import Overlay from 'components/overlay';

class App extends Component {
	constructor() {
		super();
		this.state = {
			date: moment().format('M月D日'),
			time: '11:00',
			imgs: [],
			showSearchPane: false
		};
	}

	render() {
		return (
			<div className="wrapper">
				<div className="main">
					<section className="row">
						<div className="col">
							<label>活动日期</label>
							<input type="text" defaultValue={this.state.date} />
						</div>

						<div className="col">
							<label>开始时间</label>
							<input type="text" defaultValue={this.state.time} />
						</div>
					</section>

					<p>活动商品</p>
					<ImageList
						images={this.state.imgs}
						onAdd={this.add.bind(this)}
						onRemove={this.remove.bind(this)} />
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

	remove(img) {
		let imgs = this.state.imgs.slice(0);
		let idx = imgs.indexOf(img);
		imgs.splice(idx, 1);
		this.setState({imgs: imgs});
	}

	closeSearchPane() {
		this.setState({showSearchPane: false});
	}

	onAddImages(imgs) {
		let newImages = this.state.imgs.slice(0);
		this.setState({
			imgs: newImages.concat(imgs),
			showSearchPane: false
		});

	}
}

export default App;
