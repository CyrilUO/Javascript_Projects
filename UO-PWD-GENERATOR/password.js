document.addEventListener("DOMContentLoaded", function () {
  updateLengthDisplay();
  clipBoardInteract();
  checkboxSoundEffects();
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

  let checkboxes = document.querySelectorAll('input[type="checkbox"]');
  let characterSet = "";
  const requiredChars = [];

  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      switch (checkbox.id) {
        case "lowerCase":
          characterSet += lowerCaseChars;
          requiredChars.push(
            lowerCaseChars[Math.floor(Math.random() * lowerCaseChars.length)]
          );
          break;
        case "upperCase":
          characterSet += upperCaseChars;
          requiredChars.push(
            upperCaseChars[Math.floor(Math.random() * upperCaseChars.length)]
          );
          break;
        case "numbers":
          characterSet += numberChars;
          requiredChars.push(
            numberChars[Math.floor(Math.random() * numberChars.length)]
          );
          break;
        case "symbols":
          characterSet += symbolChars;
          requiredChars.push(
            symbolChars[Math.floor(Math.random() * symbolChars.length)]
          );
          break;
      }
    }
  });

  if (characterSet === "") {
    displayWarningOverlay();
    return null;
  }

  if (requiredChars.length > length) {
    alert("The selected options require a longer password length.");
    return null;
  }

  let password = requiredChars.join("");

  for (let i = password.length; i < length; i++) {
    password += characterSet[Math.floor(Math.random() * characterSet.length)];
  }

  password = password
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");

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

let musicStateIcon = document.getElementById("js_iconChanger");

let musicStateText = document.querySelector("#musicStateText");

function toggleMusicAndSwitchIcon() {
  if (audioRadio) {
    if (audioRadio.paused) {
      audioRadio
        .play()
        .then(() => {
          isMusicPlayed = true;
          musicStateIcon.classList.remove("fa-play");
          musicStateIcon.classList.add("fa-pause");
          musicStateText.textContent = "Pause Music";
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
      musicStateText.textContent = "Play Music";
    }
  } else {
    console.error("Audio element not found.");
  }
}

function checkboxSoundEffects() {
  const sfxEffect = document.querySelector(
    '.js_sfx_handler[src="sound/glitch-sound-fx-pack-04-118236.mp3"]'
  );

  // S'assurer que l'élément audio est présent
  if (sfxEffect) {
    sfxEffect.style.visibility = "hidden";

    function checkboxSound() {
      const checkboxes = document.querySelectorAll('input[type="checkbox"]');

      checkboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", () => {
          sfxEffect.currentTime = 0; // Reset le temps de lecture pour permettre une lecture répétée rapide
          sfxEffect.play().catch((error) => {
            console.error("Error playing checkbox sound:", error);
          });

          if (checkbox.checked) {
            checkbox.classList.add("checkbox-animation-x");
          } else {
            checkbox.classList.add("checkbox-animation-y");
          }

          // Suppression de l'animation après qu'elle se soit terminée
          checkbox.addEventListener("animationend", () => {
            checkbox.classList.remove(
              "checkbox-animation-x",
              "checkbox-animation-y"
            );
          });
        });
      });
    }

    checkboxSound();
  } else {
    console.error("SFX audio element not found.");
  }
}

/******** Password copying into clipBoard logic *********/

function clipBoardInteract() {
  const clipboardIcon = document.getElementById("js_copy_password");
  const passwordInput = document.getElementById("pwd_input_displayer");

  if (clipboardIcon && passwordInput) {
    clipboardIcon.addEventListener("click", function () {
      if (passwordInput.value.trim() !== "") {
        passwordInput.select();
        passwordInput.setSelectionRange(0, 9999);

        navigator.clipboard
          .writeText(passwordInput.value)
          .then(() => {
            alert("Password successfully copied! 😇");
          })
          .catch((error) => {
            console.error("Error while copying your password:", error);
            alert("Your password couldn't be copied.");
          });
      } else {
        alert("No password to copy!");
      }
    });
  } else {
    console.error("Clipboard icon or password input not found.");
  }
}
