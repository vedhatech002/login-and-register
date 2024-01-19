const userId = sessionStorage.getItem("userid");

import { getLocalStorage } from "./util";
console.log(userId);

const tablebodyEl = document.querySelector("#tbody");
const logoutEl = document.querySelector("#logout");

if (userId) {
  let userDetailsArr = getLocalStorage();

  const userObj = userDetailsArr.find((el) => el.id === userId);
  console.log(userObj);
  const logindatas = userObj.logindetails;
  createLoginDataUi(logindatas);
} else {
  location.href = "./login.html";
}

function createLoginDataUi(data) {
  const tableRowsEl = data
    .map((el) => {
      const dateAndTimeObj = getDateAndTime(el.timestamp);
      let templateLiteral = `
<tr class="border-b border-blue-gray-200">
<td class="py-3 px-4">${el.ip}</td>
<td class="py-3 px-4">${dateAndTimeObj.date}</td>
<td class="py-3 px-4">${dateAndTimeObj.time}</td>
<td class="py-3 px-4">
<a  class="font-medium text-red-600 hover:text-red-800"
onclick="report()" >Report</a
>
</td>
</tr>
`;
      return templateLiteral;
    })
    .join("");

  tablebodyEl.innerHTML = tableRowsEl;
}

function getDateAndTime(timestamp) {
  // Create a new Date object using the timestamp
  const date = new Date(timestamp);

  // Extract individual components of the date and time
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // Note: Months are zero-based, so add 1
  const day = date.getDate();

  let hours = date.getHours(),
    minutes = date.getMinutes(),
    seconds = date.getSeconds(),
    ampm = "AM";

  if (hours > 12) {
    hours = hours - 12;
    ampm = "PM";
  }
  // Format the date and time as a string

  const formatDate = pad(day) + "-" + pad(month) + "-" + year;
  const formatTime =
    pad(hours) + ":" + pad(minutes) + ":" + pad(seconds) + " " + ampm;

  console.log(formatDate, formatTime);

  //  function to pad single-digit numbers with adding zeros before
  function pad(number) {
    return number < 10 ? "0" + number : number;
  }

  return { date: formatDate, time: formatTime };
}

logoutEl.addEventListener("click", () => {
  sessionStorage.clear();
  location.reload();
});
