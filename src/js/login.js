import JustValidate from "just-validate";

import { getLocalStorage, setLocalStorage } from "./util";

const userDetailsArr = getLocalStorage();

console.log(userDetailsArr);

const loginFormEl = document.forms.login;
console.log(loginFormEl);

const validation = new JustValidate(loginFormEl, {
  validateBeforeSubmitting: true,
});

validation
  .addField(loginFormEl.email, [
    {
      rule: "required",
    },
    {
      rule: "email",
    },
    {
      validator: (value) => {
        return userDetailsArr.find((el) => el.email === value) ? true : false;
      },
      errorMessage: "email is not registered ",
    },
  ])
  .addField(loginFormEl.password, [
    {
      rule: "required",
    },
    {
      validator: (value, fields) => {
        return userDetailsArr.find(
          (el) => el.email === loginFormEl.email.value && el.password === value
        )
          ? true
          : false;
        return true;
      },
      errorMessage: "incorrect password",
    },
  ]);

//generate time stamp
function getTimeStamp() {
  // Create a new Date object
  const currentDate = new Date();

  const timestamp = currentDate.getTime();
  console.log(timestamp);
  return timestamp;
}

async function getIpInfo() {
  const ipInfo = await fetch("https://api.ipify.org/");

  const responseData = await ipInfo.text();
  // console.log(responseData);

  return responseData;
}
getIpInfo();

validation.onSuccess(async (e) => {
  e.preventDefault();

  const userEmail = loginFormEl.email.value;

  await userDetailsArr.find((el) => {
    getIpInfo().then((ip) => {
      if (el.email === userEmail) {
        if (el.logindetails && el.logindetails.length > 0) {
          el.logindetails.push({ ip, timestamp: getTimeStamp() });
        } else {
          el.logindetails = [];
          el.logindetails.push({ ip, timestamp: getTimeStamp() });
        }
      }
      setLocalStorage(userDetailsArr);
      sessionStorage.setItem("userid", el.id);
      location.href = "./index.html";
    });
  });
  // console.log(userDetailsArr);

  // location.href = "./index.html";
});
