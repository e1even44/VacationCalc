const dateToday = document.getElementById('datepicker').valueAsDate = new Date();

const currentDate = new Date();
const currentYear = currentDate.getFullYear();

// calling function and update  HTML element
async function updateMinVacHours() {
    const minHours = await getMinHoursOfGivenDay(currentDate, currentYear);
    document.getElementById('minVacHours').innerText = `${minHours}`;
}

updateMinVacHours();