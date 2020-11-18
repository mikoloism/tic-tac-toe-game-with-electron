const ready = (function () {
	const log = (...args) => console.log(...args);
	let placeholders = document.getElementsByClassName('placeholder');
	const selected = { user1: [], user2: [] };
	let user = 0;
	const checkupPoint = () => {
		let holders = [
			placeholders[0].dataset.value,
			placeholders[1].dataset.value,
			placeholders[2].dataset.value,
			placeholders[3].dataset.value,
			placeholders[4].dataset.value,
			placeholders[5].dataset.value,
			placeholders[6].dataset.value,
			placeholders[7].dataset.value,
			placeholders[8].dataset.value,
		];

		// cross check-point
		if (
			holders[0] !== 'null' &&
			holders[4] !== 'null' &&
			holders[8] !== 'null' &&
			holders[2] !== 'null' &&
			holders[6] !== 'null'
		) {
			if (holders[0] === holders[4] && holders[0] === holders[8]) {
				if (holders[0] === 'x') log('#cross[0] > x');
				else if (holders[0] === 'o') log('#cross[0] > o');
			} else if (holders[2] === holders[4] && holders[2] === holders[6]) {
				if (holders[2] === 'x') log('#cross[2] > x');
				else if (holders[2] === 'o') log('#cross[2] > o');
			}
		}

		// row check-point
		for (let i = 0; i < 9; i += 3) {
			if (
				holders[i + 0] !== 'null' &&
				holders[i + 1] !== 'null' &&
				holders[i + 2] !== 'null'
			) {
				if (
					holders[i] === holders[i + 1] &&
					holders[i] === holders[i + 2]
				) {
					if (holders[i] === 'x') log('#row > x');
					else if (holders[i] === 'o') log('#row > o');
				}
			}
		}
		// column check-point
		for (let i = 0; i < 9; i += 1) {
			if (
				holders[i + 0] !== 'null' &&
				holders[i + 3] !== 'null' &&
				holders[i + 6] !== 'null'
			) {
				if (
					holders[i] === holders[i + 3] &&
					holders[i] === holders[i + 6]
				) {
					if (holders[i] === 'x') log('#column > x');
					else if (holders[i] === 'o') log('#column > o');
				}
			}
		}

		log('no any won!');
	};

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
				checkupPoint();
			}
		};
	});
})();
