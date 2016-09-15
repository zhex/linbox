const { app, BrowserWindow, ipcMain, clipboard } = require('electron');
const fetchor = require('./utils/fetchor');
const generator = require('./utils/generator');

let wins = {};

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

ipcMain.on('preview', (e, data) => {
	generator.build('tb-rush', data).then((html) => {
		console.log(html);
		clipboard.writeText(html);
	});
});

// ipcMain.on('open:search', () => {
// 	if (wins.search) {
// 		wins.search.focus();
// 	} else {
// 		const bounds = wins.main.getBounds();
// 		let search = new BrowserWindow({
// 			width: 400,
// 			height: 600,
// 			x: bounds.width + bounds.x - 200,
// 			y: bounds.y + 100,
// 		});
// 		search.loadURL(`file://${__dirname}/templates/search.html`);
// 		search.on('closed', () => wins.search = null);

// 		wins.search = search;
// 	}

// });
