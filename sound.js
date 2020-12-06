const playSound = ({
	name,
	duration = 500,
	format = 'mp3',
	volume = 1,
} = {}) => {
	const audio = new Audio(`./assets/${name}.${format}`);
	audio.play();
	audio.volume = volume;
	window.setTimeout(() => {
		audio.pause();
		audio.currentTime = 0;
	}, duration);
};
