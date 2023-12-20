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

//works fine
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

//works fine
function isWeekend() {
    for (let i = 0; i < fullyear.length; i++) {
        fullyear[i].isWeekend = fullyear[i].date.includes("Sat") || fullyear[i].date.includes("Sun")
    }
}

//works fine
async function isNationalHoliday() {
    const nationalHolidays = await fetchJson('json/aut_nationalholidays.json');
    for (let i = 0; i < fullyear.length; i++) {
        fullyear[i].isNationalHoliday = nationalHolidays.some((item) => item.date === fullyear[i].date);
    }
}

//works fine
function isGapDay() {
    for (let i = 1; i < fullyear.length - 1; i++) {
        let currentDay = fullyear[i];
        let previousDay = fullyear[i - 1];
        let nextDay = fullyear[i + 1];

        fullyear[i].isGapDay =
            (currentDay.isWeekend === false)
            && (previousDay.isWeekend || previousDay.isNationalHoliday)
            && (nextDay.isWeekend || nextDay.isNationalHoliday);
    }
}

// works fine
async function isCompanyHoliday() {
    const companyHolidays = await fetchJson('json/companyholidays.json')
    for (let i = 0; i < fullyear.length; i++) {
        fullyear[i].isCompanyHoliday = companyHolidays.some((item) => item.date === fullyear[i].date);
    }
}

// TODO fix this!!!!!!!
async function getFullInfoYear(year) {
    getYear(year);
    isWeekend();
    await isNationalHoliday();
    isGapDay();
    await isCompanyHoliday();
}