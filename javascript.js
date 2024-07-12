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

/**
 * Adds value one and value two.
 * Sum cannot be greater than 999,999,999.
 * 
 * @param {Number} val1 - The first value
 * @param {Number} val2 - The second value
 * @returns {Number} The sum of val1 and val2
 */
function add(val1, val2) {
    if (val1 + val2 > 999999999) {
        return 999999999;
    }
    else {
        return val1 + val2;
    }
}

/**
 * Subtracts the second value from the first one.
 * 
 * @param {Number} val1 - The first value
 * @param {Number} val2 - The second value
 * @returns {Number} The difference between val1 and val2
 */
function subtract(val1, val2) {
    return val1 - val2;
}

/**
 * Multiplies value one and value two.
 * Product cannot be greater than 999,999,999.
 * 
 * @param {Number} val1 - The first value
 * @param {Number} val2 - The second value
 * @returns {Number} The product of val1 and val2
 */
function multiply(val1, val2) {
    if (val1 * val2 > 999999999) {
        return 999999999;
    }
    else {
        return val1 * val2;
    }
}

/**
 * Divides value one and value two.
 * 
 * @param {Number} val1 - The first value
 * @param {Number} val2 - The second value
 * @returns {Number} The quotient of val1 and val2
 * @throws {Error} Throws an error is val2 is 0
 */
function divide(val1, val2) {
    if (val2 === 0) {
        throw new Error("Division by zero is not allowed.");
    }
    
    return val1 / val2;
}

/**
 * Performs operation on two values based on specified operator.
 * 
 * @param {Number} val1 - The first value
 * @param {Number} val2 - The second value
 * @param {String} operator - The operator to be performed ("+", "-", "x", "÷")
 * @returns {Number} Result of the operation
 * @throws {Error} Throws an error if invalid operator is provided
 */
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
            throw new Error("Invalid operator provided.");
    }

    return ans;
}

/**
 * Clears the display.
 * 
 * Sets display to "0" and updates display visual and clear button text.
 */
function clear() {
    setDisplay("0");
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
    displayVisual.textContent = String(string);
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
