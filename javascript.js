let display = "0";
let value1 = 0;
let value2 = 0;
let operator = "";
let equalsActive = false;

const operatorVisual = document.getElementById("calc-operator");
const displayVisual = document.getElementById("calc-display");

const numberBtns = document.querySelectorAll(".number");
const operatorBtns = document.querySelectorAll(".operator");
const clearBtn = document.getElementById("btn-clear");

const divisionBtn = document.getElementById("btn-division");
const additionBtn = document.getElementById("btn-addition");
const subtractionBtn = document.getElementById("btn-subtraction");
const multiplicationBtn = document.getElementById("btn-multiplication");


/* Utility Functions */

function add(val1, val2) {
    return val1 + val2;
}

function subtract(val1, val2) {
    return val1 - val2;
}

function multiply(val1, val2) {
    return val1 * val2;
}

function divide(val1, val2) {
    if (val2 === 0) {
        return "Infinity";
    }
    
    return val1 / val2;
}

function calculate(val1, val2, operator) {
    let ans;

    switch (operator) {
        case "+":
            ans = add(val1, val2);
            break;
        case "-":
            ans = subtract(val1, val2);
            break;
        case "x":
            ans = multiply(val1, val2);
            break;
        case "÷":
            ans = divide(val1, val2);
            break;
        default:
            console.log("Empty action received.");
    }

    return ans;
}

function clear() {
    display = "0";
    setDisplayVisual(display);
    setClearDisplay("AC");
}

function clearAll() {
    setFirstValue(0);
    setSecondValue(0);
    setOperator("");
    setDisplay("0");
    setOperatorVisual(operator);
    setDisplayVisual(display);
    equalsActive = false;
}

function setDisplayVisual(string) {
    // A check if string has 9 characters
    displayVisual.textContent = string;
}

function setDisplay(string) {
    display = string;
}

function setClearDisplay(string) {
    clearBtn.textContent = string;
}

function shouldDisplayClear() {
    return display = "0";
}

function setOperatorVisual(string) {
    operatorVisual.textContent = string;
}

function setOperator(string) {
    operator = string;
}

function setFirstValue(number) {
    value1 = number;
}

function setSecondValue(number) {
    value2 = number;
}

/* Event Listeners */

/**
 * 
 */
clearBtn.addEventListener('click', () => {
    if (shouldDisplayClear) {
        clear();
    }
    else {
        clearAll();
    }
});

numberBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        if (display.length === 9) {
            return;
        }

        if (display === "0") {
            display = btn.textContent
        }
        else {
            display += btn.textContent;
        }

        setClearDisplay("C");
        setDisplayVisual(display);
    });
});

/** 
 * Adds an event listener to the operation buttons.
 * When the operations are clicked, the active operation is displayed.
 */
operatorBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        setOperatorVisual(btn.textContent);
    });
});
