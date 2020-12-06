const { app, BrowserWindow, ipcMain } = require('electron');

function createWindow() {
	const winOption = {
		width: 350,
		height: 500,
		alwaysOnTop: true,
		autoHideMenuBar: true,
		// icon: './assets/icon.jpeg',
		webPreferences: {
			nodeIntegration: true,
		},
	};
	const main = new BrowserWindow(winOption);
	main.loadFile('index.html');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});
app.on('activate', () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});
