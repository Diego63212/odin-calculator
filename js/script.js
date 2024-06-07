const display = document.querySelector('.display');
const calculatorBtnDiv = document.querySelector('#calculator-buttons');
let operator = '';
let currentOperand = '0';
let previousOperand = '';
let hasClass = (e, className) => e.target.classList.contains(className); // Check element class short version
// Math operations
let add = () => +previousOperand + +currentOperand;
let subtract = () => previousOperand - currentOperand;
let multiply = () => previousOperand * currentOperand;
let divide = () => (currentOperand !== '0') ? previousOperand / currentOperand : 'ERROR'; // Don't compute division by zero
let round = result => (Math.round(result * 1000) / 1000).toString(); // Rounds the number to three decimal places
// Select correct math operation and store its result
function getResult() {
    let result;
    if (operator === '+') result = add();
    if (operator === '-') result = subtract();
    if (operator === '*') result = multiply();
    if (operator === '/') result = divide();
    smartClear();
    return (result !== 'ERROR') ? round(result) : result; // Rounds the result only if it is not an error
};
// Clear variables with optional saving for chain operations
function smartClear(saveValue, value) {
    saveValue ? previousOperand = value : previousOperand = '';
    operator = '';
    currentOperand = '0';
};
// Makes sure expected action is taken when a user clicks and chains calculations
function operatorCheck(e) {
    if (!previousOperand) {
        smartClear(true, currentOperand);
    } else if (currentOperand !== '0') {
        smartClear(true, getResult());
    };
    operator = e.target.textContent;
};
// Listen to bubbling click events from buttons with classes inside this div.
calculatorBtnDiv.addEventListener('click', (e) => {
    if (currentOperand === 'ERROR') smartClear(); // Clear everything if ERROR is in one of the variables
    if (hasClass(e, 'number')) {
        (currentOperand !== '0') ? currentOperand += e.target.textContent : currentOperand = e.target.textContent;
    }
    if (hasClass(e, 'decimal') && !currentOperand.includes('.')) currentOperand += '.'; // Add only one decimal point
    if (hasClass(e, 'operator')) operatorCheck(e);
    if (hasClass(e, 'operate') && previousOperand) currentOperand = getResult();
    if (hasClass(e, 'clear')) smartClear();
    if (hasClass(e, 'backspace')) currentOperand = currentOperand.slice(0, currentOperand.length - 1);
    if (currentOperand === '') currentOperand = '0'; // Safeguard against invalid states
    display.textContent = `${previousOperand} ${operator} ${currentOperand}`; // Update display after interaction
});
// Uses getElementById because it doesn't return an error on invalid id like querySelector
document.addEventListener('keydown', e => {
    const element = document.getElementById(`kb:${e.key}`);
    if (element) {
        element.click();
        if (!hasClass(e, 'active')) {
            element.classList.toggle('active');
        };
    };
});

document.addEventListener('keyup', e => {
    const element = document.getElementById(`kb:${e.key}`);
    if (element) element.classList.toggle('active');
});