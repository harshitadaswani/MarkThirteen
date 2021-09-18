var dateInput = document.querySelector(".input");
var result = document.querySelector(".output");
var loadingGIF = document.querySelector("#timer");

document.addEventListener("submit", loadingOn);

function loadingOn(e) {
  e.preventDefault();
  hide();
  result.classList.add("hidden");
  loadingGIF.classList.remove("hidden");
  setTimeout(clickHandler, 3000);
}

function clickHandler() {
  loadingGIF.classList.add("hidden");
  result.classList.remove("hidden");
  hide();
  var bdayStr = dateInput.value;
  var listOfDate = bdayStr.split("-");
  var date = {
    day: Number(listOfDate[2]),
    month: Number(listOfDate[1]),
    year: Number(listOfDate[0])
  };
  var isPalindromeDate = checkPalindromeForAllDateFormats(date);
  if (isPalindromeDate) {
    show("YAYYY!!! It's a Palindrome Birthday :)");
  } else {
    var [counter1, nextDate] = getNextPalindromeDate(date);
    var [counter2, previousDate] = getPreviousPalindromeDate(date);
    if (counter1 < counter2) {
      show(
        `The next Palindrome Date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed it by ${counter1} days :( `
      );
    } else {
      show(
        `The previous Palindrome Date was ${previousDate.day}-${previousDate.month}-${previousDate.year}, you missed it by ${counter2} days :( `
      );
    }
  }
}

function reverseStr(str) {
  return str.split("").reverse().join("");
}

function isPalindrome(str) {
  var reverse = reverseStr(str);
  return str === reverse;
}

function convertDateToString(date) {
  var dateStr = { day: "", month: "", year: "" };
  if (date.day < 10) {
    dateStr.day = "0" + date.day;
  } else {
    dateStr.day = date.day.toString();
  }
  if (date.month < 10) {
    dateStr.month = "0" + date.month;
  } else {
    dateStr.month = date.month.toString();
  }
  dateStr.year = date.year.toString();
  return dateStr;
}

function getDateInAllFormats(date) {
  var dateStr = convertDateToString(date);
  var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
  var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
  var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
  var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
  var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
  var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;
  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindromeForAllDateFormats(date) {
  var listOfPalindromes = getDateInAllFormats(date);
  var flag = false;
  for (var i = 0; i < listOfPalindromes.length; i++) {
    if (isPalindrome(listOfPalindromes[i])) {
      flag = true;
      break;
    }
  }
  return flag;
}

function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

function getNextDate(date) {
  var day = date.day + 1;
  var month = date.month;
  var year = date.year;
  var monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (month === 2) {
    if (isLeapYear(year)) {
      if (day > 29) {
        day = 1;
        month++;
      }
    } else {
      if (day > 28) {
        day = 1;
        month++;
      }
    }
  } else {
    if (day > monthDays[month - 1]) {
      day = 1;
      month++;
    }
  }
  if (month > 12) {
    month = 1;
    year++;
  }
  return {
    day: day,
    month: month,
    year: year
  };
}

function getNextPalindromeDate(date) {
  var counter = 0;
  var nextDate = getNextDate(date);
  while (1) {
    counter++;
    var isPalidromeDate = checkPalindromeForAllDateFormats(nextDate);
    if (isPalidromeDate) {
      break;
    }
    nextDate = getNextDate(nextDate);
  }
  return [counter, nextDate];
}

function getPreviousDate(date) {
  var day = date.day - 1;
  var month = date.month;
  var year = date.year;
  var monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (day === 0) {
    month--;
    if (month === 0) {
      day = 31;
      month = 12;
      year--;
    } else if (month === 2) {
      if (isLeapYear(year)) {
        day = 29;
      } else {
        day = 28;
      }
    } else {
      day = monthDays[month - 1];
    }
  }
  return {
    day: day,
    month: month,
    year: year
  };
}

function getPreviousPalindromeDate(date) {
  var previousDate = getPreviousDate(date);
  var counter = 0;
  while (1) {
    counter++;
    var isPalidromeDate = checkPalindromeForAllDateFormats(previousDate);
    if (isPalidromeDate) {
      break;
    }
    previousDate = getPreviousDate(previousDate);
  }
  return [counter, previousDate];
}

function show(text) {
  result.style.display = "block";
  result.innerText = text;
}

function hide() {
  result.style.display = "none";
}
