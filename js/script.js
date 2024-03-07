const display = document.querySelector('.display')
const calculatorBtnDiv = document.querySelector('#calculator-buttons');
const clearBtn = document.querySelector('.clear')
const ansBtn = document.querySelector('.operate')
const backspaceBtn = document.querySelector('.backspace')
const decimalBtn = document.querySelector('.decimal')
const buttonsDiv = document.querySelector('.button-container')

// New loop idea: stages //
/*
Create new variable named current, main text holder that will pass its value to other stages
Create new variables numStage1, numStage2
Create new variable and stage result, branch depending on action: press, clear || press, continue

Pressing buttons should not do anything unless its allowed, buttons should be never disabled
More individual listener to make code more readable
*/
let numStage1 = ''
let numStage2 = ''
let operator = ''
let current = {
    value: '',
    saved: '',
    test: function() {
        this.saved = this.value;
        this.value = '';
    }
};
let stage = 0;
let previousOperator;
let result = false;
clearBtn.addEventListener('click', clearListener)
decimalBtn.addEventListener('click', decimalListener)

calculatorBtnDiv.addEventListener('click', (e) => {
    e.stopPropagation()
    if (e.target.nodeName == 'BUTTON') {
        // STAGE 0 > STAGE 1
        if (stage == 0) {
            current.value = '';
            console.log('STAGE 0>1')
            stage++
        }
        if (e.target.classList.contains('number')) numberListener(e);
    
        // Fill with a 0 if nothing is input
        if (stage == 1) {
            if (!current.value) {
                current.value = '0'
            }
        }
        // Trigger after 0 fill
        if (e.target.classList.contains('operator')) operatorListener(e);
        /* if (e.target.classList.contains('decimal')) decimalListener(e); */
    
        if (stage == 2 && current.value) {
            current.test()
        }
        if (stage == 3) {
        }
        // Chain, move result to current value
        if (stage == 4) {
            console.log('calculate')
            current.value = operate(previousOperator, current.saved, current.value)
            previousOperator = ''
            current.test()
            if (result) {
                stage = 5;
            } else {
                stage = 2;
            }
        }
        if (stage == 5) {
            display.textContent = 'Result: ' + current.saved
        }
    
        // DEBUG DISPLAY
        display.textContent = `${current.saved} ${operator} ${current.value}`
    
        console.log(stage)
    }
})

ansBtn.addEventListener('click', ansListener)

function numberListener(e) { 
    //STAGE 2 > 3
    if (stage == 2) stage++
    // STAGE 1 & 2
    if (stage == 1 || stage == 3) {
        current.value += e.target.textContent;
    }
}

function operatorListener(e) {
    // STAGE 1 > STAGE 2 || STAGE 3 > STAGE 4
    if (current.value) {
        console.log('chain')
        previousOperator = operator
        stage++
    }
    operator = e.target.textContent
}

function decimalListener(e) {
    console.log('decimal', e.type)
    if (!current.value || current.value.includes('.')) {
        console.log('decimal: do nothing')
    } else {
        current.value += e.target.textContent
        console.log('decimal: add period')
    }
}

function ansListener(e) {

    if (operator && current.value && current.saved) {
        stage = 4;
    } else {
        alert('Incomplete expression')
    }
}

function clearListener(e) {
    e.stopPropagation()
    stage = 0
    numStage1 = ''
    numStage2 = ''
    operator = ''
    previousOperator = ''
    current.value = ''
    current.test()
    display.textContent = '0'
}

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
/* document.addEventListener('keyup', event => {
    console.log(event.key)
    if (event.key == 'Escape') clearBtn.click();
    if (event.key == 'Backspace') backspaceBtn.click();
    if (event.key == 'Enter') operateBtn.click();
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
}) */

/* function backspace() {
    if (isFirstNumber) {
        num1 = num1.slice(0, num1.length - 1)
    } else {
        num2 = num2.slice(0, num2.length - 1)
    }
} */