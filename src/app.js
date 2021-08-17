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
var date = {
  day: 1,
  month: 5,
  year: 2001
};
console.log(checkPalindromeForAllDateFormats(date));
// console.log(getDateInAllFormats(date));
//console.log(convertDateToString(date));
//console.log(isPalindrome("racecar"));
