// Bularga tega ko'rmang 💣
import 'core-js/stable'
import 'regenerator-runtime/runtime'

// Kod yozishni shu yerdan boshlaysiz
const modeButtonsWrapper = document.querySelector('#mode-btns-wrapper')
const modeBtns = modeButtonsWrapper.querySelectorAll('button')
const minutesTag = document.querySelector('#minutes')
const secondsTag = document.querySelector('#seconds')
const toggler = document.querySelector('#toggle-btn')
const pomoTimesWrapper = document.querySelector('#pomo-times-wrapper')
const settingsIcon = document.querySelector('#settings-icon')
const closeIcon = document.querySelector('#close-icon')
const applyBtn = document.querySelector('#apply-btn')
const modal = document.querySelector('#modal')
const pomodoroArrows = document.querySelector('#pomodoro-arrows')
const shortBreakArrows = document.querySelector('#short-break-arrows')
const longBreakArrows = document.querySelector('#long-break-arrows')
const inputs = document.querySelectorAll('input[type="number"]')
const body = document.querySelector('body')
const fontsWrapper = document.querySelector('#fonts-wrapper')
const fontLabels = fontsWrapper.querySelectorAll('.font-label')
const colorsWrapper = document.querySelector('#colors-wrapper')
const colorLabels = colorsWrapper.querySelectorAll('label')
const bodyFonts = ['font-kumbhSans', 'font-robotoSlab', 'font-spaceMono']
const bgArray = ['bg-red', 'bg-teal', 'bg-purple']
let activeTime = 1500000
let pomodoroInputValue = 25
let shortBreakInputValue = 5
let longBreakInputValue = 10
let activeFont = 'font-kumbhSans'
let modalFont = 'font-kumbhSans'
let activeBg = 'bg-red'
let modalBg = 'bg-red'
let activeBorder = 'border-' + activeBg.slice(3)
let isRunning = false

pomoTimesWrapper.classList.add(activeBorder)
assignTime(activeTime)
changeSettings(pomodoroArrows, inputs[0], pomodoroInputValue, 'pomodoro')
changeSettings(shortBreakArrows, inputs[1], shortBreakInputValue, 'short-break')
changeSettings(longBreakArrows, inputs[2], longBreakInputValue, 'long-break')

modeButtonsWrapper.addEventListener('click', e => {
  const target = e.target
  if (target.id === 'pomodoro') activeTime = pomodoroInputValue * 60000
  if (target.id === 'short-break') activeTime = shortBreakInputValue * 60000
  if (target.id === 'long-break') activeTime = longBreakInputValue * 60000
  isRunning = false
  if (target.classList.contains('bg-transparent')) {
    modeBtns.forEach(btn => {
      if (btn !== target && btn.classList.contains(activeBg)) {
        btn.classList.remove(activeBg, 'text-black')
        btn.classList.add('bg-transparent')
      }
    })
    target.classList.remove('bg-transparent')
    target.classList.add(activeBg, 'text-black')
    assignTime(activeTime)
    toggler.textContent = 'START'
  }
})

toggler.addEventListener('click', e => {
  isRunning = !isRunning
  !isRunning || activeTime === 0
    ? (clearInterval(timerInterval),
      (e.target.textContent = !activeTime ? 'RESTART' : 'START'))
    : ((e.target.textContent = 'PAUSE'),
      (timerInterval = setInterval(() => {
        ;(!isRunning || activeTime === 0) &&
          (clearInterval(timerInterval),
          (e.target.textContent = !activeTime ? 'RESTART' : 'START'))
        isRunning && (activeTime -= 1000)
        assignTime(activeTime)
      }, 1000)))
})

settingsIcon.addEventListener('click', () => {
  isRunning = false
  modal.classList.remove('hidden')
  modal.classList.add('block')
})

fontsWrapper.addEventListener('click', e => {
  const target = e.target
  if (target.classList.contains('bg-gray')) {
    fontLabels.forEach(fontLabel => {
      if (fontLabel !== target && fontLabel.classList.contains('bg-black')) {
        fontLabel.classList.remove('bg-black', 'text-gray-light')
        fontLabel.classList.add('bg-gray')
      }
    })
    target.classList.remove('bg-gray')
    target.classList.add('bg-black', 'text-gray-light')
    modalFont = target.children[0].value
  }
})

colorsWrapper.addEventListener('click', e => {
  const target = e.target
  if (
    target.classList.contains(bgArray[0]) ||
    target.classList.contains(bgArray[1]) ||
    target.classList.contains(bgArray[2])
  ) {
    colorLabels.forEach(colorLabel => {
      colorLabel.textContent = ''
    })
    target.textContent = '✔'
  }
  modalBg = target.dataset.bgcolor
})

