// const DEFAULT_DAY = {
//     date: "",
//     isWeekend: false,
//     isNationalHoliday: false,
//     isGapDay: false,
//     isCompanyHoliday: false
// };

type Day = {
    date: string,
    isWeekend: boolean, // default value
    isNationalHoliday: boolean, // default value
    isGapDay: boolean, // default value
    isCompanyHoliday: boolean, // default value
    mustConsumeVacationHours: boolean, // default value
    hoursToConsume: number, // default value
    minVacationHoursNeeded: number,  // default value
}

let fullYear: Day[]; // collection of each date of year 

const getDay = (startDate: Date): Day => {
    return ({
        date: startDate.toDateString(),
        isWeekend: false, // default value
        isNationalHoliday: false, // default value
        isGapDay: false, // default value
        isCompanyHoliday: false, // default value
        mustConsumeVacationHours: false, // default value
        hoursToConsume: 0.00, // default value
        minVacationHoursNeeded: 0.00,  // default value
    });
}

// fetches data from json file and returns js-readable array
async function fetchJson(path: string) {
    const r = await fetch(`../${path}`)
        .then(response => response.json());

    r.forEach((element: Day) => {
        element.date = new Date(element.date).toDateString();
    });
    return r;
}

// iterates through given year and creates getDay object for each day of year to store it in fullYear array 
const getYear = (year: number) => {
    fullYear = [];

    const startDate = new Date(year, 0, 1); // jan 1st 
    const endDate = new Date(year, 11, 31); // decemter 31th

    while (startDate <= endDate) {
        const day = getDay(startDate);
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
        fullYear[i].isNationalHoliday = nationalHolidays.some((item: Day) => item.date === fullYear[i].date);
    }
}

// iterates through fullYear array and compares it to fetched json-file 'companyholidays' to check if day is a national holiday
async function isCompanyHoliday() {
    const companyHolidays = await fetchJson('json/companyholidays.json')
    for (let i = 0; i < fullYear.length; i++) {
        fullYear[i].isCompanyHoliday = companyHolidays.some((item: Day) => item.date === fullYear[i].date);
    }
}

// iterates through fullYear array and checks if day is gap day
// a gap day is a day inbetween to work-off-days
// e.g. Thursday national holiday - Friday workday - Saturday weekend (in this case, Friday is a gap day) 
async function isGapDay() {
    isWeekend();
    await isNationalHoliday();
    await isCompanyHoliday();

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

// goes through array which consists of full information of each day and lifts out the days 
// on which vacation needs to be taken
async function getConsumeVacationDates(inputGapDays: boolean, inputCompanyHolidays: boolean) {
    for (let i = 0; i < fullYear.length; i++) {
        if (!inputGapDays) {
            fullYear[i].mustConsumeVacationHours = fullYear[i].isCompanyHoliday;
        }
        if (!inputCompanyHolidays) {
            fullYear[i].mustConsumeVacationHours = fullYear[i].isGapDay;
        }
        else {
            fullYear[i].mustConsumeVacationHours = fullYear[i].isGapDay || fullYear[i].isCompanyHoliday;
        }
    }
}

// goes through consumeVacationDays array and sets vacation hours needed to be taken
function getHoursToConsume() {
    let sumVacationHours = 0;

    for (let i = 0; i < fullYear.length; i++) {
        if (fullYear[i].mustConsumeVacationHours) {
            if (fullYear[i].date.includes("Fri")) {
                fullYear[i].hoursToConsume = 5.5;
            }
            else {
                fullYear[i].hoursToConsume = 8.25;
            }
        }
        else {
            fullYear[i].hoursToConsume = 0.00;
        }

        sumVacationHours += fullYear[i].hoursToConsume;
    }
    return sumVacationHours;
}

function calcMinNeededVacationHours() {
    let minVacationHoursToTake = getHoursToConsume();
    const updatedHoursArray = [minVacationHoursToTake];

    for (let i = 1; i < fullYear.length; i++) {
        const previousDayConsumedHours = fullYear[i - 1].hoursToConsume;
        const updatedMinVacationHours = updatedHoursArray[i - 1] - previousDayConsumedHours;
        updatedHoursArray.push(updatedMinVacationHours);
    }
    // updating  original array with the min vacation hours
    fullYear[0].minVacationHoursNeeded = minVacationHoursToTake;
    for (let i = 1; i < fullYear.length; i++) {
        fullYear[i].minVacationHoursNeeded = updatedHoursArray[i];
    }
}

// function calls all of the functions above and sets all properties
async function getFullInfoYear(year: number, inputGapDays: boolean, inputCompanyHolidays: boolean) {
    getYear(year);
    await isGapDay();
    await getConsumeVacationDates(inputGapDays, inputCompanyHolidays);
    calcMinNeededVacationHours();
}

// gets minimum vacation hours of given day
async function getMinHoursOfGivenDay(date: Date, year: number, inputGapDays: boolean, inputCompanyHolidays: boolean) {
    await getFullInfoYear(year, inputGapDays, inputCompanyHolidays);

    for (let i = 0; i < fullYear.length; i++) {
        if (date.toDateString() === fullYear[i].date) {
            return fullYear[i].minVacationHoursNeeded;
        }
    }
}
