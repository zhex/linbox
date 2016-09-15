import './index.styl';
import React, { Component } from 'react';
import classnames from 'classnames';
import { ipcRenderer } from 'electron';

class SearchPane extends Component {
	constructor() {
		super()
		this.state = { imgs: [], selected: [] };

		this.selected = [];

		ipcRenderer.on('find:item', (e, imgs) => {
			this.setState({ imgs });
		});
	}

	componentWillReceiveProps(nextProps) {
		if (!nextProps.show) {
			this.setState({ imgs: [], selected: [] });
			this.refs.searchText.value = '';
		}
	}

	render() {
		let classes = classnames('search-pane', {
			hidden: !this.props.show
		});

		let imgSecClass = classnames('image-section', {
			hidden: !this.state.imgs.length
		});

		return (
			<div className={classes}>
				<p>请输入您的商品链接</p>

				<div className="input-box">
					<input ref="searchText" type="text" />
					<button onClick={this.doSearch.bind(this)}>确定</button>
				</div>

				<div className={imgSecClass}>
					<ul className="item-images">
						{ this.state.imgs.map((img, idx) => {
							let klass = classnames({
								selected: this.state.selected.indexOf(img) >= 0
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

					<button onClick={this.addImages.bind(this)}>添加</button>
				</div>
			</div>
		);
	}

	doSearch() {
		ipcRenderer.send('search:item', this.refs.searchText.value);
	}

	selectImage(img) {
		let selected = this.state.selected.slice(0);
		selected.push(img);
		this.setState({ selected });
	}

	addImages() {
		if (this.props.onAddImages)
			this.props.onAddImages(this.state.selected);
	}
}

export default SearchPane;