export function assignTime(time) {
  minutesTag.textContent = addZero(Math.floor((time / (60 * 1000)) % 60))
  secondsTag.textContent = addZero(Math.floor((time / 1000) % 60))
}

function addZero(num) {
  if (num >= 0 && num < 10) {
    return '0' + num
  }
  return num
}

function changeSettings(arrow, input, oldInputValue, mode) {
  isRunning = false
  let newValue = oldInputValue
  arrow.addEventListener('click', e => {
    e.target.classList.contains('upward-arrow')
      ? (newValue += 1)
      : (newValue -= 1)
    input.value = newValue.toString()
    toggler.textContent = 'START'
  })

  closeIcon.addEventListener('click', () => {
    input.value = oldInputValue.toString()
    modeBtns.forEach(btn => {
      if (btn.classList.contains(activeBg) && btn.id === mode) {
        activeTime = oldInputValue * 60000
        assignTime(oldInputValue * 60000)
      }
    })
    fontLabels.forEach(fontLabel => {
      if (
        fontLabel.classList.contains('bg-black') ||
        fontLabel.children[0].value !== activeFont
      ) {
        fontLabel.classList.remove('bg-black', 'text-gray-light')
        fontLabel.classList.add('bg-gray')
      } else if (
        fontLabel.children[0].value === activeFont &&
        fontLabel.classList.contains('bg-gray')
      ) {
        fontLabel.classList.remove('bg-gray')
        fontLabel.classList.add('bg-black', 'text-gray-light')
      }
    })
    colorLabels.forEach(colorLabel => {
      if (colorLabel.textContent === '✔') {
        colorLabel.textContent = ''
      }
      colorLabel.classList.contains(activeBg) && (colorLabel.textContent = '✔')
    })
    modal.classList.remove('block')
    modal.classList.add('hidden')
  })

  applyBtn.addEventListener('click', () => {
    if (mode === 'pomodoro') pomodoroInputValue = parseInt(input.value)
    if (mode === 'short-break') shortBreakInputValue = parseInt(input.value)
    if (mode === 'long-break') longBreakInputValue = parseInt(input.value)
    let oldActiveBgBeforeApply = activeBg
    oldInputValue = newValue
    activeFont = modalFont
    let oldBorder = 'border-' + oldActiveBgBeforeApply.slice(3)
    let newBorder = 'border-' + modalBg.slice(3)
    activeBg = modalBg

    modeBtns.forEach(btn => {
      if (btn.classList.contains(activeBg) && btn.id === mode) {
        activeTime = parseInt(input.value) * 60000
        assignTime(activeTime)
      } else if (
        btn.classList.contains(oldActiveBgBeforeApply) &&
        !btn.classList.contains(activeBg)
      ) {
        btn.classList.remove(oldActiveBgBeforeApply, 'text-black')
        btn.classList.add(activeBg, 'text-black')
      }
    })
    pomoTimesWrapper.classList.remove(oldBorder)
    pomoTimesWrapper.classList.add(newBorder)
    bodyFonts.forEach(font => {
      modalFont === font
        ? body.classList.add(font)
        : body.classList.remove(font)
    })
    applyBtn.classList.remove(oldActiveBgBeforeApply)
    applyBtn.classList.add(activeBg)
    modal.classList.remove('block')
    modal.classList.add('hidden')
  })
}

// //  import {
// //   modeButtonsWrapper,
// //   modeBtns,
// //   activeTime,
// //   pomodoroInputValue,
// //   shortBreakInputValue,
// //   longBreakInputValue,
// //   isRunning,
// //   toggler,
// //   activeTime,
// //   assignTime,
// //   activeBg,
// // } from './script'

// // export default function modeWrapper() {
// //   !isRunning
// //   modeButtonsWrapper.addEventListener('click', e => {
// //     const target = e.target
// //     if (target.id === 'pomodoro') activeTime = pomodoroInputValue * 60000
// //     if (target.id === 'short-break') activeTime = shortBreakInputValue * 60000
// //     if (target.id === 'long-break') activeTime = longBreakInputValue * 60000
// //     console.log('modeWrapper', activeTime, isRunning, pomodoroInputValue, shortBreakInputValue, longBreakInputValue)
// //     if (target.classList.contains('bg-transparent')) {
// //       modeBtns.forEach(btn => {
// //         if (btn !== target && btn.classList.contains(activeBg)) {
// //           btn.classList.remove(activeBg, 'text-black')
// //           btn.classList.add('bg-transparent')
// //         }
// //       })
// //       target.classList.remove('bg-transparent')
// //       target.classList.add(activeBg, 'text-black')
// //       assignTime(activeTime)
// //       toggler.textContent = 'START'
// //     }
// //   })
// // }
 
 
//  // Bularga tega ko'rmang 💣
// import 'core-js/stable'
// import 'regenerator-runtime/runtime'

