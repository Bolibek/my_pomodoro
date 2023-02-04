// Bularga tega ko'rmang 💣
import "core-js/stable";
import "regenerator-runtime/runtime";

// Kod yozishni shu yerdan boshlaysiz
// Bularga tega ko'rmang 💣
import "core-js/stable";
import "regenerator-runtime/runtime";

// Kod yozishni shu yerdan boshlaysiz
("use strict");
document.addEventListener("DOMContentLoaded", () => {
	//PART 1

	//config buttons
	const pomodoroBtn = document.querySelector("#pomodoro");
	const shortBreakBtn = document.querySelector("#short-break");
	const longBreakBtn = document.querySelector("#long-break");

	// inputs
	const pomodoroInput = document.querySelector("input[name=pomodoro]");
	const shortInput = document.querySelector("input[name=short-break]");
	const longInput = document.querySelector("input[name=long-break]");

	// timer elements
	const minutesTag = document.querySelector("#minutes");
	const secondsTag = document.querySelector("#seconds");
	const toggler = document.querySelector("#toggle-btn");

	// variables for reserved time
	let milliSecond = 1;
	let second = 1000 * milliSecond;
	let minute = 60 * second;
	let timeModule = 60;
	let timeForPomodoro = minute * 25; //in miliseconds;
	let timeForShortBreak = minute * 5; //in miliseconds;
	let timeForLongBreak = minute * 10; //in miliseconds;

	// default assignments
	pomodoroInput.value = timeForPomodoro / minute;
	shortInput.value = timeForShortBreak / minute;
	longInput.value = timeForLongBreak / minute;
	pomodoroBtn.classList.add("bg-red", "text-black");
	toggler.innerHTML = "START";

	//input values
	let pomodoroInputValue = pomodoroInput.value;
	let shortInputValue = shortInput.value;
	let longInputValue = longInput.value;

	// boolean variables
	let isRunning = false;
	let isPomodoro = true;
	let isShortBreak = false;
	let isLongBreak = false;

	assignTimer(pomodoroInputValue);

	pomodoroBtn.addEventListener("click", () => {
		isPomodoro = true;
		isShortBreak = false;
		isLongBreak = false;
		isRunning = false;
		console.log("pomodoro", pomodoroInputValue, isRunning);
		modeChanger(pomodoroInputValue, pomodoroBtn, shortBreakBtn, longBreakBtn);
	});
	shortBreakBtn.addEventListener("click", () => {
		isShortBreak = true;
		isPomodoro = false;
		isLongBreak = false;
		isRunning = false;
		console.log("short break", shortInputValue, isRunning);
		modeChanger(shortInputValue, shortBreakBtn, pomodoroBtn, longBreakBtn);
	});
	longBreakBtn.addEventListener("click", () => {
		isLongBreak = true;
		isPomodoro = false;
		isShortBreak = false;
		isRunning = false;
		console.log("long break", longInputValue, isRunning);
		modeChanger(longInputValue, longBreakBtn, pomodoroBtn, shortBreakBtn);
	});

	toggler.addEventListener("click", () => {
		isRunning = true;
		if (isShortBreak) {
			toggleTimer(shortInputValue * minute);
		} else if (isLongBreak) {
			toggleTimer(longInputValue * minute);
		} else if(isPomodoro) {
      toggleTimer(pomodoroInputValue * minute);
    }
		// toggleTimer(pomodoroInputValue * minute);
		console.log("toggler");
	});

	//functions}
	function modeChanger(inputValue, mainBtn, subBtn1, subBtn2) {
		inputValue * minute;
		mainBtn.classList.add("bg-red", "text-black");
		subBtn1.classList.remove("bg-red", "text-black");
		subBtn2.classList.remove("bg-red", "text-black");
		assignTimer(inputValue);
    console.log("modeChanger", updatedTime);
		toggler.innerHTML = "START";
	}

	function getZero(num) {
		if (num >= 0 && num < 10) {
			return "0" + num;
		} else {
			return num;
		}
	}

	//PART 2
	function toggleTimer(time) {
		console.log("timerToggler", isRunning);
		if (
			toggler.innerHTML === "START" ||
			toggler.innerHTML === "RESTART" ||
			toggler.innerHTML === "RESUME"
		) {
			toggler.innerHTML = "PAUSE";
			timerInterval = setInterval(() => {
				if (time <= 1000) {
					clearInterval(timerInterval);
					toggler.innerHTML = "RESTART";
				}
				!isRunning
					? (clearInterval(timerInterval),
					  toggler.innerHTML = "START",
					  assignTimer(time / minute),
            console.log("timerToggler", time, updatedTime))
					: time -= 1000, assignTimer(time / minute);
				
			}, 1000);
		} else {
			toggler.innerHTML = "RESUME";
			clearInterval(timerInterval);
		}
	}

	// PART 3
	// modal
	// element variables
	const settingsIcon = document.querySelector("#settings-icon");
	const closeIcon = document.querySelector("#close-icon");
	const applyBtn = document.querySelector("#apply-btn");
	const modal = document.querySelector("#modal");
	const pomodoroArrows = document.querySelector("#pomodoro-arrows");
	const shortBreakArrows = document.querySelector("#short-break-arrows");
	const longBreakArrows = document.querySelector("#long-break-arrows");

	// assignments
	modal.classList.add("hidden");
	closeIcon.innerHTML = "&times;";

	// events
	settingsIcon.addEventListener("click", () => {
		modal.classList.contains("hidden") && displayToggler(modal);
	});
	closeIcon.addEventListener("click", () => {
		displayToggler(modal);
	});
	applyBtn.addEventListener("click", () => {
		console.log("updated");
		displayToggler(modal);
	});

	pomodoroArrows.children[0].addEventListener("click", () => {
		pomodoroInputValue++;
		pomodoroInput.value = pomodoroInputValue;
		isPomodoro && assignTimer(pomodoroInputValue, minutesTag, secondsTag);
	});
	pomodoroArrows.children[1].addEventListener("click", () => {
		pomodoroInputValue >= 1 && pomodoroInputValue--;
		pomodoroInput.value = pomodoroInputValue;
		isPomodoro && assignTimer(pomodoroInputValue);
	});

	shortBreakArrows.children[0].addEventListener("click", () => {
		shortInputValue++;
		shortInput.value = shortInputValue;
		isShortBreak && assignTimer(shortInputValue);
	});
	shortBreakArrows.children[1].addEventListener("click", () => {
		shortInputValue >= 1 && shortInputValue--;
		shortInput.value = shortInputValue;
		isShortBreak && assignTimer(shortInputValue);
	});

	longBreakArrows.children[0].addEventListener("click", () => {
		longInputValue++;
		longInput.value = longInputValue;
		isLongBreak && assignTimer(longInputValue);
	});
	longBreakArrows.children[1].addEventListener("click", () => {
		longInputValue >= 1 ? longInputValue-- : longInputValue;
		longInput.value = longInputValue;
		isLongBreak && assignTimer(longInputValue);
	});

	// functions
	function displayToggler(element) {
		if (element.classList.contains("block")) {
			element.classList.toggle("block");
		}
		element.classList.toggle("hidden");
	}

	function assignTimer(inputValue) {
    console.log("assignTimer", inputValue);
		minutesTag.innerHTML = getZero(Math.floor(inputValue));
		secondsTag.innerHTML = getZero(
			Math.floor(((inputValue * minute) / second) % timeModule)
		);
	}
	// PART 4


}); 


