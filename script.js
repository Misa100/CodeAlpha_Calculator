let display = document.getElementById('display');
let currentOperand = '';
let previousOperand = '';
let operator = null;

function appendNumber(number) {
    if (currentOperand.includes('.') && number === '.') return; // Prevent multiple decimals
    currentOperand = currentOperand.toString() + number.toString();
    updateDisplay();
}

function updateDisplay() {
    display.innerText = previousOperand + (operator ? ` ${operator} ` : '') + currentOperand;
}

function clearDisplay() {
    currentOperand = '';
    previousOperand = '';
    operator = null;
    display.innerText = '0';
}

function chooseOperator(op) {
    if (currentOperand === '' && operator === null) return;
    if (previousOperand !== '') {
        calculate();
    }
    operator = op;
    previousOperand = currentOperand;
    currentOperand = '';
    updateDisplay();
}

function calculate() {
    let result;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);

    if (isNaN(prev) || isNaN(current)) return;

    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = prev / current;
            break;
        default:
            return;
    }
    currentOperand = result;
    operator = null;
    previousOperand = '';
    updateDisplay();
}

function deleteLast() {
    if (currentOperand !== '') {
        currentOperand = currentOperand.slice(0, -1);
    } else if (operator !== null) {
        operator = null;
    } else if (previousOperand !== '') {
        previousOperand = previousOperand.slice(0, -1);
    }
    updateDisplay();
}