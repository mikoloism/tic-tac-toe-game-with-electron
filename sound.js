document.onclick = async () => {
	try {
		const mp3 = {},
			wav = {};
		wav.src = './assets/click-sound-effect.wav';
		mp3.src = './assets/click-sound-effect.mp3';
		wav.audio = new Audio(wav.src);
		mp3.audio = new Audio(mp3.src);
		await mp3.audio.play();
		window.setTimeout(() => {
			mp3.audio.pause();
			mp3.audio.currentTime = 0;
		}, 150);
		console.log('Play Done', {});
	} catch (e) {
		console.log('Error@');
	}
};
