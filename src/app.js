function reverseStr(str) {
  var listofChars = str.split("");
  var reverseListOfChars = listofChars.reverse();
  var reversedStr = reverseListOfChars.join("");
  return reversedStr;
  //return str.split("").reverse().join("")
}

function isPalindrome(str) {
  var reverse = reverseStr(str);
  if (str === reverse) {
    return true;
  } else {
    return false;
  }
  //return str === reverse;
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
  if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
    return true;
  } else {
    return false;
  }
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

// var date = {
//   day: 01,
//   month: 03,
//   year: 2000
// };

//console.log(getPreviousPalindromeDate(date));
//console.log(getPreviousDate(date));
//console.log(getNextPalindromeDate(date));
//console.log(getNextDate(date));
//console.log(isLeapYear(date.year));
//console.log(checkPalindromeForAllDateFormats(date));
//console.log(getDateInAllFormats(date));
//console.log(convertDateToString(date));
//console.log(isPalindrome("racecar"));
