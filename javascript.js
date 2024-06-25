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
        case "=":
            return val1;
        default:
            console.log("Empty action received.");
    }

    return ans;
}

function clear() {
    display = "0";
    setDisplayVisual(display);
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

clearBtn.addEventListener('click', () => {
    if (clearBtn.textContent === "C") {
        clear();
        setClearDisplay("AC");
    }
    else {
        clearAll();
    }
});

numberBtns.forEach((btn) => {
    let handleClick = btn.addEventListener('click', () => {
        if (display.length === 9) {
            btn.removeEventListener('click', handleClick);
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

    btn.addEventListener('click', handleClick);
});

operatorBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        if (btn.textContent === "=" && equalsActive) {
            setFirstValue(Number(display));

            display = operate(value1, value2, operator);
            setDisplayVisual(display);
            setClearDisplay("C");
            equalsActive = false;
        }
        else if (btn.textContent === "=") {
            setOperatorVisual(btn.textContent);
            setSecondValue(Number(display));

            display = operate(value1, value2, operator);
            setDisplayVisual(display);

            equalsActive = true;
        }
        else {
            setOperator(btn.textContent);
            setOperatorVisual(btn.textContent);
            setFirstValue(Number(display));
            setDisplay("0");
        }
    });
});
