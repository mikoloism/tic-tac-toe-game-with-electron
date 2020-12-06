document.onclick = async () => {
	try {
		const mp3 = {},
			wav = {};
		wav.src = './assets/click-sound-effect.wav';
		mp3.src = './assets/click-sound-effect.mp3';
		wav.audio = new Audio(wav.src);
		mp3.audio = new Audio(mp3.src);
		await mp3.audio.play();
		let timeOute;
		timeOute = window.setTimeout(() => {
			mp3.audio.pause();
			mp3.audio.currentTime = 0;
		}, 2000);
		window.clearTimeout(timeOute);
	} catch (e) {
		console.log('Error@');
	}
};
