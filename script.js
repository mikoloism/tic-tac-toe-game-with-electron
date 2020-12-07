const ready = (function () {
	// playSound({
	// 	name: 'background-music',
	// 	loop: true,
	// 	volume: 0.4,
	// 	duration: false,
	// });
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
		document
			.getElementsByClassName('frame')
			.item(0).style.transform = `scale(0)`;
		playSound({
			name: 'modal-sound-effect (4)',
			duration: 350,
			volume: 0.7,
		});
		modal.onclick = function () {
			playSound({
				name: 'modal-sound-effect (1)',
				duration: 500,
				volume: 0.7,
			});
			modal.classList.add('scale-fade-out');
			window.setTimeout(() => {
				hideModal();
			}, 350);
		};
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
		let span1 = document.createElement('span');
		let span2 = document.createElement('span');
		clickedElement.appendChild(span1);
		clickedElement.appendChild(span2);
		span1.classList.add(`${whichPlayer}-shape`);
		span2.classList.add(`${whichPlayer}-shape`);
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
		});
		holder.onmouseenter = function () {
			this.classList.add(`hover-${player == 'x' ? 'o' : 'x'}`);
		};
		holder.onmouseleave = function () {
			this.classList.remove(`hover-${player == 'x' ? 'o' : 'x'}`);
		};
		function updatePlayerState() {
			if (this.dataset.player === 'null') {
				playSound({ name: 'click-sound-effect', duration: 100 });
				player = player === 'o' ? 'x' : 'o';
				updateText(this, player);
				checkHolders();
			} else playSound({ name: 'click-denied-sound', duration: 500 });
		}
	});
})();