// const modeButtonsWrapper = document.querySelector("#mode-btns-wrapper");
// 	const pomodoroBtn = document.querySelector("#pomodoro");
// 	const shortBreakBtn = document.querySelector("#short-break");
// 	const longBreakBtn = document.querySelector("#long-break");
// 	const minutesTag = document.querySelector("#minutes");
// 	const secondsTag = document.querySelector("#seconds");
//   const toggler = document.querySelector("#toggle-btn");
// 	let timeForPomodoro = 1500000; //in miliseconds;
// 	let timeForShortBreak = 300000; //in miliseconds;
// 	let timeForLongBreak = 600000; //in miliseconds;
// 	pomodoroBtn.classList.add("bg-red", "text-black");
// 	toggler.textContent = "START";

// 	assignTime(timeForPomodoro);

//   modeButtonsWrapper.addEventListener("click", (e) => {
//     if (e.target.id === "pomodoro") {
//       modeChanger(pomodoroBtn, shortBreakBtn, longBreakBtn, timeForPomodoro);
//     } else if (e.target.id === "short-break") {
//       modeChanger(shortBreakBtn, pomodoroBtn, longBreakBtn, timeForShortBreak);
//     } else if (e.target.id === "long-break") {
//       modeChanger(longBreakBtn, shortBreakBtn, pomodoroBtn, timeForLongBreak);
//     }
//   })

// 	function getZero(num) {
// 		if (num >= 0 && num < 10) {
// 			return "0" + num;
// 		}
// 		return num;
// 	}

// 	function modeChanger(mainBtn, subBtn1, subBtn2, time) {
// 		mainBtn.classList.add("bg-red", "text-black");
// 		subBtn1.classList.remove("bg-red", "text-black");
// 		subBtn2.classList.remove("bg-red", "text-black");
// 		assignTime(time);
// 	}

// 	function assignTime(time) {
// 		minutesTag.textContent = getZero((time / (60 * 1000)) % 60);
// 		secondsTag.textContent = getZero((time / 1000) % 60);
// 	}
