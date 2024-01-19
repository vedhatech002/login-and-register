import JustValidate from "just-validate";
import { v4 as uuidv4 } from "uuid";
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

  formdata.append("id", uuidv4());
  const data = Object.fromEntries(formdata);

  userDetailsArr.push(data);

  setLocalStorage(userDetailsArr);
  location.href = "./login.html";
});
