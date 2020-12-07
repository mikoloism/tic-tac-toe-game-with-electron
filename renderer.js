const electron = require('electron');
const { ipcRenderer } = electron;

function shortKey(
	{
		name: keyName,
		code: keyCode,
		num: keyNumber,
		element = document,
		alt = false,
		shift = false,
		ctrl = false,
	} = {},
	callback,
) {
	return element.addEventListener('keypress', function (e) {
		const mainIf =
			String(keyName).toLowerCase() === String(e.key).toLowerCase() ||
			String(keyCode).toLowerCase() === String(e.code).toLowerCase() ||
			Number(keyNumber) === Number(e.keyCode)
				? callback()
				: undefined;

		if (ctrl && e.ctrlKey) return mainIf;
		if (shift && e.shiftKey) return mainIf;
		if (alt && e.altKey) return mainIf;
		return mainIf;
	});
}

shortKey({ name: 'F1', num: 112 }, () => ipcRenderer.invoke('ToggleDevTools'));
shortKey({ name: 'F5', num: 116 }, () => ipcRenderer.invoke('RefreshWindow'));
shortKey({ name: 'F11', num: 122 }, () =>
	ipcRenderer.invoke('FullScreenWindow'),
);
shortKey({ name: 'Escape', number: 27 }, () => ipcRenderer.invoke('ExitApp'));