// // Kod yozishni shu yerdan boshlaysiz
// const modeButtonsWrapper = document.querySelector('#mode-btns-wrapper')
// const modeBtns = modeButtonsWrapper.querySelectorAll('button')
// const minutesTag = document.querySelector('#minutes')
// const secondsTag = document.querySelector('#seconds')
// const toggler = document.querySelector('#toggle-btn')
// const pomoTimesWrapper = document.querySelector('#pomo-times-wrapper')
// const settingsIcon = document.querySelector('#settings-icon')
// const closeIcon = document.querySelector('#close-icon')
// const applyBtn = document.querySelector('#apply-btn')
// const modal = document.querySelector('#modal')
// const pomodoroArrows = document.querySelector('#pomodoro-arrows')
// const shortBreakArrows = document.querySelector('#short-break-arrows')
// const longBreakArrows = document.querySelector('#long-break-arrows')
// const inputs = document.querySelectorAll('input[type="number"]')
// const body = document.querySelector('body')
// const fontsWrapper = document.querySelector('#fonts-wrapper')
// const fontLabels = fontsWrapper.querySelectorAll('.font-label')
// const colorsWrapper = document.querySelector('#colors-wrapper')
// const colorLabels = colorsWrapper.querySelectorAll('label')
// const bodyFonts = ['font-kumbhSans', 'font-robotoSlab', 'font-spaceMono']
// const bgArray = ['bg-red', 'bg-teal', 'bg-purple']
// let changingTime = 1500000 //in milliseconds
// let isRunning = false
// let activeBg = 'bg-red'
// document.addEventListener('DOMContentLoaded', () => {
//   assignTime(changingTime)
//   changeTimeByModal(pomodoroArrows, inputs[0], 1500000, 'pomodoro')
//   changeTimeByModal(shortBreakArrows, inputs[1], 300000, 'short-break')
//   changeTimeByModal(longBreakArrows, inputs[2], 600000, 'long-break')

//   modeButtonsWrapper.addEventListener('click', e => {
//     const target = e.target
//     if (target.id === 'pomodoro') changingTime = inputs[0].value * 60000
//     if (target.id === 'short-break') changingTime = inputs[1].value * 60000
//     if (target.id === 'long-break') changingTime = inputs[2].value * 60000
//     isRunning = false
//     if (target.classList.contains('bg-transparent')) {
//       modeBtns.forEach(btn => {
//         if (btn !== target && btn.classList.contains(activeBg)) {
//           btn.classList.remove(activeBg, 'text-black')
//           btn.classList.add('bg-transparent')
//         }
//       })
//       target.classList.remove('bg-transparent')
//       target.classList.add(activeBg, 'text-black')
//     }
//     assignTime(changingTime)
//     toggler.textContent = 'START'
//   })

// 	toggler.addEventListener('click', e => {
//     isRunning = !isRunning
//     !isRunning || changingTime === 0
//       ? (clearInterval(timerInterval),
//         (e.target.textContent = !changingTime ? 'RESTART' : 'START'))
//       : ((e.target.textContent = 'PAUSE'),
//         (timerInterval = setInterval(() => {
//           ;(!isRunning || changingTime === 0) &&
//             (clearInterval(timerInterval),
//             (e.target.textContent = !changingTime ? 'RESTART' : 'START'))
//           isRunning && (changingTime -= 1000)
//           assignTime(changingTime)
//         }, 1000)))
//   })

//   // toggler.addEventListener('click', e => {
//   //   isRunning = !isRunning
//   //   isRunning
//   //     ? ((e.target.textContent = 'PAUSE'),
//   //       (timerInterval = setInterval(() => {
//   //         (!isRunning || changingTime === 0) &&
//   //           (clearInterval(timerInterval),
//   //           (e.target.textContent = !changingTime ? 'RESTART' : 'START'))
//   //         isRunning && (changingTime -= 1000)
//   //         assignTime(changingTime)
//   //       }, 1000)))
//   //     : (clearInterval(timerInterval),
//   //       (e.target.textContent = 'RESUME'))
//   // })


