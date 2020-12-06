const holders = document.getElementsByClassName('placeholder');
Array.from(holders).forEach((holder) =>
	holder.addEventListener('click', function () {
		try {
			const mp3 = {},
				wav = {};
			wav.src = './assets/click-sound-effect.wav';
			mp3.src = './assets/click-sound-effect.mp3';
			wav.audio = new Audio(wav.src);
			mp3.audio = new Audio(mp3.src);
			if (this.dataset.player == 'null') mp3.audio.play();
			window.setTimeout(() => {
				mp3.audio.pause();
				mp3.audio.currentTime = 0;
			}, 1000);
		} catch (err) {
			console.error(err);
		}
	}),
);
