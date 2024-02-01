import "./style.css";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const DAYS = ["S", "M", "T", "W", "T", "F", "S"];

const today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

const gridDiv = document.getElementById("grid");

// Cursor
const cur = document.createElement("div");
cur.setAttribute("id", "cur");
cur.classList.add("cur");

renderCalendar(currentYear, currentMonth);

function createElement(type, className, textContent) {
  const element = document.createElement(type);
  element.className = className;
  if (textContent) element.textContent = textContent;
  return element;
}

// Render Dates with function
function renderCalendar(year, month) {
  let firstDay = new Date(year, month).getDay();
  let daysInMonth = 32 - new Date(year, month, 32).getDate();
  let lastMonthDays = lastMonthDay(firstDay) + 1;
  let nextMonthDays = 1;

  gridDiv.innerHTML = "";

  const backBtn = createElement("div", "backBtn", "<");
  backBtn.addEventListener("click", previous);
  gridDiv.append(backBtn);

  const monthHeader = createElement("div", "monthTitle", MONTHS[currentMonth]);
  monthHeader.addEventListener("click", showMonths);
  gridDiv.append(monthHeader);

  const yearHeader = createElement("div", "yearTitle", `${currentYear}`);
  yearHeader.addEventListener("click", showYears);
  gridDiv.append(yearHeader);

  const nextBtn = createElement("div", "nextBtn", ">");
  nextBtn.addEventListener("click", next);
  gridDiv.append(nextBtn);

  // set header
  setHeader(year, month);

  // Day Div
  for (let i = 0; i < 7; i++) {
    let dayDiv = document.createElement("div");
    dayDiv.setAttribute("class", "day");
    dayDiv.textContent = DAYS[i];
    gridDiv.append(dayDiv);
  }

  let date = 1;

  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < firstDay) {
        let dateDiv = document.createElement("div");
        dateDiv.setAttribute("class", "date");
        dateDiv.classList.add("previousDate");
        dateDiv.textContent = lastMonthDays++;
        gridDiv.append(dateDiv);
      } else if (date > daysInMonth) {
        if (date < 42) {
          let dateDiv = document.createElement("div");
          dateDiv.setAttribute("class", "date");
          dateDiv.classList.add("previousDate");
          dateDiv.textContent = nextMonthDays++;
          gridDiv.append(dateDiv);
        }
      } else {
        let dateDiv = document.createElement("div");
        dateDiv.setAttribute("class", "date");
        dateDiv.textContent = date;
        if (
          date === today.getDate() &&
          year === today.getFullYear() &&
          month === today.getMonth()
        ) {
          dateDiv.classList.add("todayDate");
        }
        gridDiv.append(dateDiv);
        date++;
      }
    }
  }

  // Cursor
  gridDiv.append(cur);
  const gridDivRect = gridDiv.getBoundingClientRect();
  gridDiv.addEventListener("mousemove", (ev) => {
    if (ev.currentTarget === gridDiv) {
      cur.style.opacity = "1";
      let x = ev.clientX - vmin(10) - gridDivRect.left;
      let y = ev.clientY - vmin(10) - gridDivRect.top;
      cur.style.left = x + "px";
      cur.style.top = y + "px";
    }
  });
  
  gridDiv.addEventListener("touchmove", (ev) => {
    if (ev.currentTarget === gridDiv) {
      cur.style.opacity = "1";
      let x = ev.touches[0].clientX - vmin(10) - gridDivRect.left;
      let y = ev.touches[0].clientY - vmin(10) - gridDivRect.top;
      cur.style.left = x + "px";
      cur.style.top = y + "px";
    }
  });
  
  gridDiv.addEventListener("mouseleave", () => {
    cur.style.opacity = "0";
  });
  
  gridDiv.addEventListener("touchend", () => {
    cur.style.opacity = "0";
  });
}

function next() {
  currentYear = currentMonth === 11 ? currentYear + 1 : currentYear;
  currentMonth = (currentMonth + 1) % 12;
  renderCalendar(currentYear, currentMonth);
}

function previous() {
  currentYear = currentMonth === 0 ? currentYear - 1 : currentYear;
  currentMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  renderCalendar(currentYear, currentMonth);
}

// Set Height and Width
function vh(v) {
  var h = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0
  );
  return (v * h) / 100;
}

function vw(v) {
  var w = Math.max(
    document.documentElement.clientWidth,
    window.innerWidth || 0
  );
  return (v * w) / 100;
}

function vmin(v) {
  return Math.min(vh(v), vw(v));
}

function vmax(v) {
  return Math.max(vh(v), vw(v));
}

// set header
function setHeader(year, month) {
  const yearHeader = document.querySelector(".yearTitle");
  yearHeader.textContent = `${year}`;
  const monthHeader = document.querySelector(".monthTitle");
  monthHeader.textContent = `${MONTHS[month]}`;
}

// Last month Date
function lastMonthDay(firstDayCurrent) {
  const previousYear = currentMonth === 0 ? currentYear - 1 : currentYear;
  const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const daysInMonth = 32 - new Date(previousYear, previousMonth, 32).getDate();
  return daysInMonth - firstDayCurrent;
}

