let currentInput = '';
let operation = null;
let previousInput = '';
let history = []; // Array to store history

function updateDisplay() {
    document.getElementById('display').innerText = currentInput || "0";
}

function updateHistory() {
    const historyElement = document.getElementById('history');
    historyElement.innerHTML = history.join(' | '); // Simple text-based history
}

function clearDisplay() {
    currentInput = '';
    previousInput = '';
    operation = null;
    updateDisplay();
}

function clearHistory() {
    history = []; // Reset the history array
    updateHistory(); // Update the history display
}

function appendNumber(number) {
    currentInput = currentInput.toString() + number.toString();
    updateDisplay();
}

function appendDecimal() {
    if (!currentInput.includes('.')) {
        currentInput += '.';
        updateDisplay();
    }
}

function performOperation(op) {
    if (currentInput === '') return;
    if (previousInput !== '') {
        calculate();
    }
    operation = op;
    previousInput = currentInput;
    currentInput = '';
}

function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const curr = parseFloat(currentInput);
    if (isNaN(prev) || isNaN(curr)) return;
    switch (operation) {
        case '+':
            result = prev + curr;
            break;
        case '-':
            result = prev - curr;
            break;
        case '*':
            result = prev * curr;
            break;
        case '/':
            if (curr === 0) {
                alert("Cannot divide by zero.");
                return;
            }
            result = prev / curr;
            break;
        case '%':
            result = (prev / 100) * curr;
            break;
        default:
            return;
    }
    history.push(`${previousInput} ${operation} ${currentInput} = ${result}`); // Add to history
    updateHistory();
    currentInput = result.toString();
    operation = undefined;
    previousInput = '';
    updateDisplay();
}

// Initialize
clearDisplay();
