// Bularga tega ko'rmang 💣
import "core-js/stable";
import "regenerator-runtime/runtime";

// Kod yozishni shu yerdan boshlaysiz
const pomodoroBtn = document.querySelector("#pomodoro");
	const shortBreakBtn = document.querySelector("#short-break");
	const longBreakBtn = document.querySelector("#long-break");
	const minutesTag = document.querySelector("#minutes");
	const secondsTag = document.querySelector("#seconds");
	let timeForPomodoro = 1500000; //in miliseconds;
	let timeForShortBreak = 300000; //in miliseconds;
	let timeForLongBreak = 600000; //in miliseconds;
	pomodoroBtn.classList.add("bg-red", "text-black");
	toggler.innerHTML = "START";

	assignTime(timeForPomodoro);

	pomodoroBtn.addEventListener("click", pomodoroMode);
	shortBreakBtn.addEventListener("click", shortBreak);
	longBreakBtn.addEventListener("click", longBreak);

	function pomodoroMode() {
		modeChanger(pomodoroBtn, shortBreakBtn, longBreakBtn, timeForPomodoro);
	}

	function shortBreak() {
		modeChanger(shortBreakBtn, pomodoroBtn, longBreakBtn, timeForShortBreak);
	}

	function longBreak() {
		modeChanger(longBreakBtn, shortBreakBtn, pomodoroBtn, timeForLongBreak);
	}

	function getZero(num) {
		if (num >= 0 && num < 10) {
			return "0" + num;
		} else {
			return num;
		}
	}

	function modeChanger(mainBtn, subBtn1, subBtn2, time) {
		mainBtn.classList.add("bg-red", "text-black");
		subBtn1.classList.remove("bg-red", "text-black");
		subBtn2.classList.remove("bg-red", "text-black");
		assignTime(time);
	}

	function assignTime(time) {
		minutesTag.textContent = getZero((time / (60 * 1000)) % 60);
		secondsTag.textContent = getZero((time / 1000) % 60);
	}
