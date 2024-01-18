import JustValidate from "just-validate";
import { validation, getLocalStorage, setLocalStorage } from "./util";

const userDetailsArr = getLocalStorage();

const registerFormEl = document.forms.register;
console.log(registerFormEl);

const validationForm = new JustValidate(registerFormEl, {
  validateBeforeSubmitting: true,
});
validation(validationForm);

validationForm.onSuccess((e) => {
  e.preventDefault();

  const formdata = new FormData(registerFormEl);

  const data = Object.fromEntries(formdata);

  userDetailsArr.push(data);

  setLocalStorage(userDetailsArr);
  location.href = "./login.html";
});
