const display = document.querySelector('.display');
const calculatorBtnDiv = document.querySelector('#calculator-buttons');
const clearBtn = document.querySelector('.clear');
const ansBtn = document.querySelector('.operate');
const backspaceBtn = document.querySelector('.backspace');
const decimalBtn = document.querySelector('.decimal');

let operator = '';
let number = {
    current: '',
    previous: '',
    store: function () {
        this.previous = this.current;
        this.current = '';
    },
};

clearBtn.addEventListener('click', clearAll);
ansBtn.addEventListener('click', getAns);
backspaceBtn.addEventListener('click', () => number.current = number.current.slice(0, number.current.length - 1));
decimalBtn.addEventListener('click', (e) => {
    if (!number.current.includes('.')) {
        zeroFill();
        number.current += e.target.textContent;
    }
});

function zeroFill() {
    if (!number.current) {
        number.current = '0';
    };
}
// Makes sure expected action is taken when a user clicks and chains calculations
function operatorCheck(e) {
    if (number.current && !number.previous) {
        number.store();
    } else if (!number.current && !number.previous) {
        zeroFill();
        number.store();
    } else if (number.current && number.previous) {
        number.current = operate(operator, number.previous, number.current);
        number.store();
    }
    operator = e.target.textContent;
}

function getAns() {
    if (number.previous) {
        number.current = operate(operator, number.previous, number.current);
        number.previous = '';
        operator = '';
    }
}

function clearAll() {
    operator = '';
    number.current = '';
    number.previous = '';
}
// Listen to bubbling click events from buttons with class number/operator inside this div. Also update display
calculatorBtnDiv.addEventListener('click', (e) => {
    if (e.target.classList.contains('number')) {number.current += e.target.textContent};
    if (e.target.classList.contains('operator')) operatorCheck(e);
    display.textContent = `${number.previous} ${operator} ${number.current || '0'}`;
});

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
        alert('What are you doing???');
    } else {
        return round(num1 / num2);
    }
}
// Rounds the resulting number to three decimal places
function round(result) {
    return (Math.round(result * 1000) / 1000).toString();
}

function operate(operator, num1, num2) {
    if (operator == '+') return (add(num1, num2));
    if (operator == '-') return (subtract(num1, num2));
    if (operator == '*') return (multiply(num1, num2));
    if (operator == '/') return (divide(num1, num2) || 'ERROR');
}
document.addEventListener('keydown', event => {
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
});