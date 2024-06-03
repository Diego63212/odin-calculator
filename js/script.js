const display = document.querySelector('.display');
const calculatorBtnDiv = document.querySelector('#calculator-buttons');
let operator = '';
let currentOperand = '0';
let previousOperand = '';

// Math operations
let add = () => +previousOperand + +currentOperand;
let subtract = () => previousOperand - currentOperand;
let multiply = () => previousOperand * currentOperand;
let divide = () => previousOperand / currentOperand;
let round = result => Math.round(result * 1000) / 1000; // Rounds the number to three decimal places
// Select correct math operation and store its result
function operate() {
    let result;
    if (operator === '+') result = add();
    if (operator === '-') result = subtract();
    if (operator === '*') result = multiply();
    if (operator === '/' && currentOperand > '0') result = divide(); // Don't compute division by zero
    modularClear();
    currentOperand = (result) ? round(result) : 'ERROR'; // Return error on empty result (division by zero)
};
// Saves number or result for future use
function storeOperand() {
    previousOperand = currentOperand;
    modularClear(true);
};
// Clear variables with optional saving
function modularClear(saveStoredOperand) {
    if (!saveStoredOperand) previousOperand = ''; // Saves result when chaining math operations
    operator = '';
    currentOperand = '0';
};
// Makes sure expected action is taken when a user clicks and chains calculations
function operatorCheck(e) {
    if (!(currentOperand === '0') && previousOperand) {
        operate();
        storeOperand();
    } else if (!previousOperand) {
        storeOperand();
    };
    operator = e.target.textContent;
};
// Listen to bubbling click events from buttons with classes inside this div. Update display after interaction
calculatorBtnDiv.addEventListener('click', (e) => {
    if (currentOperand === 'ERROR' || previousOperand === 'ERROR') modularClear();
    if (e.target.classList.contains('number')) {
        if (currentOperand === '0') currentOperand = '';
        currentOperand += e.target.textContent;
    };
    if (e.target.classList.contains('decimal')) {
        if (!currentOperand.includes('.')) currentOperand += '.';
    };
    if (e.target.classList.contains('operator')) operatorCheck(e);
    if (e.target.classList.contains('operate') && previousOperand) operate();
    if (e.target.classList.contains('clear')) modularClear();
    if (e.target.classList.contains('backspace')) currentOperand = currentOperand.slice(0, currentOperand.length - 1);
    if (currentOperand === '') currentOperand = '0'; // Safeguard against invalid operations
    display.textContent = `${previousOperand} ${operator} ${currentOperand}`;
});
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