//   settingsIcon.addEventListener('click', () => {
//     modal.classList.contains('hidden') && displayToggler()
//   })
//   closeIcon.addEventListener('click', displayToggler)
//   applyBtn.addEventListener('click', displayToggler)

//   fontsWrapper.addEventListener('click', e => {
//     const target = e.target
//     if (target.classList.contains('bg-gray')) {
//       fontLabels.forEach(fontLabel => {
//         if (fontLabel !== target && fontLabel.classList.contains('bg-black')) {
//           fontLabel.classList.remove('bg-black', 'text-gray-light')
//           fontLabel.classList.add('bg-gray')
//         }
//       })
//       target.classList.remove('bg-gray')
//       target.classList.add('bg-black', 'text-gray-light')
//       bodyFonts.forEach(font => {
//         target.children[0].value === font
//           ? body.classList.add(font)
//           : body.classList.remove(font)
//       })
//     }
//   })

//   colorsWrapper.addEventListener('click', e => {
//     const target = e.target
//     let oldActiveBg = activeBg
//     const nonActiveBgs = bgArray.filter(bg => bg !== activeBg)
//     activeBg = target.dataset.bgcolor
//     let oldBorder = 'border-' + oldActiveBg.slice(3)
//     let newBorder = 'border-' + activeBg.slice(3)
//     if (
//       target.classList.contains(nonActiveBgs[0]) ||
//       target.classList.contains(nonActiveBgs[1])
//     ) {
//       colorLabels.forEach(
//         colorLabel =>
//           colorLabel !== target &&
//           colorLabel.classList.contains(oldActiveBg) &&
//           (colorLabel.textContent = ''),
//       )
//       target.textContent = '✔'
//       modeBtns.forEach(btn => {
//         if (
//           btn.classList.contains(oldActiveBg) &&
//           !target.classList.contains(oldActiveBg)
//         ) {
//           btn.classList.remove(oldActiveBg, 'text-black')
//           btn.classList.add(activeBg, 'text-black')
//         }
//       })
//       if (pomoTimesWrapper.classList.contains(oldBorder)) {
//         pomoTimesWrapper.classList.remove(oldBorder)
//         pomoTimesWrapper.classList.add(newBorder)
//       }
//       applyBtn.classList.remove(oldActiveBg)
//       applyBtn.classList.add(activeBg)
//     }
//   })

//   function assignTime(time) {
//     minutesTag.textContent = getZero(Math.floor((time / (60 * 1000)) % 60))
//     secondsTag.textContent = getZero(Math.floor((time / 1000) % 60))
//   }

//   function getZero(num) {
//     if (num >= 0 && num < 10) {
//       return '0' + num
//     }
//     return num
//   }

//   function changeTimeByModal(arrow, input, time, mode) {
//     arrow.addEventListener('click', e => {
//       e.target.classList.contains('upward-arrow')
//         ? (time += 60000)
//         : (time -= 60000)
//       input.value = time / 60000
//       changingTime = time
//       btns.forEach(btn => {
//         if (btn.classList.contains('bg-red') && btn.id === mode) {
//           assignTime(time)
//         }
//       })
//       toggler.textContent = 'START'
//     })
//   }

//   function displayToggler() {
//     if (modal.classList.contains('block')) {
//       modal.classList.toggle('block')
//     } else {
//       modal.classList.toggle('hidden')
//     }
//   }
// })

 
 
//  // PART 3
// 	// modal
// 	// element variables
// 	// const settingsIcon = document.querySelector("#settings-icon");
// 	// const closeIcon = document.querySelector("#close-icon");
// 	// const applyBtn = document.querySelector("#apply-btn");
// 	// const modal = document.querySelector("#modal");
// 	// const pomodoroArrows = document.querySelector("#pomodoro-arrows");
// 	// const shortBreakArrows = document.querySelector("#short-break-arrows");
// 	// const longBreakArrows = document.querySelector("#long-break-arrows");

// 	// //font variables
// 	// const body = document.querySelector("body");
// 	// const fontsWrapper = document.querySelector("#fonts-wrapper");
// 	// const bodyFonts = ["font-kumbhSans", "font-robotoSlab", "font-spaceMono"];
// 	// let activeFont = ["bg-black", "text-gray-light"];

// 	// // assignments
// 	// modal.classList.add("hidden");
// 	// closeIcon.innerHTML = "&times;";

