// scripts

const dateToday = document.querySelector('datetd').innerText = new Date().toLocaleDateString();

function calcPreviousDay() {
    const previousDay = new Date();
    previousDay.setDate(previousDay.getDate() - 1);
    return previousDay.toLocaleDateString();
}

function calcNextDay() {
    const nextDay = new Date();
    nextDay.setDate(nextDay.getDate() + 1);
    return nextDay.toLocaleDateString();
}

function updateDate() {
    const resultElement = document.querySelector('datetd');
    resultElement.textContent = calcPreviousDay();
}

function updateDateNxt() {
    const resultElement = document.querySelector('datetd');
    resultElement.textContent = calcNextDay();
}