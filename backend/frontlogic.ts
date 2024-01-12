// calling function and update  HTML element
//selectedDate & selectedYear CAN be null, replace ! with proper solution

const date = (document.getElementById('datepicker') as HTMLInputElement).valueAsDate = new Date();

let gapDaysChecked: boolean;
let companyHolidaysChecked: boolean;

function checkSettings() {
    gapDaysChecked = (document.getElementById('fenstertage') as HTMLInputElement).checked;
    companyHolidaysChecked = (document.getElementById('betriebsurlaub') as HTMLInputElement).checked;
}
checkSettings();

async function updateMinVacHours() {
    const selectedDate = (document.getElementById('datepicker') as HTMLInputElement).valueAsDate;
    const selectedYear = selectedDate!.getFullYear();
    const minHours = await getMinHoursOfGivenDay(selectedDate!, selectedYear, gapDaysChecked, companyHolidaysChecked);
    document.getElementById('minVacHours')!.innerText = `${minHours} Stunden`;
}
updateMinVacHours();

const datepickerSelectedElement = document.querySelector('#datepicker');
datepickerSelectedElement!.addEventListener("change", (_event) => {
    updateMinVacHours();
})

const checkBoxGapDay = document.querySelector('#fenstertage');
const checkboxCompanyHolidays = document.querySelector('#betriebsurlaub')

checkBoxGapDay!.addEventListener("change", (_event) => {
    checkSettings();
})
checkboxCompanyHolidays!.addEventListener("change", (_event) => {
    checkSettings();
})