let number1, number2, operator;

const currentOperator = document.getElementById("calc-operator");
const numberBtns = document.querySelectorAll(".number");
const operatorBtns = document.querySelectorAll(".operator");


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

}

/* Event Handlers */

operatorBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        currentOperator.textContent = btn.textContent;
    });
});