const display = document.querySelector('.display')
const calculator = document.querySelector('#calculator-buttons');
const clearBtn = document.querySelector('#clear')
const operateBtn = document.querySelector('#operate')

let num1 = '';
let operator = '';
let num2 = '';
let displayContent = ''
let isFirstNumber = true;
let result = 0;

function add(num1, num2) {
    return +num1 + +num2;
}
function subtract(num1, num2) {
    return num1 - num2;
}
function multiply(num1, num2) {
    return num1 * num2;
}
function divide(num1, num2) {
    return num1 / num2;
}

function operate(operator, num1, num2) {
    if (operator == '+') return (add(num1, num2))
    if (operator == '-') return (subtract(num1, num2))
    if (operator == '*') return (multiply(num1, num2))
    if (operator == '/') return (divide(num1, num2))
}


calculator.addEventListener('click', (event) => {
    event.stopPropagation();
    if (event.target.classList.contains('number') && isFirstNumber) {
        num1 += event.target.textContent;
        console.log('First:', num1)
    }
    
    if (event.target.classList.contains('operator')) {
        if (num1 && num2 && operator) {
            validate()
            operator = event.target.textContent;
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

    if (operator && num1 && num2) {
        result = operate(operator, num1, num2);;
        display.textContent = `Result: ${result}`;
        num1 = result.toString()
        num2 = '' 
        operator = ''
        console.log('Result:', result)
    }
}

clearBtn.addEventListener('click', (event) => {
    event.stopPropagation()
    reset()
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
    displayContent = `${num1} ${operator} ${num2}`
    display.textContent = displayContent
}