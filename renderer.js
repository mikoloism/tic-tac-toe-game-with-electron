const electron = require('electron');
const { ipcRenderer } = electron;

function shortKey(
	{
		name: keyName,
		code: keyCode,
		num: keyNumber,
		alt = false,
		shift = false,
		ctrl = false,
	} = {},
	callback,
) {
	document.addEventListener('keydown', function (e) {
		const keyCheck =
			keyName === e.key || keyCode === e.code || keyNumber === e.keyCode;

		if (ctrl && e.ctrlKey && keyCheck) return callback();
		if (shift && e.shiftKey && keyCheck) return callback();
		if (alt && e.altKey && keyCheck) return callback();
		if (!alt && !shift && !ctrl && keyCheck) return callback();
		return undefined;
	});
}

shortKey({ name: 'F1', num: 112 }, () => ipcRenderer.invoke('ToggleDevTools'));
shortKey({ name: 'F5', num: 116 }, () => ipcRenderer.invoke('RefreshWindow'));
shortKey({ name: 'F11', num: 122 }, () =>
	ipcRenderer.invoke('FullScreenWindow'),
);
shortKey({ name: 'Escape', number: 27 }, () => ipcRenderer.invoke('ExitApp'));
