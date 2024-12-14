let currentInput = '';
let previousInput = '';
let operator = '';

function appendValue(value) {
    currentInput += value;
    document.getElementById('display').value = currentInput;
}

function setOperation(op) {
    if (currentInput === '') return;
    if (previousInput !== '') {
        calculateResult();
    }
    operator = op;
    previousInput = currentInput;
    currentInput = '';
}

function calculateResult() {
    if (previousInput === '' || currentInput === '') return;

    let result;
    const num1 = parseFloat(previousInput);
    const num2 = parseFloat(currentInput);

    switch (operator) {
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case '*':
            result = num1 * num2;
            break;
        case '/':
            result = num1 / num2;
            break;
        default:
            return;
    }

    currentInput = result.toString();
    operator = '';
    previousInput = '';
    document.getElementById('display').value = currentInput;
}

function clearDisplay() {
    currentInput = '';
    previousInput = '';
    operator = '';
    document.getElementById('display').value = '0';
}

function appendDecimal() {
    if (!currentInput.includes('.')) {
        currentInput += '.';
        document.getElementById('display').value = currentInput;
    }
}
