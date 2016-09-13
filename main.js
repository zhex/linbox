const { app, BrowserWindow, ipcMain } = require('electron');

let wins = {};

function createWindow() {
	let win = new BrowserWindow({
		width: 400,
		height: 600,
		resizable: false,
		show: false
	});
	win.loadURL(`file://${__dirname}/index.html`);

	win.once('ready-to-show', () => win.show() );

	win.on('closed', () => win = null);

	wins.main = win;
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
	if (process.platform !== 'dawin') app.quit();
});

app.on('activate', () => {
	if (win === null) createWindow();
});

ipcMain.on('open:search', () => {
	if (wins.search) {
		wins.search.focus();
	} else {
		const bounds = wins.main.getBounds();
		let search = new BrowserWindow({
			width: 400,
			height: 600,
			x: bounds.width + bounds.x - 200,
			y: bounds.y + 100,
		});
		search.loadURL(`file://${__dirname}/index.html`);
		search.on('closed', () => wins.search = null);

		wins.search = search;
	}

});
