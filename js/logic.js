// scripts

// document.querySelector('datetd').innerText = new Date().toLocaleDateString();

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

const getDay = (date, obj = {}) => {
    return ({
        date: date.toDateString(),
        isWeekend: false, // default value
        isNationalHoliday: false, // default value
        isGapDay: false, // default value
        isCompanyHoliday: false, // default value
        ...obj,
    });
}

let daysOfYear = []; // collection of each date of year

//works fine
const get365days = (year) => {
    daysOfYear = [];

    const startDate = new Date(year, 0, 1); // jan 1st 
    const endDate = new Date(year, 11, 31); // decemter 31th

    while (startDate <= endDate) {
        const day = {
            ...getDay(startDate)
        };
        daysOfYear.push(day);
        startDate.setDate(startDate.getDate() + 1);
    }
}

//works fine
function isWeekend() {
    for (let i = 0; i < daysOfYear.length; i++) {
        daysOfYear[i].isWeekend = daysOfYear[i].date.includes("Sat") || daysOfYear[i].date.includes("Sun")
    }
}

// fetches array of national holiday dates from json file and returns an to-local-date-array 
async function fetchJson(path) {
    const r = await fetch(`../${path}`)
        .then(response => response.json());

    r.forEach(element => {
        element.date = new Date(element.date).toDateString();
    });

    return r;
}

//works fine
async function isNationalHoliday() {
    const nationalHolidays = await fetchJson('json/aut_nationalholidays.json');

    for (let i = 0; i < daysOfYear.length; i++) {
        daysOfYear[i].isNationalHoliday = nationalHolidays.some((item) => item.date === daysOfYear[i].date);
    }
}

//works fine
function isGapDay() {
    for (let i = 1; i < daysOfYear.length - 1; i++) {
        let previousDay = daysOfYear[i - 1];
        let nextDay = daysOfYear[i + 1];

        daysOfYear[i].isGapDay = (previousDay.isWeekend || previousDay.isNationalHoliday)
            && (nextDay.isWeekend || nextDay.isNationalHoliday);
    }
}

// TODO company holidays
async function isCompanyHoliday() {
    const companyHolidays = await fetchJson('json/companyholidays.json')

    for (let i = 0; i < daysOfYear.length; i++) {
        daysOfYear[i].isCompanyHoliday = companyHolidays.some((item) => item.date === daysOfYear[i].date);
    }
}

// async function getFullInfoYear(year) {
//     get365days(year);
//     isWeekend();
//     isNationalHoliday();
//     console.log(isGapDay());
//     isCompanyHoliday();
// }