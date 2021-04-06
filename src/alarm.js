const getElement = (id) => {
	return document.getElementById(id);
};

const notifyButton = getElement("notify");
const notice = getElement("notice");
const noticeText = getElement("notice-text");
const form = getElement("form");
const inputMin = getElement("input-min");

notifyButton.onclick = () => {
	setAlarm(Number(inputMin.value));
};

const setAlarm = (mins) => {
	const time = mins * 60000; // convert to milliseconds

	// hide and show divs
	notice.classList.remove("hidden");
	noticeText.innerHTML = `You will be notified within ${mins} minutes!`;
	form.classList.remove("flex");
	form.classList.add("hidden");

	setTimeout(() => {
		const notif = new Notification("Alarm!", {
			body: "Time has passed!",
		});

		// reset
		notice.classList.add("hidden");
		noticeText.innerHTML = `You will be notified within ${mins} minutes!`;
		form.classList.add("flex");
		form.classList.remove("hidden");

		notif.onclick = () => {
			notif.close(); // close if clicked
		};
	}, time);
};
