const electron = require('electron');
const { ipcRenderer } = electron;

document.addEventListener('keydown', (e) => {
	e = window.event ? window.event : e;
	if (e.key == 'F1' || e.keyCode == '112') {
		ipcRenderer.invoke('ToggleDevTools');
	}
	if (e.key == 'F5' || e.keyCode == '116') {
		ipcRenderer.invoke('RefreshWindow');
	}
});
document.addEventListener('mousedown', (e) => {
	if (e.button == 2) {
		let { offsetX, offsetY } = e;
		const contextMenu = document.getElementById('context-menu');
		contextMenu.style.left = `${offsetX}px`;
		contextMenu.style.top = `${offsetY}px`;
	}
});
