const ready = (function () {
	let placeholders = document.getElementsByClassName('placeholder');
	let player = 'o';
	let won = null;

	const hideModal = () => {
		restart();
	};
	const restart = () => {
		location.reload();
	};
	const showModal = (whoWon) => {
		let modal = document.createElement('div');
		modal.classList.add('modal');
		modal.id = 'modal';
		let playerSpan = document.createElement('span');
		playerSpan.classList.add('player');
		playerSpan.classList.add(whoWon);
		playerSpan.innerHTML = whoWon;
		modal.innerHTML = '<span>player won</span>';
		modal.appendChild(playerSpan);
		document.body.appendChild(modal);
		modal.onclick = hideModal;
	};

	const setDraw = () => {
		document.body.classList.add('draw');
		showModal('Draw');
	};
	const checkDraw = () => {
		players = [];
		Array.from(placeholders).forEach((holder) => {
			if (holder.dataset.player === 'null') players.push(holder);
		});
		if (players.length === 0 && won === null) setDraw();
	};

	const checkWon = (items, whichPlayer) => {
		let [i1, i2, i3] = items;
		if (
			placeholders[i1].dataset.player === whichPlayer &&
			placeholders[i2].dataset.player === whichPlayer &&
			placeholders[i3].dataset.player === whichPlayer &&
			placeholders[i1].dataset.player ===
				placeholders[i3].dataset.player &&
			placeholders[i1].dataset.player ===
				placeholders[i2].dataset.player &&
			placeholders[i2].dataset.player === placeholders[i3].dataset.player
		) {
			placeholders[i1].classList.add('won');
			placeholders[i2].classList.add('won');
			placeholders[i3].classList.add('won');
			won = whichPlayer;
			document.body.classList.add(`${won}-won`);
			showModal(won);
		} else checkDraw();
	};
	const checkHolders = () => {
		checkWon([0, 4, 8], 'x');
		checkWon([2, 4, 6], 'x');

		checkWon([0, 1, 2], 'x');
		checkWon([3, 4, 5], 'x');
		checkWon([6, 7, 8], 'x');

		checkWon([0, 3, 6], 'x');
		checkWon([1, 4, 7], 'x');
		checkWon([2, 5, 8], 'x');

		// ============================

		checkWon([0, 4, 8], 'o');
		checkWon([2, 4, 6], 'o');

		checkWon([0, 1, 2], 'o');
		checkWon([3, 4, 5], 'o');
		checkWon([6, 7, 8], 'o');

		checkWon([0, 3, 6], 'o');
		checkWon([1, 4, 7], 'o');
		checkWon([2, 5, 8], 'o');
	};

	const updateText = (clickedElement, whichPlayer) => {
		let span = document.createElement('h1');
		span.innerHTML = whichPlayer;
		clickedElement.appendChild(span);
		clickedElement.dataset.player = whichPlayer;
	};
	Array.from(placeholders).forEach((holder) => {
		holder.onclick = updatePlayerState;
		holder.addEventListener('keydown', function (e) {
			e = window.event ? window.event : e;
			const current = {
					holder: this,
					index: Number(this.getAttribute('tabindex')),
				},
				next = {}; // holder, index
			if (e.keyCode == '38')
				next.index =
					current.index - 3 < 0
						? current.index + 6 // (curIndex - 3) + 9
						: current.index - 3;
			if (e.keyCode == '39')
				next.index = current.index - 1 < 0 ? 8 : current.index - 1;
			if (e.keyCode == '40')
				next.index =
					current.index + 3 > 8
						? current.index - 6 // (curIndex + 3) - 9
						: current.index + 3;
			if (e.keyCode == '37')
				next.index = current.index + 1 > 8 ? 0 : current.index + 1;

			next.holder = placeholders[next.index];

			if (String(e.key).toLowerCase() == 'enter') next.holder.focus();
			console.log({ next, current });
		});
		function updatePlayerState() {
			if (this.dataset.player === 'null') {
				player = player === 'o' ? 'x' : 'o';
				updateText(this, player);
				checkHolders();
			}
		}
	});
})();
