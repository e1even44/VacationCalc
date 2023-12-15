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

// Wochenende DONE, staatlicher Feiertag, Fenstertag,  Betriebsulruab ?

function loopThroughYear(year) {
    let daysOfYear = []; // collection of each date of year
    const start = new Date(year, 0, 1); // jan 1st 
    const end = new Date(year, 11, 31); // decemter 31th

    while (start <= end) {
        daysOfYear.push(start.toDateString());
        start.setDate(start.getDate() + 1);
    }
    return daysOfYear;
}

function isWeekend(year) {
    let isWeekendArr = [];
    let daysOfYear = loopThroughYear(year);

    for (let i = 0; i < daysOfYear.length; i++) {
        if (daysOfYear[i].includes("Sat") || daysOfYear[i].includes("Sun")) {
            isWeekendArr[i] = { day: daysOfYear[i], isWeekend: true }
        }
        else {
            isWeekendArr[i] = { day: daysOfYear[i], isWeekend: false }
        }
    }
    return isWeekendArr;
}

let nationalHolidays = [
    new Date(2024, 0, 1),
    new Date(2024, 0, 6),
    new Date(2024, 3, 1),
    new Date(2024, 4, 1),
    new Date(2024, 4, 9),
    new Date(2024, 4, 19),
    new Date(2024, 4, 20),
    new Date(2024, 4, 30),
    new Date(2024, 7, 15),
    new Date(2024, 9, 26),
    new Date(2024, 10, 1),
    new Date(2024, 11, 8),
    new Date(2024, 11, 25),
    new Date(2024, 11, 26)]
function isNationalHoliday(year) {
    isNationalHolidayArr = [];
    let daysOfYear = loopThroughYear(year); 

    for (let i = 0; i < daysOfYear.length; i++) {
        if (daysOfYear[i].includes("Sat") || daysOfYear[i].includes("Sun")) {
            isWeekendArr[i] = { day: daysOfYear[i], isWeekend: true }
        }
        else {
            isWeekendArr[i] = { day: daysOfYear[i], isWeekend: false }
        }
    }
    return isWeekendArr;
}