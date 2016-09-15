import './index.styl';
import React, { Component } from 'react';
import classnames from 'classnames';
import { ipcRenderer } from 'electron';

import loadingImage from './loading.gif';

class SearchPane extends Component {
	constructor() {
		super()
		this.state = { imgs: [], selected: [], loading: false };

		this._imgs = [];

		ipcRenderer.on('find:item', (e, imgs) => this.setState({ imgs, loading: false }) );
	}

	componentWillReceiveProps(nextProps) {
		if (!nextProps.show) {
			this.setState({ imgs: [], selected: [] });
			this.refs.searchText.value = '';
			this._imgs = [];
		}
	}

	render() {
		let classes = classnames('search-pane', {
			hidden: !this.props.show
		});

		let imgSecClass = classnames('image-section', {
			hidden: !this.state.imgs.length
		});

		let loading = classnames({hidden: !this.state.loading});

		return (
			<div className={classes}>
				<p>请输入您的商品链接</p>

				<div className="input-box">
					<input ref="searchText" type="text" />
					<button onClick={this.doSearch.bind(this)}>确定</button>
				</div>

				<img className={loading} src={loadingImage} />

				<div className={imgSecClass}>
					<ul className="item-images">
						{ this.state.imgs.map((img, idx) => {
							let klass = classnames({
								selected: this._imgs.indexOf(img) >= 0
							});
							return (
								<li className={klass}
									key={idx}
									onClick={this.selectImage.bind(this, img)}>
									<img src={img + '_100x100.jpg'} />
								</li>
							);
						}) }
					</ul>

					<div className="button-section">
						<button onClick={this.addImages.bind(this)}>添加</button>
					</div>
				</div>
			</div>
		);
	}

	doSearch() {
		this.id = this.findItemId(this.refs.searchText.value);

		if (this.id) {
			this.setState({loading: true});
			ipcRenderer.send('search:item', this.refs.searchText.value);
		}
	}

	selectImage(img) {
		if (this._imgs.indexOf(img) < 0) {
			let selected = this.state.selected.slice(0);
			selected.push({ id: this.id, url: img });
			this._imgs.push(img);
			this.setState({ selected });
		}
	}

	addImages() {
		if (this.props.onAddImages)
			this.props.onAddImages(this.state.selected);
	}

	findItemId(url) {
		const match = url.match(/[\?&]id=([^&]*)/i);
		return match ? match[1]: null;
	}
}

export default SearchPane;
