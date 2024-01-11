const date = document.getElementById('datepicker').valueAsDate = new Date();

// calling function and update  HTML element
async function updateMinVacHours() {
    const selectedDate = document.getElementById('datepicker').valueAsDate;
    const selectedYear = selectedDate.getFullYear();
    const minHours = await getMinHoursOfGivenDay(selectedDate, selectedYear);
    document.getElementById('minVacHours').innerText = `${minHours} Stunden`;
}
updateMinVacHours();

const selectedElement = document.querySelector('#datepicker');
selectedElement.addEventListener("change", (_event) => {
    updateMinVacHours();
})

// TODO fix
async function getPreviousDay() {
    // const previousDay = ;
    selectedDate = previousDay;
    document.getElementById('datepicker').valueAsDate = selectedDate;
    updateMinVacHours();
}