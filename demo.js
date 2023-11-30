// scripts

    const dateToday = document.querySelector('datetd').innerText = new Date().toLocaleDateString();

    function calcPreviousDay() {
        const previousDay = new Date();
        previousDay.setDate(previousDay.getDate() - 1);
        return previousDay.toLocaleDateString();
    }

    function calcNextDay() {
        const nextDay = new Date();

        nextDay.setDate(nextday.getDate() + 1);
        return nextday.toLocaleDateString();
    }