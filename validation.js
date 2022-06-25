document.getElementById('user_id').addEventListener('blur', validateUserId);
document.getElementById('first_name').addEventListener('blur', validateRequired);
document.getElementById('last_name').addEventListener('blur', validateRequired);
document.getElementById('birth_date').addEventListener('blur', validateDate);
document.getElementById('user_form').addEventListener('submit', handleFormSubmit);

// HashMap is use to persist the state of errors
const errors = new Map();

// This validates the userId
function validateUserId(e) {
  const userId = e.target.value.trim();
  const fieldName = e.target.name;
  let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,12}$/;
  const errorMessage = `${fieldName} must contain an uppercase, a lowercase, a number, and be 8 to 12 chars long`;
  const errorDiv = e.target.nextElementSibling;
  !regex.test(userId)
    ? displayErrorNotification(errorDiv, fieldName, errorMessage)
    : removeErrorNofication(errorDiv, fieldName);
}

function validateRequired(e) {
  const value = e.target.value.trim();
  const fieldName = e.target.name;
  const errorDiv = e.target.nextElementSibling;
  value === ''
    ? displayErrorNotification(errorDiv, fieldName)
    : removeErrorNofication(errorDiv, fieldName);
}

function validateDate(e) {
  const value = e.target.value;
  const fieldName = e.target.name;
  const errorDiv = e.target.nextElementSibling;
  const numberOfDays = dateDiff(value);
  const isOfAge = numberOfDays > 365 * 18;

  if (!numberOfDays || numberOfDays <= 0) {
    errorDiv.classList.add('show');
    displayErrorNotification(
      errorDiv,
      fieldName,
      `Please provide a valid date`
    );
  } else if (!isOfAge) {
    displayErrorNotification(
      errorDiv,
      fieldName,
      `You are probably not old enough to take this class!`
    );
  } else {
    errorDiv.classList.remove('show');
    errors.delete(fieldName);
  }
}

function handleFormSubmit(e) {
  e.preventDefault();
  const firstName = document.getElementById('first_name').value;
  const lastName = document.getElementById('last_name').value;
  const numberOfDays = dateDiff(document.getElementById('birth_date').value);

  if (errors.size === 0 && !checkNotEmpty()) {
    alert(
      `${firstName} ${lastName} you have been breathing for ${numberOfDays} days!`
    );
  }
}

function dateDiff(value) {
  // use a date constructor to create users birth_date via input parameter
  const birthDate = new Date(value);
  // get the present date
  const end = new Date();
  // One day in milliseconds
  const oneDay = 1000 * 60 * 60 * 24;
  // Calculating the time difference between two dates
  const diffInTime = end.getTime() - birthDate.getTime();
  // Calculating the no. of days between two dates
  const diffInDays = Math.round(diffInTime / oneDay);

  return diffInDays;
}

function checkNotEmpty() {
  const inputFields = document
    .getElementById('user_form')
    .querySelectorAll(`input[type=text] , input[type='date']`);
  let isEmpty = false;
  inputFields.forEach((e) => {
    if (e.value.trim() === '') {
      const errorDiv = e.nextElementSibling;
      const fieldName = e.name;
      displayErrorNotification(errorDiv, fieldName);
      isEmpty = true;
    }
  });
  return isEmpty;
}

// display Required error notifications
function displayErrorNotification(errorDiv, fieldName, message) {
  const errorMessage = message || `Invalid! ${fieldName} cannot be empty`;
  errorDiv.innerHTML = errorMessage;
  errors.set(fieldName, errorMessage);
  errorDiv.classList.add('show');
}
function removeErrorNofication(errorDiv, fieldName) {
  errorDiv.classList.remove('show');
  errors.delete(fieldName);
}

// Display pattern
let n = 20;
let string = '';
for (let i = 1; i <= n; i++) {
  for (let j = 0; j < i; j++) {
    string += 'X';
  }
  string += '<br/>';
}

document.querySelector('.showPattern').innerHTML = string;
