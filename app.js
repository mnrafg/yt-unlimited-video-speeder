(function () {
	'use strict';

	const DEBUG = false;

	document.addEventListener('keyup', function (e) {
		const key = e.key.toLowerCase();
		const { altKey, ctrlKey } = e;

		if (altKey && ctrlKey && key === 'u') {
			const result = speedUp();
		}
		else if (altKey && ctrlKey && key === 'd') {
			const result = speedDown();
		}
		else if (altKey && ctrlKey && key === 'n') {
			setSpeed(1);
		}

		if (altKey && ctrlKey && (key === 'u' || key === 'd' || key === 'n')) {
			debug(printSpeed);
		}
	}, true);

	function getVideoElement() {
		const videoElement = document.getElementsByTagName('video');

		return videoElement.length > 0 ? videoElement[0] : null;
	}

	function getSpeed() {
		const videoElement = getVideoElement();
		let speed = false;

		if (videoElement !== null) {
			speed = videoElement.playbackRate;
		}

		return speed;
	}

	function setSpeed(speed) {
		const videoElement = getVideoElement();
		let result = false;

		if (videoElement !== null) {
			videoElement.playbackRate = speed;
			updateSpeedContent();
			result = true;
		}

		return result;
	}

	function updateSpeedContent() {
		const ytpLabels = getYtpLabels();
		const playbackLabel = getPlaybackLabel(ytpLabels);

		debug('playbackLabel:', playbackLabel);

		if (playbackLabel !== null) {
			const playBackContent = playbackLabel.nextElementSibling;
			debug('playBackContent:', playBackContent);

			if (playBackContent !== null) {
				playBackContent.textContent = (getSpeed() === 1 ? 'Normal' : getSpeed());
			}
		}
	}

	function getPlaybackLabel(labels) {
		return Array.from(labels).reduce((result, label) => {
			if (result === null && label.textContent.toLowerCase() === 'playback speed') {
				return label;
			}

			if (result !== null) {
				return result;
			}

			return null;
		}, null);
	}

	function getYtpLabels() {
		let labels = document.querySelectorAll('.ytp-menuitem-label');

		if (labels.length === 0) {
			triggerPopup();
			return getYtpLabels();
		}

		return labels;
	}

	function triggerPopup() {
		const settingsBtn = document.querySelector('.ytp-button.ytp-settings-button');

		if (settingsBtn !== null) {
			settingsBtn.click();
			settingsBtn.click();

			return true;
		}

		return false;
	}

	function speedUp() {
		const currentSpeed = getSpeed();
		let result = false;

		if (currentSpeed !== false) {
			setSpeed(currentSpeed + 0.25);
			result = true;
		}

		return result;
	}

	function speedDown() {
		const currentSpeed = getSpeed();
		let result = false;

		if (currentSpeed !== false && currentSpeed !== 0.25) {
			setSpeed(currentSpeed - 0.25);
			result = true;
		}

		return result;
	}

	function printSpeed() {
		const speed = getSpeed();

		console.log(`Current speed is ${speed}`);
	}

	function debug(label, value) {
		if (typeof label === 'function' && DEBUG) {
			label(value);
		}
		else if (typeof label === 'string' && DEBUG) {
			console.log(label, value);
		}
	}
})();
