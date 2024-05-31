const display = document.querySelector('.display');
const calculatorBtnDiv = document.querySelector('#calculator-buttons');
const decimalBtn = document.querySelector('.decimal');
let operator = '';
let currentOperand = '';
let previousOperand = '';

function storeOperand() {
    previousOperand = currentOperand;
    modularClear(true);
};
// Clear
function modularClear(saveStoredOperand) {
    if (!saveStoredOperand) previousOperand = '';
    operator = '';
    currentOperand = '';
};
// Adds a real number zero
function zeroFill() {if (!currentOperand) currentOperand = '0'};

decimalBtn.addEventListener('click', () => {
    if (!currentOperand.includes('.')) {
        zeroFill();
        currentOperand += '.';
    };
});
// Listen to bubbling click events from buttons with classes inside this div. Update display on interaction
calculatorBtnDiv.addEventListener('click', (e) => {
    if (e.target.classList.contains('number')) currentOperand += e.target.textContent;
    if (e.target.classList.contains('operator')) operatorCheck(e);
    if (e.target.classList.contains('operate')) operate();
    if (e.target.classList.contains('clear')) modularClear();
    if (e.target.classList.contains('backspace')) currentOperand = currentOperand.slice(0, currentOperand.length - 1);
    display.textContent = `${previousOperand} ${operator} ${currentOperand || '0'}`;
    if (currentOperand === 'ERROR' || previousOperand === 'ERROR') modularClear();
});
// Makes sure expected action is taken when a user clicks and chains calculations
function operatorCheck(e) {
    if (currentOperand && !previousOperand) {
        storeOperand();
    } else if (!currentOperand && !previousOperand) {
        zeroFill();
        storeOperand();
    } else if (currentOperand && previousOperand) {
        operate();
        storeOperand();
    };
    operator = e.target.textContent;
};
// Select correct math action and store its result
function operate() {
    let result;
    if (previousOperand && operator === '+') result = add();
    if (previousOperand && operator === '-') result = subtract();
    if (previousOperand && operator === '*') result = multiply();
    if (previousOperand && operator === '/') result = divide();
    modularClear();
    if (Number.isFinite(result)) return currentOperand = round(result);
    currentOperand = 'ERROR';
};
// Math
function add() {return +previousOperand + +currentOperand};
function subtract() {return previousOperand - currentOperand};
function multiply() {return previousOperand * currentOperand};
function divide() {return previousOperand / currentOperand};
// Rounds the number to three decimal places
function round(result) {
    return (Math.round(result * 1000) / 1000);
}
// Uses getElementById because it doesn't return an error on invalid id like querySelector
document.addEventListener('keydown', e => {
    const element = document.getElementById(`kb:${e.key}`);
    if (element) {
        element.click();
        if (!element.classList.contains('active')) {
            element.classList.toggle('active');
        };
    };
});

document.addEventListener('keyup', e => {
    const element = document.getElementById(`kb:${e.key}`);
    if (element) element.classList.toggle('active');
});