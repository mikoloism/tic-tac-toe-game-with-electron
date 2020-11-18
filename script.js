const ready = (function () {
	const log = (...args) => console.log(...args);
	let placeholders = document.getElementsByClassName('placeholder');
	const selected = { user1: [], user2: [] };
	let user = 0;
	const checkupPoint = () => {};

	const append = (parent, value) => {
		let span = document.createElement('h1');
		span.innerHTML = value;
		parent.appendChild(span);
	};
	Array.from(placeholders).forEach((item) => {
		item.onclick = function () {
			if (this.dataset.value === 'null') {
				this.dataset.value = user === 1 ? 'x' : 'o';
				user = !!user ? 0 : 1;
				append(this, this.dataset.value);
				// checkupPoint();
			}
		};
	});
})();
