const { app, BrowserWindow, Menu, ipcMain, clipboard } = require('electron');
const fetchor = require('./utils/fetchor');
const generator = require('./utils/generator');

let wins = {};
let rawHtml;

const template = [{
	label: 'Edit',
	submenu: [
		{ role: 'undo' },
		{ role: 'redo' },
		{ type: 'separator' },
		{ role: 'cut' },
		{ role: 'copy' },
		{ role: 'paste' },
		{ role: 'pasteandmatchstyle' },
		{ role: 'delete' },
		{ role: 'selectall' }
    ]
}];

if (process.platform === 'darwin') {
	const name = app.getName();
	template.unshift({
		label: name,
		submenu: [
			{ role: 'about' },
			{ type: 'separator' },
			{ role: 'services', submenu: [] },
			{ type: 'separator' },
			{ role: 'hide' },
			{ role: 'hideothers' },
			{ role: 'unhide' },
			{ type: 'separator' },
			{ role: 'quit' }
		]
	});
};

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

app.on('ready', () => {
	const menu = Menu.buildFromTemplate(template);
	Menu.setApplicationMenu(menu);

	createWindow();
});

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
		wins.preview.reload();
	} else {
		const bounds = wins.main.getBounds();
		let preview = new BrowserWindow({
			width: 980,
			height: 700,
			x: bounds.width + bounds.x - 200,
			y: bounds.y + 30,
		});
		preview.loadURL(`file://${__dirname}/views/preview.html`);
		preview.on('closed', () => wins.preview = null);

		wins.preview = preview;
	}
}
