document.onclick = () => {
	const palyAudio = new Promise((resolve, reject) => {
		const mp3 = {},
			wav = {};
		wav.src = './assets/click-sound-effect.wav';
		mp3.src = './assets/click-sound-effect.mp3';
		wav.audio = new Audio(wav.src);
		mp3.audio = new Audio(mp3.src);
		resolve({ mp3, wav });
	});

	const timeOut = { delay: 1000 };
	palyAudio
		.then(({ mp3 } = {}) => mp3.audio.play())
		.then(({ mp3 } = {}) => {
			timeOut.handle = window.setTimeout(() => {
				mp3.audio.pause();
				mp3.audio.currentTime = 0;
			}, timeOut.delay);
		})
		.then(() => window.clearTimeout(timeOut.handle));
};
