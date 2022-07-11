let previousValue = "";
let currentValue = "";
let currentOperator = "";
let errorMessage = false;

const previousDisplay = document.querySelector(".previousDisplay");
const currentDisplay = document.querySelector(".currentDisplay");
const clearButton = document.querySelector(".clear");
const deleteButton = document.querySelector(".delete");
const operatorButtons = document.querySelectorAll(".operator");
const numberButtons = document.querySelectorAll(".number");
const decimalButton = document.querySelector(".decimal");
const equalButton = document.querySelector(".equal");

clearButton.addEventListener('click', clearCalculator);
deleteButton.addEventListener('click', deleteLastNumber);
equalButton.addEventListener('click', equate);
decimalButton.addEventListener('click', addDecimal);

numberButtons.forEach((number) => {
    number.addEventListener('click', (e) => handleNumber(e.target.textContent));
})

operatorButtons.forEach((operator) => {
    operator.addEventListener('click', (e) => handleOperator(e.target.textContent));
})

function handleNumber(number) {
    currentDisplay.classList.remove('minimize');
    currentDisplay.classList.remove('minimizeMore');
    if (currentValue.length >= 12) return;
    if (currentOperator === "=") {
        clearCalculator();
    }
    currentValue += number;
    if (currentValue.length > 1 && currentValue.startsWith('0') && !currentValue.includes(".")) currentValue = currentValue.toString().slice(1);
    currentDisplay.textContent = currentValue;
}

function handleOperator(operator) {
    
    if (currentOperator !== "=") {
        if (currentValue === "") {
            currentValue = "0";
        }
        previousValue === "" ? previousValue = currentValue : calculate();
    }
    if (errorMessage) {
        displayError();
        return ;
    }
    currentOperator = operator;
    previousDisplay.textContent = `${previousValue} ${currentOperator}`;
    currentValue = "";
}

function clearCalculator() {
    currentDisplay.classList.remove('minimize');
    currentDisplay.classList.remove('minimizeMore');
    previousValue = "";
    currentValue = "";
    currentOperator = "";
    previousDisplay.textContent = "";
    currentDisplay.textContent = "0";
}

function deleteLastNumber() {
    currentValue = currentValue.toString().slice(0, -1);
    if (currentValue === "") {
        currentDisplay.textContent = "0";
    } else {
        currentDisplay.textContent = currentValue;
    }
}

function equate() {
    if (currentOperator === "" || currentOperator === "=" || currentValue === "") return;
    previousDisplay.textContent = `${previousValue} ${currentOperator} ${currentValue} =`;
    if (previousDisplay.textContent.length >= 30) previousDisplay.classList.add("minimizeMax");
    calculate();
    if (errorMessage) {
        displayError();
        return ;
    }
    currentOperator = "=";
    currentValue = "";
    currentDisplay.textContent = previousValue;
}

function addDecimal() {
    if (currentValue === "") currentValue += "0";
    if (!currentValue.includes(".")) currentValue += ".";
    currentDisplay.textContent = currentValue;
}

function calculate() {
    previousValue = Number(previousValue);
    currentValue = Number(currentValue);

    if (currentOperator === "/") {
        if (currentValue === 0) {
            errorMessage = true;
            return;
        } 
        previousValue /= currentValue;
    } else if (currentOperator === "x") {
        previousValue *= currentValue;
    } else if (currentOperator === "-") {
        previousValue -= currentValue;
    } else if (currentOperator === "+") {
        previousValue += currentValue;
    } else if (currentOperator === "^") {
        previousValue **= currentValue;
    }

    previousValue = Math.round(previousValue * 1000000) / 1000000;
    previousValue = previousValue.toString();
    
    if (previousValue.length >= 18) {
        currentDisplay.classList.add('minimizeMore');
    } else if (previousValue.length >= 12) {
        currentDisplay.classList.add('minimize');
    } else {
        currentDisplay.classList.remove('minimize');
    }
}

function displayError() {
    clearCalculator();
    errorMessage = false;
    currentDisplay.textContent = "Error";
}