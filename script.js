// Get the display and buttons
const resultDisplay = document.getElementById('result');
const clearButton = document.getElementById('clear');
const equalButton = document.getElementById('equal');
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const moduloButton = document.getElementById('modulo');
const squareButton = document.getElementById('square');

// Initialize variables
let currentInput = '';
let previousInput = '';
let operator = '';

// Function to update the display
function updateDisplay() {
    resultDisplay.value = currentInput || previousInput || '0';
}

// Function to handle number button clicks
function handleNumberClick(event) {
    currentInput += event.target.innerText;
    updateDisplay();
}

// Function to handle operator button clicks
function handleOperatorClick(event) {
    if (currentInput === '') return;
    if (previousInput !== '') {
        performCalculation();
    }
    operator = event.target.innerText;
    previousInput = currentInput;
    currentInput = '';
    updateDisplay();
}

// Function to perform the calculation
function performCalculation() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

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
        case '%':
            result = prev % current;
            break;
        default:
            return;
    }

    currentInput = result.toString();
    operator = '';
    previousInput = '';
    updateDisplay();
}

// Function to handle modulo operation
moduloButton.addEventListener('click', () => {
    operator = '%';
    handleOperatorClick({ target: { innerText: '%' } });
});

// Function to handle square operation
squareButton.addEventListener('click', () => {
    if (currentInput === '') return;
    currentInput = (parseFloat(currentInput) ** 2).toString();
    updateDisplay();
});

// Handle equal button click to perform the operation
equalButton.addEventListener('click', performCalculation);

// Handle clear button to reset everything
clearButton.addEventListener('click', () => {
    currentInput = '';
    previousInput = '';
    operator = '';
    updateDisplay();
});

// Add event listeners to all number buttons
numberButtons.forEach(button => {
    button.addEventListener('click', handleNumberClick);
});

// Add event listeners to all operator buttons
operatorButtons.forEach(button => {
    button.addEventListener('click', handleOperatorClick);
});

