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

clearBtn.addEventListener('click', () => {
    operator = '';
    number.current = '';
    number.previous = '';
});

ansBtn.addEventListener('click', () => {
    if (number.previous) {
        number.current = operate(operator, number.previous, number.current);
        number.previous = '';
        operator = '';
    }
});

backspaceBtn.addEventListener('click', () => number.current = number.current.slice(0, number.current.length - 1));
decimalBtn.addEventListener('click', () => {
    if (!number.current.includes('.')) {
        zeroFill();
        number.current += '.';
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
// Listen to bubbling click events from buttons with class number/operator inside this div. Also update display
calculatorBtnDiv.addEventListener('click', (e) => {
    if (e.target.classList.contains('number')) {number.current += e.target.textContent};
    if (e.target.classList.contains('operator')) operatorCheck(e);
    display.textContent = `${number.previous} ${operator} ${number.current || '0'}`;
    if (number.current == 'ERROR') number.current = ''
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
    return (Math.round(result * 1000) / 1000);
}

function operate(operator, num1, num2) {
    if (operator == '+') return (add(num1, num2));
    if (operator == '-') return (subtract(num1, num2));
    if (operator == '*') return (multiply(num1, num2));
    if (operator == '/') return (divide(num1, num2) || 'ERROR');
}
// Uses getElementById because it doesn't return an error on invalid id like querySelector
document.addEventListener('keydown', e => {
    let element = document.getElementById(`kb:${e.key}`)
    if (element) {
        element.click()
        if (!element.classList.contains('active')) {
            element.className += ' active'
        }
    }
});

document.addEventListener('keyup', e => {
    let element = document.getElementById(`kb:${e.key}`)
    if (element) {
        element.className = element.className.replace(' active', '')
    }
})