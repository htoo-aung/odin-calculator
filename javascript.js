let display = "0";
let value1 = 0;
let value2 = 0;
let operator = "";

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
        case "/":
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
}

function clearAll() {
    display = "0";
    number1 = 0;
    number2 = 0;
    operator = "";
    setOperator(operator);
    setDisplayVisual(display);
}

function setDisplayVisual(string) {
    displayVisual.textContent = string;
}

function setClearDisplay(string) {
    clearBtn.textContent = string;
}

function setDisplay(string) {
    display = string;
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
    let btnClick = btn.addEventListener('click', () => {
            if (display.length === 9) {
                removeEventListener(btnClick);
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

operatorBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        setOperator(btn.textContent);
        setFirstValue(Number(display));
        setDisplay("0");
        setOperatorVisual(btn.textContent);
    });
});
