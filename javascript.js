let display = "0";
let number1 = 0;
let number2 = 0;
let operator = "";

const operatorVisual = document.getElementById("calc-operator");
const displayVisual = document.getElementById("calc-display");

const numberBtns = document.querySelectorAll(".number");
const operatorBtns = document.querySelectorAll(".operator");
const clearBtn = document.getElementById("btn-clear");


/* Utility Functions */

function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    if (num2 === 0) {
        return "Infinity";
    }
    
    return num1 / num2;
}

function operate(num1, num2, operator) {
    let ans;

    switch (operator) {
        case "+":
            ans = add(num1, num2);
            break;
        case "-":
            ans = subtract(num1, num2);
            break;
        case "x":
            ans = multiply(num1, num2);
            break;
        case "/":
            ans = divide(num1, num2);
            break;
        default:
            console.log("Empty action received.");
    }

    return ans;
}

function clear() {

}

function clearAll() {
    display = "0";
    number1 = 0;
    number2 = 0;
    operator = "";
    changeOperator(operator);
    changeDisplay(display);
}

function changeDisplay(string) {
    displayVisual.textContent = string;
}

function changeOperator(string) {
    operatorVisual.textContent = string;
}

/* Event Listeners */

clearBtn.addEventListener('click', () => {
    clearAll();
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
            changeDisplay(display);
        });
});

operatorBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        changeOperator(btn.textContent);
        operator = btn.textContent;
    });
});
