// const DEFAULT_DAY = {
//     date: "",
//     isWeekend: false,
//     isNationalHoliday: false,
//     isGapDay: false,
//     isCompanyHoliday: false
// };

let fullyear = []; // collection of each date of year 

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

// fetches data from json file and returns js-readable array
async function fetchJson(path) {
    const r = await fetch(`../${path}`)
        .then(response => response.json());

    r.forEach(element => {
        element.date = new Date(element.date).toDateString();
    });
    return r;
}

const getYear = (year) => {
    fullyear = [];

    const startDate = new Date(year, 0, 1); // jan 1st 
    const endDate = new Date(year, 11, 31); // decemter 31th

    while (startDate <= endDate) {
        const day = {
            ...getDay(startDate)
        };
        fullyear.push(day);
        startDate.setDate(startDate.getDate() + 1);
    }
}

function isWeekend() {
    for (let i = 0; i < fullyear.length; i++) {
        fullyear[i].isWeekend = fullyear[i].date.includes("Sat") || fullyear[i].date.includes("Sun")
    }
}

async function isNationalHoliday() {
    const nationalHolidays = await fetchJson('json/aut_nationalholidays.json');
    for (let i = 0; i < fullyear.length; i++) {
        fullyear[i].isNationalHoliday = nationalHolidays.some((item) => item.date === fullyear[i].date);
    }
}

function isGapDay() {
    for (let i = 1; i < fullyear.length - 1; i++) {
        let currentDay = fullyear[i];
        let previousDay = fullyear[i - 1];
        let nextDay = fullyear[i + 1];

        currentDay.isGapDay =
            currentDay.isWeekend === false
            && currentDay.isNationalHoliday === false
            && currentDay.isCompanyHoliday === false
            && (previousDay.isWeekend || previousDay.isNationalHoliday || previousDay.isCompanyHoliday)
            && (nextDay.isWeekend || nextDay.isNationalHoliday || nextDay.isCompanyHoliday);
    }
}

async function isCompanyHoliday() {
    const companyHolidays = await fetchJson('json/companyholidays.json')
    for (let i = 0; i < fullyear.length; i++) {
        fullyear[i].isCompanyHoliday = companyHolidays.some((item) => item.date === fullyear[i].date);
    }
}

async function getFullInfoYear(year) {
    getYear(year);
    isWeekend();
    await isNationalHoliday();
    isGapDay();
    await isCompanyHoliday();
}

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

    for (let i = 0; i < fullyear.length; i++) {
        consume = fullyear[i].isGapDay || fullyear[i].isCompanyHoliday;
        if (consume) {
            const vacationDay = {
                ...getVacationDay(fullyear[i].date)
            };
            consumeVacationDays.push(vacationDay);
            counter++;
        }
    }
}

//176h vacation on Jan 1st of each year

function getHoursToConsume() {
    for (let i = 0; i < consumeVacationDays.length; i++) {
        if (consumeVacationDays[i].date.includes("Fri")) {
            consumeVacationDays[i].hoursToConsume = 5.5;
        }
        else {
            consumeVacationDays[i].hoursToConsume = 8.25;
        }
    }
    return consumeVacationDays;
}

const getneedaname = (date, obj = {}) => {
    return ({
        date: date,
        mustConsumeVacationHours: false, // default value
        hoursToConsume: 0.0, // default value
        minVacationHoursNeeded: 0.0,
        ...obj,
    });
}

function needaname() {
 
}