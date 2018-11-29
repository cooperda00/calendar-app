import {getNewCalendar} from "./calendar"
import moment from "moment"

//DOM Nodes
const yearSelect = document.querySelector("#date-year-select")
const monthSelect = document.querySelector("#date-month-select")
const forwardButton = document.querySelector("#forward")
const backButton = document.querySelector("#back")

//Get current dates and set default value of dropdowns
const currentMonth = moment().month()
const currentYear = moment().format("YYYY")
const currentDay = moment().format("D")

yearSelect.value = currentYear
monthSelect.value = currentMonth

//Initial Population of Calendar based on today's date
getNewCalendar()

//Event Listeners for changing date:
yearSelect.addEventListener("change", getNewCalendar)

monthSelect.addEventListener("change", getNewCalendar)

//Move forward or back one month functions
const incrementMonth = () => {
    let month = parseInt(monthSelect.value, 10)
    let year = parseInt(yearSelect.value, 10)
    if (month === 11 && year === 2027) {
        console.log("No More Years")
    } else if (month <= 10) {
        month++
        monthSelect.value++
        getNewCalendar()
    } else if (month === 11) {
        month = 0
        monthSelect.value = 0
        year++
        yearSelect.value++
        getNewCalendar()
    }
}

const decrementMonth = () => {
    let month = parseInt(monthSelect.value, 10)
    let year = parseInt(yearSelect.value, 10)
    if (month === 0 && year === 2018) {
        console.log("No More Years")
    } else if (month >= 1) {
        month--
        monthSelect.value--
        getNewCalendar()
    } else if (month === 0) {
        month = 11
        monthSelect.value = 11
        year--
        yearSelect.value--
        getNewCalendar()
    }
}

//Change Styling of Todays Date Function
const findToday = () => {
    document.querySelectorAll("td").forEach( (cell) => {
        const selectedMonth = Number(monthSelect.value)
        const selectedYear = Number(yearSelect.value)
        const nowYear = Number(currentYear)
        if(cell.textContent === currentDay && selectedMonth === currentMonth && selectedYear === nowYear) {
            cell.classList.add("today")
            console.log(currentDay, cell)
        }
    })
}

//UI control events
forwardButton.addEventListener("click", () => {
    incrementMonth()
    findToday()
})

backButton.addEventListener("click", () => {
    decrementMonth()
    findToday()
})

window.addEventListener("keydown", (e) => {
    console.log(e.code)
    if(e.code === "ArrowLeft") {
        decrementMonth()
    } else if (e.code === "ArrowRight") {
        incrementMonth()   
    }
    findToday()
})

//Initial call of findToday to show on load
findToday()

