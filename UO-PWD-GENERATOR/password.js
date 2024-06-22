function generateRandomPassword(length) {
  let chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_-+=<>?";

  let password = "";

  for (let i = 0; i < length; i++) {
    const randomChar = Math.floor(Math.random() * chars.length);
    password += chars[randomChar];
    console.log(password);
  }

  return password;
}

function displayPassword() {
  let displayPassword = document.getElementById("pwd_input_displayer");
  let lengthElement = document.getElementById("length");
  let length = parseInt(lengthElement.value);

  const password = generateRandomPassword(length);

  if (displayPassword) {
    displayPassword.value = password;
  } else if (error) {
    console.error("Element with the specified ID was not found.");
    displayPassword.value = error;
  }
}

function updateLengthDisplay() {
  const lengthElement = document.getElementById("length");
  const lengthValueElement = document.getElementById("lengthDisplay");
  lengthValueElement.textContent = lengthElement.value;
}

document.addEventListener("DOMContentLoaded", updateLengthDisplay);

function setPasswordConfig() {}

function setNewBackground() {
  const imageBank = [
    "images/mountain_cover.jpg",
    "images/space3.jpg",
    "images/synthwave-electro-4k-co.jpg",
    "images/synthwave3.jpg",
    "images/bard.jpg",
    "images/moon1.webp",
    "images/moon2.png",
    "images/moon3.jpg",
    "images/towers.jpg",
    "images/towers2.jpg",
  ];

  let lastBackgroundIndex = null;
  let randomIndex;

  do {
    randomIndex = Math.floor(Math.random() * imageBank.length);
  } while (randomIndex === lastBackgroundIndex);

  const newBackground = imageBank[randomIndex];

  document.body.style.backgroundImage = `url(${newBackground})`;

  lastBackgroundIndex = randomIndex;
}
