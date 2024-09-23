let currentInput = '';
let previousInput = '';
let operator = undefined;

const display = document.getElementById('display');

// Function to update display
function updateDisplay() {
    if (operator != null) {
        display.innerText = `${previousInput} ${operator} ${currentInput}`;
    } else {
        display.innerText = currentInput || '0';
    }
}

// Function to append numbers
function appendNumber(number) {
    if (currentInput === '0') {
        currentInput = number;
    } else {
        currentInput += number;
    }
    updateDisplay();
}

// Function to choose operator
function chooseOperator(selectedOperator) {
    if (currentInput === '' && previousInput === '') return;
    if (previousInput !== '' && currentInput !== '') {
        calculate();
    }
    operator = selectedOperator;
    previousInput = currentInput;
    currentInput = '';
    updateDisplay();
}

// Function to clear all input
function clearAll() {
    currentInput = '';
    previousInput = '';
    operator = undefined;
    updateDisplay();
}

// Function to perform the calculation
function calculate() {
    let computation;
    const prev = parseFloat(previousInput);
    const curr = parseFloat(currentInput);
    if (isNaN(prev) || isNaN(curr)) return;

    switch (operator) {
        case '+':
            computation = prev + curr;
            break;
        case '-':
            computation = prev - curr;
            break;
        case '*':
            computation = prev * curr;
            break;
        case '/':
            computation = prev / curr;
            break;
        default:
            return;
    }
    currentInput = computation.toString();
    operator = undefined;
    previousInput = '';
    updateDisplay();
}

// Function to delete last character
function deleteLast() {
    currentInput = currentInput.slice(0, -1);
    if (currentInput === '') currentInput = '0';
    updateDisplay();
}

// Event listener for keyboard input
window.addEventListener('keydown', function (e) {
    if (e.key >= '0' && e.key <= '9') {
        appendNumber(e.key);
    } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        chooseOperator(e.key);
    } else if (e.key === 'Enter' || e.key === '=') {
        calculate();
    } else if (e.key === 'Backspace') {
        deleteLast();
    } else if (e.key === 'Escape') {
        clearAll();
    }
});
