const displayer = document.getElementById("display");

/* TODO :
--> ADD A FUNCTION TO CHANGE KEY BACKGROUND ON KEYDOWN 
--> ADD OTHER FUNCTIONALITIES LIKE ^ & %
--> ADD CALCULATION HISTORY 
--> MAKE IT A DESKTOP APP 
*/

function resetCalculator() {
  displayer.value = "";
}

function appendToDisplay(input) {
  displayer.value += input;
}

function suppressPreviousInput() {
  displayer.value = displayer.value.slice(0, -1);
}

function calculate() {
  try {
    let result = eval(displayer.value);

    if (result % 1 !== 0) {
      result = parseFloat(result.toFixed(3));
      displayer.value = "≈ " + result;
    } else {
      displayer.value = result;
    }
  } catch (error) {
    displayer.value = "Error";
  }
}


document.addEventListener("keydown", function(event) {
  const key = event.key;
 
  if ((key >= '0' && key <= '9') || key === '.' || key === '*' || key === '/' || key === '+' || key === '-') {
    appendToDisplay(key);
  }

  if (key === 'Escape') {
    resetCalculator();
  }

  if (key === 'Backspace') {
    suppressPreviousInput();
  }

  if (key === 'Enter') {
    calculate();
  }
});


function setTheme() {
  let themeSetter = document.getElementById("box");

  if (themeSetter.checked) {
    document.body.classList.add("darkTheme");
    document.body.classList.remove("lightTheme");
  } else {
    document.body.classList.remove("darkTheme");
    document.body.classList.add("lightTheme");
  }
}



