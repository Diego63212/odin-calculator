const display = document.querySelector('.display')
const calculator = document.querySelector('#calculator-buttons');
const clearBtn = document.querySelector('.clear')
const operateBtn = document.querySelector('.operate')
const backspaceBtn = document.querySelector('.backspace')
const periodBtn = document.querySelector('.dot')

let num1 = '';
let operator = '';
let num2 = '';
let isFirstNumber = true;
let result = '';

periodBtn.disabled = true;

function add(num1, num2) {
    return round(+num1 + +num2);
}
function subtract(num1, num2) {
    return round(num1 - num2);
}
function multiply(num1, num2) {
    return round(num1 * num2);
}
function divide(num1, num2) {
    if (num2 == 0) {
        alert('What are you doing???')
    } else {
        return round(num1 / num2);
    }
}
function round(result) {
    return (Math.round(result * 1000) / 1000).toString();
}

function operate(operator, num1, num2) {
    if (operator == '+') return (add(num1, num2))
    if (operator == '-') return (subtract(num1, num2))
    if (operator == '*') return (multiply(num1, num2))
    if (operator == '/') return (divide(num1, num2) || 'ERROR')
}

calculator.addEventListener('click', (event) => {
    if (event.target.classList.contains('number') && isFirstNumber) {
        num1 += event.target.textContent;
        console.log('First:', num1)
    }
    
    if (event.target.classList.contains('operator')) {
        if (!num1) num1 = '0'
        if (num1 && num2 && operator) {
            validateChain()
        } else if (num1 && !num2) {
            operator = event.target.textContent;
            console.log('Operator:', operator)
            isFirstNumber = false
        }
    }
    
    if (event.target.classList.contains('number') && !isFirstNumber && operator) {
        num2 += event.target.textContent;
        console.log('Second:', num2)
    }
    update()
})

operateBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    validate()
});

function validate() {
    if (operator && num1) {
        if (!num2) num2 = '0'
        result = operate(operator, num1, num2);;
        display.textContent = result;
        num1 = result
        num2 = '' 
        operator = ''
        console.log('Result:', result)
        isFirstNumber = true
    }
}

function validateChain() {
    result = operate(operator, num1, num2);;
    display.textContent = result;
    num1 = result
    num2 = ''
    result = ''
}

clearBtn.addEventListener('click', (event) => {
    event.stopPropagation()
    reset()
})

backspaceBtn.addEventListener('click', (event) => {
    event.stopPropagation()
    backspace()
})

function reset() {
    num1 = '';
    num2 = '';
    operator = '';
    display.textContent = '0'
    isFirstNumber = true;
    result = ''
}

function update() {
    display.textContent = `${num1} ${operator} ${num2}`
    if (!num1) display.textContent = '0'

    if (isFirstNumber && num1.includes('.')) {
        periodBtn.disabled = true;
    } else {
        periodBtn.disabled = false;
    }

    if (!isFirstNumber && num2 && num2.includes('.')) {
        periodBtn.disabled = true;
    } else if (!isFirstNumber) {
        periodBtn.disabled = false;
    }
    checkDot()
}

function backspace() {
    if (isFirstNumber) {
        num1 = num1.slice(0, num1.length - 1)
    } else {
        num2 = num2.slice(0, num2.length - 1)
    }
    update()
}

function checkDot () {
    if (isFirstNumber && !num1 || num1.includes('.')) {
        periodBtn.disabled = true;
    } else {
        periodBtn.disabled = false;
    }

    if (!isFirstNumber && !num2 || num2.includes('.')) {
        periodBtn.disabled = true;
    } else if (!isFirstNumber) {
        periodBtn.disabled = false;
    }
}