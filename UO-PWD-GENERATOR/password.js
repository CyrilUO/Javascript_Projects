
function generateRandomPassword(length) {
    let chars ="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_-+=<>?"

    let password = "";

    for (let i = 0; i < length; i++){
        const randomChar = Math.floor(Math.random() * chars.length);
        password += chars[randomChar];
        console.log(password);
    }

    return password
    
}


function displayPassword() {

    let displayPassword = document.getElementById('pwd_input_displayer');
    let lengthElement= document.getElementById('length');
    let length = parseInt(lengthElement.value)

    const password = generateRandomPassword(length);

    if (displayPassword) {
        displayPassword.value = password;
    } else {
        console.error('Element with the specified ID was not found.');
    }
}

function updateLengthDisplay() {
    const lengthElement = document.getElementById('length');
    const lengthValueElement = document.getElementById('length_value');
    lengthValueElement.textContent = lengthElement.value;
}


function setPasswordConfig () {

}

function setNewBackground() {

}