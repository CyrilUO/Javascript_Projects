document.addEventListener("DOMContentLoaded", function () {
  updateLengthDisplay();
});

/******** Password conception logic *********/

function updateLengthDisplay() {
  const lengthElement = document.getElementById("length");
  const lengthValueElement = document.getElementById("lengthDisplay");
  lengthValueElement.textContent = lengthElement.value;
}

function generateRandomPassword(length) {
  const lowerCaseChars = "abcdefghijklmnopqrstuvwxyz";
  const upperCaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numberChars = "0123456789";
  const symbolChars = "!@#$%^&*()_-+=<>?";

  const includeLowerCase = document.getElementById("lowerCase").checked;
  const includeUpperCase = document.getElementById("upperCase").checked;
  const includeNumbers = document.getElementById("numbers").checked;
  const includeSymbols = document.getElementById("symbols").checked;

  let characterSet = "";
  if (includeLowerCase) characterSet += lowerCaseChars;
  if (includeUpperCase) characterSet += upperCaseChars;
  if (includeNumbers) characterSet += numberChars;
  if (includeSymbols) characterSet += symbolChars;

  if (characterSet === "") {
    displayWarningOverlay();
    return null;
  }

  let password = "";
  for (let i = 0; i < length; i++) {
    const randomChar = Math.floor(Math.random() * characterSet.length);
    password += characterSet[randomChar];
  }

  return password;
}

function displayPassword() {
  const lengthElement = document.getElementById("length");
  const length = parseInt(lengthElement.value);
  const password = generateRandomPassword(length);

  const displayPassword = document.getElementById("pwd_input_displayer");
  if (displayPassword) {
    displayPassword.value = password;
  } else {
    console.error("Element with the specified ID was not found.");
  }
}

/******** Background Setting Logic *********/

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

/******** Error overlay logic *********/

let overlay = document.getElementById("overlay");
overlay.style.display = "none";

function displayWarningOverlay() {
  overlay.style.display = "flex";
}

function returnHome() {
  overlay.style.display = "none";
}

/******** Music toggle logic *********/

let isMusicPlayed;
const audioRadio = document.querySelector(
  ".js_audio_handler[src='sound/Free Synthwave Music - Miami Sky No Copyright Music.mp3']"
);

let musicStateIcon = document.getElementById(".js_iconChanger");

function toggleMusicAndSwitchIcon() {
  const audioRadio = document.querySelector(
    ".js_audio_handler[src='sound/Free Synthwave Music - Miami Sky No Copyright Music.mp3']"
  );

  if (audioRadio) {
    if (audioRadio.paused) {
      audioRadio
        .play()
        .then(() => {
          isMusicPlayed = true;
          musicStateIcon.classList.remove("fa-play");
          musicStateIcon.classList.add("fa-pause");
        })
        .catch((error) => {
          console.error("Error playing audio:", error);
          alert("Error playing audio: " + error);
        });
    } else {
      audioRadio.pause();
      musicStateIcon.classList.remove("fa-pause");
      musicStateIcon.classList.add("fa-play");
      isMusicPlayed = false;
    }
  } else {
    console.error("Audio element not found.");
  }
}

/******** Password copying into clipBoard logic *********/

/* function clipBoardInteract() {

}

*/