// 	// // main events
// 	// settingsIcon.addEventListener("click", () => {
// 	// 	modal.classList.contains("hidden") && displayToggler(modal);
// 	// });
// 	// closeIcon.addEventListener("click", () => {
// 	// 	displayToggler(modal);
// 	// });

// 	// // time changing events
// 	// pomodoroArrows.children[0].addEventListener("click", () => {
// 	// 	pomodoroInputValue++;
// 	// 	pomodoroInput.value = pomodoroInputValue;
// 	// 	isPomodoro && assignTimer(pomodoroInputValue);
// 	// });
// 	// pomodoroArrows.children[1].addEventListener("click", () => {
// 	// 	pomodoroInputValue >= 1 && pomodoroInputValue--;
// 	// 	pomodoroInput.value = pomodoroInputValue;
// 	// 	isPomodoro && assignTimer(pomodoroInputValue);
// 	// });

// 	// shortBreakArrows.children[0].addEventListener("click", () => {
// 	// 	shortInputValue++;
// 	// 	shortInput.value = shortInputValue;
// 	// 	isShortBreak && assignTimer(shortInputValue);
// 	// });
// 	// shortBreakArrows.children[1].addEventListener("click", () => {
// 	// 	shortInputValue >= 1 && shortInputValue--;
// 	// 	shortInput.value = shortInputValue;
// 	// 	isShortBreak && assignTimer(shortInputValue);
// 	// });

// 	// longBreakArrows.children[0].addEventListener("click", () => {
// 	// 	longInputValue++;
// 	// 	longInput.value = longInputValue;
// 	// 	isLongBreak && assignTimer(longInputValue);
// 	// });
// 	// longBreakArrows.children[1].addEventListener("click", () => {
// 	// 	longInputValue >= 1 ? longInputValue-- : longInputValue;
// 	// 	longInput.value = longInputValue;
// 	// 	isLongBreak && assignTimer(longInputValue);
// 	// });

// 	// // font changing events
// 	// fontsWrapper.addEventListener("click", (e) => {
// 	// 	const target = e.target;
// 	// 	const fontLabels = fontsWrapper.querySelectorAll(".font-label");
// 	// 	const nonTargetLabels = [];
// 	// 	fontLabels.forEach((label) => {
// 	// 		if (label !== target) {
// 	// 			nonTargetLabels.push(label);
// 	// 		}
// 	// 	});
// 	// 	if (target.classList.contains("bg-gray")) {
// 	// 		target.classList.remove("bg-gray");
// 	// 		target.classList.add(activeFont[0], activeFont[1]);
// 	// 		nonTargetLabels.forEach((label) => {
// 	// 			label.classList.remove(activeFont[0], activeFont[1]);
// 	// 			label.classList.add("bg-gray");
// 	// 		});
// 	// 	} else if (target.classList.contains(activeFont[0], activeFont[1])) {
// 	// 		target.classList.remove(activeFont[0], activeFont[1]);
// 	// 		target.classList.add(activeFont[0], activeFont[1]);
// 	// 		nonTargetLabels.forEach((label) => {
// 	// 			label.classList.remove(activeFont[0], activeFont[1]);
// 	// 			label.classList.add("bg-gray");
// 	// 		});
// 	// 	}

// 	// 	if (target.children[0].value === bodyFonts[0]) {
// 	// 		body.classList.remove(bodyFonts[1], bodyFonts[2]);
// 	// 		body.classList.add(bodyFonts[0]);
// 	// 	} else if (target.children[0].value === bodyFonts[1]) {
// 	// 		body.classList.remove(bodyFonts[0], bodyFonts[2]);
// 	// 		body.classList.add(bodyFonts[1]);
// 	// 	} else {
// 	// 		body.classList.remove(bodyFonts[0], bodyFonts[1]);
// 	// 		body.classList.add(bodyFonts[2]);
// 	// 	}
// 	// });

// 	// applyBtn.addEventListener("click", () => {
// 	// 	console.log("updated");
// 	// 	displayToggler(modal);
// 	// });

// 	// // modal functions

// 	// function displayToggler(element) {
// 	// 	if (element.classList.contains("block")) {
// 	// 		element.classList.toggle("block");
// 	// 	} else {
// 	// 		element.classList.toggle("hidden");
// 	// 	}
// 	// }

// 	// function assignTimer(inputValue) {
// 	// 	minutesTag.innerHTML = getZero(Math.floor(inputValue));
// 	// 	secondsTag.innerHTML = getZero(
// 	// 		Math.floor(((inputValue * minute) / 1000) % timeModule)
// 	// 	);
// 	// }