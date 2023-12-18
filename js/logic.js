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

// Wochenende DONE, staatlicher Feiertag WIP, Fenstertag, Betriebsulruab ?

// const DEFAULT_DAY = {
//     date: "",
//     isWeekend: false,
//     isNationalHoliday: false,
//     isGapDay: false,
//     isCompanyHoliday: false
// };

const getDay = (date, obj = {}) => ({
    date: date.toDateString(),
    isWeekend: false, // default value
    isNationalHoliday: false, // default value
    isGapDay: false, // default value
    isCompanyHoliday: false, // default value
    ...obj,
});

function get365days(year) {
    const daysOfYear = []; // collection of each date of year

    const startDate = new Date(year, 0, 1); // jan 1st 
    const endDate = new Date(year, 11, 31); // decemter 31th

    while (startDate <= endDate) {
        const day = {
            ...getDay(startDate)
        };
        daysOfYear.push(day);
        startDate.setDate(startDate.getDate() + 1);
    }
    return daysOfYear;
}

function isWeekend(year) {
    const daysOfYear = get365days(year);

    for (let i = 0; i < daysOfYear.length; i++) {
        if (daysOfYear[i].includes("Sat") || daysOfYear[i].includes("Sun")) {
            // return true;
            daysOfYear[i].day = {
                isWeekend: true
            };
        }
        else {
            // return false;
            daysOfYear[i].day = {
                isWeekend: false
            }
        }
    }
}

// TODO switch this up with json (aut_nationalholidays)
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
    const daysOfYear = get365days(year);

    for (let i = 0; i < daysOfYear.length; i++) {
        for (let j = 0; j < nationalHolidays.length; j++) {
            if (daysOfYear[i].getDate() === nationalHolidays[j]) {
                // return true;
                daysOfYear[i].day = {
                    isNationalHoliday: true
                };
            }
            else {
                // return true;
                daysOfYear[i].day = {
                    isNationalHoliday: false
                };
            }
        }
    }
}

function isGapDay(year) {
    const daysOfYear = get365days(year);

    for (let i = 1; i < daysOfYear.length - 1; i++) {
        let previousDay = daysOfYear[i - 1];
        let nextDay = daysOfYear[i + 1];

        if ((previousDay === isWeekend || previousDay === isNationalHoliday)
            && (nextDay === isWeekend || nextDay === isNationalHoliday)) {
            daysOfYear[i].day = {
                isGapDay: true
            }
        }
        else {
            daysOfYear[i].day = {
                isGapDay: false
            }
        }
    }
}