// console.log("this field is required");


const form = document.getElementById("form");
const firstName = document.getElementById("first-name");
const lastName = document.getElementById("last-name");
const email = document.getElementById("email");
const radioGeneral = document.getElementById("radio-general");
const radioSupport = document.getElementById("radio-support");
const textArea = document.getElementById("message");
const consentCheckbox = document.getElementById("consent-message");

const querySmall = document.querySelector(".query small")


form.addEventListener("submit",(e) =>{
  e.preventDefault();

  handlingInputs()


  // if form is valid
  if(isFormValid()){
    showMessageSent();
    reset()
  }

})

function reset(){
  firstName.classList.remove("success");
  lastName.classList.remove("success");
  textArea.classList.remove("success");
  email.classList.remove("success");
  // radio buttons
  radioGeneral.classList.remove("error","success");
  radioSupport.classList.remove("error","success");

  form.reset()
}

function isFormValid(){
  return document.querySelectorAll(".error").length === 0 && consentCheckbox.checked
}
function showMessageSent(){
  const successMessage = document.getElementById("success-message");
  successMessage.style.display = "block"

  // time-interval
  setInterval(() => {
    successMessage.style.display = "none"
  }, 3000);
}
function handlingInputs() {
  validateInput(firstName, "This field is required");
  validateInput(lastName, "This field is required");
  validateInput(textArea, "This field is required");
  validateEmail(email);
  validateRadioButtons("Please select a query type" );
  consentMessage();
}
// names

function validateInput(input, message) {
  input.classList.remove("error", "success");

  if (input.value.trim() === "") {
    setErrorFor(input, message);
  } else {
    setSuccess(input);
  }
}
// email
function validateEmail(input) {
  input.classList.remove("error", "success");

  if (input.value.trim() === "") {
    setErrorFor(input, "This field is required");
  } else if (!isEmail(input.value)) {
    setErrorFor(input, "Please enter a valid email");
  } else {
    setSuccess(input);
  }
}

// radioButtons
function validateRadioButtons(message) {

  // radioGeneral.classList.remove("error", "success");
  // radioSupport.classList.remove("error", "success");

  if (!radioGeneral.checked && !radioSupport.checked) {
    buttonError([radioGeneral, radioSupport], message);
  } else {
    buttonSuccess([radioGeneral, radioSupport]);
  }
}

// text Area

function validateInput(input, message) {
  input.classList.remove("error", "success");

  if (input.value.trim() === "") {
    setErrorFor(input, message);
  } else {
    setSuccess(input);
  }
}

// consentMessage
function consentMessage() {
  const small = document.getElementById("consent-instruction")
  if(!consentCheckbox.checked){
    small.innerText = 'to submit this form, please consent to being contacted';
    return false;
  }
  else{
    small.innerText = ""
    return true;
  }
}






// radio button error
function buttonError(inputs, message) {
  inputs.forEach((input) => {
    const smallElement = input.parentNode.nextElementSibling;
    input.parentNode.classList.add('error');
     
    smallElement.innerText = message;
    smallElement.classList.add('error');
  });
}

function buttonSuccess(radioButtons,message) {
  radioButtons.forEach((button) =>{
    const smallElement = button.parentNode.nextElementSibling;
    if(button.checked){
      button.parentNode.classList.remove('error');
      button.parentNode.classList.add('success')

      smallElement.innerText = '';

    }else{
      button.parentNode.classList.remove('success')
      button.parentNode.classList.remove('error')
      smallElement.innerText = '';
    }
  })

}

// input error


function setErrorFor(input, message){
  input.classList.add('error')
  input.nextElementSibling.innerText = message;
}

function setSuccess (input){
  input.classList.remove('error');
  input.classList.add('success');
  input.nextElementSibling.innerText = '';
}








function isEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}


