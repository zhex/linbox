const { app, BrowserWindow, ipcMain, clipboard } = require('electron');
const fetchor = require('./utils/fetchor');
const generator = require('./utils/generator');

let wins = {};
let rawHtml;

function createWindow() {
	let win = new BrowserWindow({
		width: 400,
		height: 700,
		resizable: false,
		show: false
	});
	win.loadURL(`file://${__dirname}/views/index.html`);

	win.once('ready-to-show', () => win.show() );
	win.on('closed', () => win = null);

	wins.main = win;
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
	if (process.platform !== 'dawin') app.quit();
});

app.on('activate', () => {
	if (wins.main === null) createWindow();
});

ipcMain.on('search:item', (e, url) => {
	fetchor.getImagesFromPage(url).then((imgs) => {
		e.sender.send('find:item', imgs);
	});
});

ipcMain.on('build', (e, data) => {
	generator.build('tb-rush', data).then((html) => {
		rawHtml = html;
		clipboard.writeText(html);
		openPreview();
	});
});

ipcMain.on('fetch:html', (e) => {
	e.sender.send('push:html', rawHtml);
});

function openPreview() {
	if (wins.preview) {
		wins.preview.focus();
	} else {
		const bounds = wins.main.getBounds();
		let preview = new BrowserWindow({
			width: 980,
			height: 700,
			x: bounds.width + bounds.x - 200,
			y: bounds.y + 100,
		});
		preview.loadURL(`file://${__dirname}/views/preview.html`);
		preview.on('closed', () => wins.preview = null);

		wins.preview = preview;
	}
}
