import './index.styl';
import React, { Component } from 'react';
import ImageList from 'components/image-list';
import moment from 'moment';
import { ipcRenderer } from 'electron';

class App extends Component {
	constructor() {
		super();
		this.state = {
			date: moment().format('M月D日'),
			time: '11:00',
			imgs: [
				'https://gdp.alicdn.com/imgextra/i4/1056114842/TB2QoeXaWm5V1Bjy1zeXXcTCFXa_!!1056114842.jpg',
				'https://gdp.alicdn.com/imgextra/i4/1056114842/TB2QoeXaWm5V1Bjy1zeXXcTCFXa_!!1056114842.jpg',
				'https://gdp.alicdn.com/imgextra/i1/1056114842/TB2N39ItFXXXXabXpXXXXXXXXXX_!!1056114842.jpg',
				'https://gdp.alicdn.com/imgextra/i1/1056114842/TB2N39ItFXXXXabXpXXXXXXXXXX_!!1056114842.jpg',
				'https://gdp.alicdn.com/imgextra/i3/1056114842/TB2yt_ctFXXXXa7XXXXXXXXXXXX_!!1056114842.jpg'
			]
		};
	}

	add() {
		ipcRenderer.send('open:search');
	}

	remove(img) {
		console.log(img);
	}

	render() {
		return (
			<div className="wrapper">
				<section className="row">
					<div className="col">
						<label>活动时间</label>
						<input type="text" defaultValue={this.state.date} />
					</div>

					<div className="col">
						<label>开始时间</label>
						<input type="text" defaultValue={this.state.time} />
					</div>
				</section>

				<p>活动商品</p>
				<ImageList images={this.state.imgs} onAdd={this.add} onRemove={this.remove} />
			</div>
		);
	}
}

export default App;