// Jump to month
function jumpMonth(month) {
  //   currentYear = parseInt(selectYear.value);
  currentMonth = parseInt(month);
  renderCalendar(currentYear, currentMonth);
}

// Jump to year
function jumpYear(year) {
  currentYear = parseInt(year);
  //   currentMonth = parseInt(month);
  renderCalendar(currentYear, currentMonth);
}

// Show months
function showMonths() {
  const allDays = gridDiv.querySelectorAll(".day");
  allDays.forEach((ele) => {
    ele.classList.add("remove");
  });
  const allDate = gridDiv.querySelectorAll(".date");
  allDate.forEach((ele) => {
    ele.classList.add("remove");
  });

  const currentMonthDivS = document.querySelectorAll(".monthDiv");
  if (currentMonthDivS.length > 0) {
    currentMonthDivS.forEach((ele) => {
      ele.remove();
    });
  }

  const monthDiv = document.createElement("div");
  monthDiv.classList.add("monthDiv");
  for (let i = 0; i < MONTHS.length; i++) {
    const div = document.createElement("div");
    div.classList.add("mDiv");
    div.textContent = MONTHS[i];
    div.style.animation = "months 300ms";
    div.addEventListener("click", (ev) => {
      console.log(i);
      jumpMonth(i);
    });
    monthDiv.append(div);
  }
  gridDiv.append(monthDiv);
}

// Show years
function showYears() {
  const allDays = gridDiv.querySelectorAll(".day");
  allDays.forEach((ele) => {
    ele.classList.add("remove");
  });
  const allDate = gridDiv.querySelectorAll(".date");
  allDate.forEach((ele) => {
    ele.classList.add("remove");
  });

  const currentYearDivS = document.querySelectorAll(".yearDiv");
  if (currentYearDivS.length > 0) {
    currentYearDivS.forEach((ele) => {
      ele.remove();
    });
  }

  let previousRangeYear = currentYear - 20;
  let nextRangeYear = currentYear + 10;
  let selectedRangeYear = {
    start: currentYear - 10,
    end: currentYear,
  };

  const yearDiv = document.createElement("div");
  yearDiv.classList.add("yearDiv");

  drawRangeYears(selectedRangeYear, previousRangeYear, nextRangeYear, yearDiv);
}

// Draw Range Years
function drawRangeYears(
  selectedRangeYear,
  previousRangeYear,
  nextRangeYear,
  yearDiv
) {
  console.log(selectedRangeYear, previousRangeYear, nextRangeYear, yearDiv);
  // empty year div
  yearDiv.innerHTML = "";

  const previousYears = document.createElement("div");
  previousYears.setAttribute("id", "previousYears");
  previousYears.textContent = `${previousRangeYear}-${selectedRangeYear.start}`;
  previousYears.classList.add("ysDiv");
  previousYears.addEventListener("click", (ev) => {
    let target = ev.target;
    const nYear = yearDiv.querySelector("#nextYears");
    // Remove previous years
    selectedRangeYear.start = selectedRangeYear.start - 10;
    selectedRangeYear.end = selectedRangeYear.end - 10;
    previousRangeYear = selectedRangeYear.start - 10;
    nextRangeYear = selectedRangeYear.end + 10;

    // Refresh Label
    target.textContent = `${previousRangeYear}-${selectedRangeYear.start}`;
    nYear.textContent = `${selectedRangeYear.end}-${nextRangeYear}`;

    AddYearsDiv(selectedRangeYear, yearDiv, false);
  });
  yearDiv.append(previousYears);

  const nextYears = document.createElement("div");
  nextYears.setAttribute("id", "nextYears");
  nextYears.textContent = `${selectedRangeYear.end}-${nextRangeYear}`;
  nextYears.classList.add("ysDiv");
  nextYears.addEventListener("click", (ev) => {
    let target = ev.target;
    const prevYear = yearDiv.querySelector("#previousYears");

    // Remove previous years
    selectedRangeYear.start = selectedRangeYear.start + 10;
    selectedRangeYear.end = selectedRangeYear.end + 10;
    previousRangeYear = selectedRangeYear.start - 10;
    nextRangeYear = selectedRangeYear.end + 10;

    // Refresh label
    prevYear.textContent = `${previousRangeYear}-${selectedRangeYear.start}`;
    target.textContent = `${selectedRangeYear.end}-${nextRangeYear}`;

    AddYearsDiv(selectedRangeYear, yearDiv, true);
  });
  yearDiv.append(nextYears);

  AddYearsDiv(selectedRangeYear, yearDiv);

  gridDiv.append(yearDiv);
}

// Add Years Div
function AddYearsDiv(selectedRangeYear, yearDiv, flag) {
  const existMDiv = yearDiv.querySelectorAll(".mDiv");
  existMDiv.forEach((ele) => {
    ele.remove();
  });
  for (let i = selectedRangeYear.start; i < selectedRangeYear.end; i++) {
    const div = document.createElement("div");
    div.classList.add("mDiv");
    div.textContent = i;
    if (flag) {
      div.style.animation = "RtoL normal 400ms";
    } else {
      div.style.animation = "LtoR normal 400ms";
    }
    div.addEventListener("click", (ev) => {
      console.log(i);
      jumpYear(i);
    });
    yearDiv.append(div);
  }
}
