const display = document.querySelector('.display')
const calculatorBtnDiv = document.querySelector('#calculator-buttons');
const clearBtn = document.querySelector('.clear')
const ansBtn = document.querySelector('.operate')
const backspaceBtn = document.querySelector('.backspace')
const decimalBtn = document.querySelector('.decimal')

let operator = ''
let numbers = {
    current: '',
    previous: '',
    store: function() {
        this.previous = this.current;
        this.current = '';
    }
};
let stage = 0;
let previousOperator;

clearBtn.addEventListener('click', clearListener)
decimalBtn.addEventListener('click', decimalListener)
ansBtn.addEventListener('click', ansListener)
backspaceBtn.addEventListener('click', backspaceListener)

// Handle Stage 0
function manageStart(skip) {
    if (stage < 1 && skip) {
        if (!numbers.current) {
            numbers.current = '0'
        }
    }

    if (stage == 0) {
        stage++
    }
}

function numberListener(e) {
    manageStart()
    // STAGE 2 > 3
    if (stage == 2) stage++
    // STAGE 1 & 2
    if (stage == 1 || stage == 3) {
        numbers.current += e.target.textContent;
    }
}

function operatorListener(e) {
    manageStart(true)
    if (numbers.current) {
        stage++
        if (!numbers.previous) {
            //STAGE 1 > 2
            numbers.store()
        } else {
            // STAGE 3 > 4
            previousOperator = operator
        }
    }
    operator = e.target.textContent
}

function decimalListener(e) {
    manageStart(true)
    if (!numbers.current.includes('.')) {
        numbers.current += e.target.textContent
    }
}

function ansListener(e) {
    e.stopPropagation()
    if (operator && (numbers.current || '0') && numbers.previous) {
        let result = operate(operator, numbers.previous, numbers.current)
        numbers.current = result
        numbers.previous = ''
        display.textContent = result
        stage = 1
        operator = ''
    }
}
function clearListener(e) {
    /* e.stopPropagation() */
    stage = 0
    numStage1 = ''
    numStage2 = ''
    operator = ''
    previousOperator = ''
    numbers.current = ''
    numbers.store()
}

function backspaceListener(e) {
    numbers.current = numbers.current.slice(0, numbers.current.length - 1)
    if (!numbers.current && stage == 1) {
        stage--
    }
}

calculatorBtnDiv.addEventListener('click', (e) => {
    if (e.target.nodeName == 'BUTTON') {
        if (e.target.classList.contains('number')) numberListener(e);
        if (e.target.classList.contains('operator')) operatorListener(e);

        // Chain, move result to current value
        if (stage == 4) {
            numbers.current = operate(previousOperator, numbers.previous, numbers.current)
            previousOperator = ''
            numbers.store()
            stage = 2;
        }
        // DISPLAY
        display.textContent = `${numbers.previous} ${operator} ${numbers.current || '0'}`
    
        console.log(stage)
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