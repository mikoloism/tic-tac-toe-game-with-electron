const playSound = ({
	name,
	duration = 500,
	format = 'mp3',
	volume = 1,
	loop = false,
} = {}) => {
	const audio = new Audio(`./assets/${name}.${format}`);
	audio.play();
	audio.volume = volume;
	audio.loop = loop;
	if (!!duration)
		window.setTimeout(() => {
			audio.pause();
			audio.currentTime = 0;
		}, duration);
};
