const display = document.querySelector('.display')
const calculatorBtnDiv = document.querySelector('#calculator-buttons');
const clearBtn = document.querySelector('.clear')
const ansBtn = document.querySelector('.operate')
const backspaceBtn = document.querySelector('.backspace')
const decimalBtn = document.querySelector('.decimal')

let stage = 1;
let operator = ''
let previousOperator;
let number = {
    current: '',
    previous: '',
    store: function() {
        this.previous = this.current;
        this.current = '';
    }
};

clearBtn.addEventListener('click', clearListener)
decimalBtn.addEventListener('click', decimalListener)
ansBtn.addEventListener('click', ansListener)
backspaceBtn.addEventListener('click', backspaceListener)

console.log('Stage:', stage)

/* function zeroFill() {
    if (!number.current) {
        number.current = '0'
    }
} */

function numberListener(e) {
    number.current += e.target.textContent;
}

function operatorListener(e) {
    if (number.current) {
        stage++
        if (!number.previous) {
            // STAGE 1 > 2
            number.store()
        } else {
            // STAGE 3 > 4
            previousOperator = operator
        }
    }
    operator = e.target.textContent
}

function decimalListener(e) {
    zeroFill()
    if (!number.current.includes('.')) {
        number.current += e.target.textContent
    }
}

function ansListener() {
    if (operator && (number.current || '0') && number.previous) {
        let result = operate(operator, number.previous, number.current)
        number.current = result
        number.previous = ''
        operator = ''
        display.textContent = result
        stage = 1
    }
}
function clearListener() {
    stage = 1
    operator = ''
    previousOperator = ''
    number.current = ''
    number.store()
}

function backspaceListener() {
    number.current = number.current.slice(0, number.current.length - 1)
}

calculatorBtnDiv.addEventListener('click', (e) => {
    if (e.target.nodeName == 'BUTTON') {

        if (e.target.classList.contains('number')) numberListener(e);
        if (e.target.classList.contains('operator')) operatorListener(e);

        // Chain, move result to current value
        if (stage == 3) {
            number.current = operate(previousOperator, number.previous, number.current)
            number.store()
            stage = 2;
        }
        // DISPLAY
        display.textContent = `${number.previous} ${operator} ${number.current || '0'}`
    
        console.log('Stage:', stage)
    }
})

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
// Rounds the resulting number to three decimal places
function round(result) {
    return (Math.round(result * 1000) / 1000).toString();
}

// Checks the operator so the correct math is run
function operate(operator, num1, num2) {
    if (operator == '+') return (add(num1, num2))
    if (operator == '-') return (subtract(num1, num2))
    if (operator == '*') return (multiply(num1, num2))
    if (operator == '/') return (divide(num1, num2) || 'ERROR')
}
// Press button on valid keyboard event key, but there has to be a better way with btn animations
document.addEventListener('keydown', event => {
    console.log(event.key)
    if (event.key == 'Escape') clearBtn.click();
    if (event.key == 'Backspace') backspaceBtn.click();
    if (event.key == 'Enter') ansBtn.click();
    if (event.key == '+') document.querySelector('#k-sum').click();
    if (event.key == '-') document.querySelector('#k-subtract').click();
    if (event.key == '*') document.querySelector('#k-multiply').click();
    if (event.key == '/') document.querySelector('#k-divide').click();
    if (event.key == '1') document.querySelector('#k-1').click();
    if (event.key == '2') document.querySelector('#k-2').click();
    if (event.key == '3') document.querySelector('#k-3').click();
    if (event.key == '4') document.querySelector('#k-4').click();
    if (event.key == '5') document.querySelector('#k-5').click();
    if (event.key == '6') document.querySelector('#k-6').click();
    if (event.key == '7') document.querySelector('#k-7').click();
    if (event.key == '8') document.querySelector('#k-8').click();
    if (event.key == '9') document.querySelector('#k-9').click();
    if (event.key == '0') document.querySelector('#k-0').click();
    if (event.key == '.') document.querySelector('#k-dot').click();
})