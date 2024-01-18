import JustValidate from "just-validate";
function validation(form) {
  form.addField("#firstname", [
    {
      rule: "required",
    },
    {
      rule: "minLength",
      value: 3,
    },
    {
      rule: "maxLength",
      value: 20,
    },
  ]);
  form.addField("#lastname", [
    {
      rule: "required",
    },

    {
      rule: "maxLength",
      value: 20,
    },
  ]);
  form.addField("#email", [
    {
      rule: "required",
    },
    {
      rule: "email",
    },
  ]);
  form.addField("#password", [
    {
      rule: "required",
    },
    {
      rule: "password",
    },
    {
      rule: "strongPassword",
    },
  ]);
  form.addField("#confirmpass", [
    {
      rule: "required",
    },
    {
      validator: (value, fields) => {
        if (fields["#password"] && fields["#password"].elem) {
          const repeatPasswordValue = fields["#confirmpass"].elem.value;

          return fields["#password"].elem.value === repeatPasswordValue;
        }

        return true;
      },
      errorMessage: "Passwords should be the same",
    },
  ]);
}

function getLocalStorage() {
  let userDetailsArr;
  if (localStorage.getItem("userDetails") === null) {
    userDetailsArr = [];
  } else {
    userDetailsArr = JSON.parse(localStorage.getItem("userDetails"));
  }
  return userDetailsArr;
}

function setLocalStorage(dataArr) {
  localStorage.setItem("userDetails", JSON.stringify(dataArr));
}
export { validation, getLocalStorage, setLocalStorage };
