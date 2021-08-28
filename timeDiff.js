'use strict';

function calculateTimeDiff() {
  let dateInput1 = document.getElementById('firstDate').value;
  let dateInput2 = document.getElementById('secondDate').value;
  
  if (dateInput1 == "" || dateInput2 == "") {
    alert("Dates you entered are invalid");
    return;
  }

  let firstDate = new Date(dateInput1);
  let secondDate = new Date(dateInput2);

  if (firstDate > secondDate) [firstDate, secondDate] = [secondDate, firstDate];

  let timeDiff = secondDate - firstDate;
  let timeDiffParts = {
    years: getYearsDiff(firstDate, secondDate),
    months: getMonthsDiff(firstDate, secondDate),
    days: getDaysDiff(firstDate, secondDate),
    hours: Math.floor(timeDiff / (1000 * 60 * 60)),
    minutes: Math.floor(timeDiff / (1000 * 60)),
    seconds: Math.floor(timeDiff / 1000),
    millisec: timeDiff,
  };

  showTimeDiff(timeDiffParts);
  calExactTimeDiff();
}

function showTimeDiff(timeDiffObj) {
  for (let key in timeDiffObj) {
    let value = timeDiffObj[key];
    let elemId = `${key}Diff`;
    insert2HTMLElem(value, elemId, true);
  }
}

function calExactTimeDiff() {
  let firstDate = new Date(document.getElementById('firstDate').value);
  let secondDate = new Date(document.getElementById('secondDate').value);
  if (firstDate > secondDate) [firstDate, secondDate] = [secondDate, firstDate];

  let monthDiff = 0;
  let isDayAhead = secondDate.getDate() >= firstDate.getDate();

  if (secondDate.getMonth() >= firstDate.getMonth()) {
    let diff = secondDate.getMonth() - firstDate.getMonth();
    monthDiff += isDayAhead ? diff : diff - 1;
  } else {
    monthDiff += isDayAhead
      ? 12 - (firstDate.getMonth() - secondDate.getMonth())
      : 12 - (firstDate.getMonth() - secondDate.getMonth()) - 1;
  }

  let dayDiff = 0;

  if (isDayAhead) {
    dayDiff = secondDate.getDate() - firstDate.getDate();
  } else {
    let b4EndDate = new Date(
      secondDate.getFullYear(),
      secondDate.getMonth() - 1,
      firstDate.getDate()
    );
    dayDiff = getDaysDiff(b4EndDate, secondDate);
  }

  if (firstDate.getMonth() == secondDate.getMonth() && !isDayAhead)
    monthDiff = 11;

  let exactTimeDiffParts = {
    yrs: getYearsDiff(firstDate, secondDate),
    mths: monthDiff,
    dys: dayDiff,
  };

  showExactTimeDiff(exactTimeDiffParts);
}

function showExactTimeDiff(exactTimeDiffObj) {
  for (let key in exactTimeDiffObj) {
    let value = exactTimeDiffObj[key];
    let elemId = key;
    insert2HTMLElem(value, elemId, true);
  }
}

function insert2HTMLElem(content = '', elemId = '', overwrite = false) {
  if (overwrite) document.getElementById(elemId).innerHTML = content;
  else document.getElementById(elemId).innerHTML += content;
}

function getDaysDiff(startDate = new Date(), endDate = new Date()) {
  if (startDate > endDate) [startDate, endDate] = [endDate, startDate];

  let timeDiff = endDate - startDate;
  let timeDiffInDays = Math.floor(timeDiff / (1000 * 3600 * 24));

  return timeDiffInDays;
}

function getYearsDiff(startDate = new Date(), endDate = new Date()) {
  if (startDate > endDate) [startDate, endDate] = [endDate, startDate];

  let year = 0;
  let yearB4End = new Date(
    endDate.getFullYear() - 1,
    endDate.getMonth(),
    endDate.getDate()
  );
  year =
    yearB4End > startDate
      ? yearB4End.getFullYear() - startDate.getFullYear()
      : 0;
  let yearsAfterStart = new Date(
    startDate.getFullYear() + year + 1,
    startDate.getMonth(),
    startDate.getDate()
  );
  if (endDate >= yearsAfterStart) year++;
  return year;
}

function getMonthsDiff(startDate = new Date(), endDate = new Date()) {
  if (startDate > endDate) [startDate, endDate] = [endDate, startDate];
  let monthsOfFullYears = getYearsDiff(startDate, endDate) * 12;
  let months = monthsOfFullYears;
  // the variable below is not necessary, but I kept it for understanding
  // we can use "startDate" instead of it
  let yearsAfterStart = new Date(
    startDate.getFullYear() + getYearsDiff(startDate, endDate),
    startDate.getMonth(),
    startDate.getDate()
  );
  let isDayAhead = endDate.getDate() >= yearsAfterStart.getDate();

  if (startDate.getMonth() == endDate.getMonth() && !isDayAhead) {
    months = 11;
    return months;
  }

  if (endDate.getMonth() >= yearsAfterStart.getMonth()) {
    let diff = endDate.getMonth() - yearsAfterStart.getMonth();
    months += isDayAhead ? diff : diff - 1;
  } else {
    months += isDayAhead
      ? 12 - (startDate.getMonth() - endDate.getMonth())
      : 12 - (startDate.getMonth() - endDate.getMonth()) - 1;
  }

  return months;
}

function reset() {
  let elemsIdToReset = [
    'yearsDiff', 'monthsDiff', 'daysDiff',
    'hoursDiff', 'minutesDiff', 'secondsDiff',
    'millisecDiff', 'yrs', 'mths', 'dys',
  ];
  for (let id of elemsIdToReset) {
    insert2HTMLElem('-', id, true);
  }
  document.getElementById("firstDate").value = "";
  document.getElementById("secondDate").value = "";
}
