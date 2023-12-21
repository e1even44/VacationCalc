// const DEFAULT_DAY = {
//     date: "",
//     isWeekend: false,
//     isNationalHoliday: false,
//     isGapDay: false,
//     isCompanyHoliday: false
// };

let fullYear = []; // collection of each date of year 

const getDay = (date, obj = {}) => {
    return ({
        date: date.toDateString(),
        isWeekend: false, // default value
        isNationalHoliday: false, // default value
        isGapDay: false, // default value
        isCompanyHoliday: false, // default value
        mustConsumeVacationHours: false, // default value
        hoursToConsume: 0.00, // default value
        minVacationHoursNeeded: 176.00,  // default value
        ...obj,
    });
}

// fetches data from json file and returns js-readable array
async function fetchJson(path) {
    const r = await fetch(`../${path}`)
        .then(response => response.json());

    r.forEach(element => {
        element.date = new Date(element.date).toDateString();
    });
    return r;
}

// iterates through given year and creates getDay object for each day of year to store it in fullYear array 
const getYear = (year) => {
    fullYear = [];

    const startDate = new Date(year, 0, 1); // jan 1st 
    const endDate = new Date(year, 11, 31); // decemter 31th

    while (startDate <= endDate) {
        const day = {
            ...getDay(startDate)
        };
        fullYear.push(day);
        startDate.setDate(startDate.getDate() + 1);
    }
}

// iterates through fullYear array to check if day is a weekend
function isWeekend() {
    for (let i = 0; i < fullYear.length; i++) {
        fullYear[i].isWeekend = fullYear[i].date.includes("Sat") || fullYear[i].date.includes("Sun")
    }
}

// iterates through fullYear array and compares it to fetched json-file 'aut_nationalholidays' to check if day is a national holiday
async function isNationalHoliday() {
    const nationalHolidays = await fetchJson('json/aut_nationalholidays.json');
    for (let i = 0; i < fullYear.length; i++) {
        fullYear[i].isNationalHoliday = nationalHolidays.some((item) => item.date === fullYear[i].date);
    }
}

// iterates through fullYear array and checks if day is gap day
// a gap day is a day inbetween to work-off-days
// e.g. Thursday national holiday - Friday workday - Saturday weekend (in this case, Friday is a gap day) 
function isGapDay() {
    for (let i = 1; i < fullYear.length - 1; i++) {
        let currentDay = fullYear[i];
        let previousDay = fullYear[i - 1];
        let nextDay = fullYear[i + 1];

        currentDay.isGapDay =
            currentDay.isWeekend === false
            && currentDay.isNationalHoliday === false
            && currentDay.isCompanyHoliday === false
            && (previousDay.isWeekend || previousDay.isNationalHoliday || previousDay.isCompanyHoliday)
            && (nextDay.isWeekend || nextDay.isNationalHoliday || nextDay.isCompanyHoliday);
    }
}

// iterates through fullYear array and compares it to fetched json-file 'companyholidays' to check if day is a national holiday
async function isCompanyHoliday() {
    const companyHolidays = await fetchJson('json/companyholidays.json')
    for (let i = 0; i < fullYear.length; i++) {
        fullYear[i].isCompanyHoliday = companyHolidays.some((item) => item.date === fullYear[i].date);
    }
}

// function calls all of the functions above and sets all properties
async function getFullInfoYear(year) {
    getYear(year);
    isWeekend();
    await isNationalHoliday();
    isGapDay();
    await isCompanyHoliday();
}

// collection of days in which employees need to consume their vacation hours
let consumeVacationDays = [];

const getVacationDay = (date, obj = {}) => {
    return ({
        date: date,
        hoursToConsume: 0.0, // default value
        ...obj,
    });
}

// goes through array which consists of full information of each day and lifts out the days on which vacation needs to be taken
async function getConsumeVacationDates(year) {
    consumeVacationDays = [];
    await getFullInfoYear(year);
    let consume = false;
    let counter = 0;

    for (let i = 0; i < fullYear.length; i++) {
        consume = fullYear[i].isGapDay || fullYear[i].isCompanyHoliday;
        if (consume) {
            const vacationDay = {
                ...getVacationDay(fullYear[i].date)
            };
            consumeVacationDays.push(vacationDay);
            counter++;
        }
    }
}

// goes through consumeVacationDays array and sets vacation hours needed to be taken
function getHoursToConsume() {
    for (let i = 0; i < consumeVacationDays.length; i++) {
        if (consumeVacationDays[i].date.includes("Fri")) {
            consumeVacationDays[i].hoursToConsume = 5.5;
        }
        else {
            consumeVacationDays[i].hoursToConsume = 8.25;
        }
    }
}