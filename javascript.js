let display = "0";
let value1 = 0;
let value2 = 0;
let operator = "";
let equalsActive = false;
let operationActive = false;

const operatorVisual = document.getElementById("calc-operator");
const displayVisual = document.getElementById("calc-display");

const numberBtns = document.querySelectorAll(".number");
const operatorBtns = document.querySelectorAll(".operator");
const clearBtn = document.getElementById("btn-clear");

const decimalBtn = document.getElementById("btn-decimal");


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

function operate(val1, val2, operator) {
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
    operationActive = false;
}

function setDisplayVisual(string) {
    // A check if string has 9 characters
    displayVisual.textContent = string;
}

function setDisplay(string) {
    display = string;
}

function getDisplayAsNumber() {
    return Number(display);
}

function setClearDisplay(string) {
    clearBtn.textContent = string;
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
    if (clearBtn.textContent === "C") {
        clear();
    }
    else {
        clearAll();
    }
});

numberBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        const btnPressed = btn.textContent;

        if (display.length === 9) {
            return;
        }

        if (equalsActive) {
            setDisplay(btnPressed)
            equalsActive = false;
        }
        else if (display === "0") {
            setDisplay(btnPressed);
        }
        else {
            setDisplay(display + btnPressed);
        }

        setClearDisplay("C");
        setDisplayVisual(display);
    });
});

decimalBtn.addEventListener('click', () => {

    if (display.includes(".")) {
        return;
    }
    else {
        setDisplay(display + decimalBtn.textContent);
    }

    setClearDisplay("C");
    setDisplayVisual(display);
});

/** 
 * Adds an event listener to the operation buttons.
 * When the operations are clicked, the active operation is displayed.
 * explain more
 */
operatorBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        const btnPressed = btn.textContent;
        setOperatorVisual(btnPressed);

        if (btnPressed === "=") {
            let ans;
            
            if (operationActive) {
                setSecondValue(getDisplayAsNumber());
                ans = operate(value1, value2, operator);
                setDisplayVisual(ans);

                setFirstValue(ans);
            }
            else {
                ans = operate(value1, value2, operator);
                setDisplayVisual(ans);
                setFirstValue(ans);
            }

            setDisplay(ans);

            equalsActive = true;
            operationActive = false;
        }
        else {
            let ans;

            if (operationActive) {
                setSecondValue(getDisplayAsNumber());
                ans = operate(value1, value2, operator);
                setDisplayVisual(ans);
                
                setFirstValue(ans);
                setSecondValue(0);
            }
            else {
                setFirstValue(getDisplayAsNumber());
            }

            setDisplay("0");
            setOperator(btnPressed);

            equalsActive = false;
            operationActive = true;
        }

    });
});
