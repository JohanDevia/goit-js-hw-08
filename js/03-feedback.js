import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');

const saveToLocalStorage = () => {
  const data = {
    email: emailInput.value,
    message: messageInput.value,
  };
  localStorage.setItem('feedback-form-state', JSON.stringify(data));
};

const loadFromLocalStorage = () => {
  const data = localStorage.getItem('feedback-form-state');
  if (data) {
    const { email, message } = JSON.parse(data);
    emailInput.value = email;
    messageInput.value = message;
  } else {
    emailInput.value = '';
    messageInput.value = '';
  }
};

const clearLocalStorageAndForm = () => {
  localStorage.removeItem('feedback-form-state');
  emailInput.value = '';
  messageInput.value = '';
};

const handleSubmit = event => {
  event.preventDefault();
  const data = {
    email: emailInput.value,
    message: messageInput.value,
  };
  console.log(data);
  clearLocalStorageAndForm();
};

form.addEventListener('input', throttle(saveToLocalStorage, 500));
form.addEventListener('submit', handleSubmit);

window.addEventListener('load', loadFromLocalStorage);
