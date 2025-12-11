document.addEventListener('DOMContentLoaded', () => {
	const toggleButton = document.querySelector('[data-toggle-rage]');
	if (toggleButton) {
		toggleButton.addEventListener('click', toggleRage);
	}

	const perfectBtn = document.getElementById('calculateP');
	if (perfectBtn) {
		perfectBtn.addEventListener('click', checkPerfectNumber);
	}

	const fileBtn = document.getElementById('calculateS');
	if (fileBtn) {
		fileBtn.addEventListener('click', showFileSize);
	}

	const swappables = document.querySelectorAll('[data-swap]');
	swappables.forEach(img => {
		img.addEventListener('click', swapImage);
	});

	const togglePanel = document.getElementById('togglePanel');
	if (togglePanel) {
		togglePanel.addEventListener('click', toggleReceipts);
	}

	const vibeRange = document.getElementById('vibeRange');
	if (vibeRange) {
		vibeRange.addEventListener('input', updateVibeLabel);
		updateVibeLabel();
	}

	const spinScore = document.getElementById('spinScore');
	if (spinScore) {
		spinScore.addEventListener('click', spinVerdict);
	}
});

function toggleRage(event) {
	const shell = document.querySelector('.content');
	if (!shell) return;
	shell.classList.toggle('loud');
	const active = shell.classList.contains('loud');
	event.target.textContent = active ? 'Ok chill it out' : 'Click here to understand why!';
}

function checkPerfectNumber() {
	const input = document.getElementById('perfectInput');
	const output = document.getElementById('perfectResult');
	if (!input || !output) return;
	const value = parseInt(input.value, 10);
	if (isNaN(value) || value <= 1) {
		output.textContent = 'Give me a positive integer above 1.';
		return;
	}
	let sum = 1;
	for (let i = 2; i <= Math.sqrt(value); i++) {
		if (value % i === 0) {
			sum += i;
			const pair = value / i;
			if (pair !== i) {
				sum += pair;
			}
		}
	}
	output.textContent = sum === value ? `${value} is perfect.` : `${value} is ordinary.`;
}

function showFileSize() {
	const input = document.getElementById('fileSizeInput');
	const output = document.getElementById('fileResult');
	if (!input || !output) return;
	const file = input.files && input.files[0];
	if (!file) {
		output.textContent = 'Choose a file first.';
		return;
	}
	const sizeMb = (file.size / (1024 * 1024)).toFixed(2);
	output.textContent = `${file.name} weighs ${sizeMb} MB.`;
}

function swapImage(event) {
	const img = event.currentTarget;
	if (!img.dataset.swap) return;
	if (!img.dataset.original) {
		img.dataset.original = img.src;
	}
	const current = img.src;
	img.src = current.endsWith(img.dataset.swap) ? img.dataset.original : img.dataset.swap;
}

function toggleReceipts() {
	const receipts = document.getElementById('receipts');
	if (!receipts) return;
	receipts.classList.toggle('open');
}

function updateVibeLabel() {
	const slider = document.getElementById('vibeRange');
	const label = document.getElementById('vibeLabel');
	if (!slider || !label) return;
	const value = Number(slider.value);
	const tiers = ['Neutral', 'Mild side-eye', 'Shrug', 'Raised brow', 'Eh', 'Concerned', 'Yikes', 'Spicy', 'Max drama', 'Chaos', 'Full meltdown'];
	label.textContent = tiers[value] || 'Neutral';
}

function spinVerdict() {
	const scores = ['5/10 mid', '6/10 orange glow', '7/10 for the memes', '4/10 stale snacks', '8/10 chaotic good', '9/10 despite itself'];
	const result = document.getElementById('scoreResult');
	if (!result) return;
	const pick = scores[Math.floor(Math.random() * scores.length)];
	result.textContent = pick;
}
