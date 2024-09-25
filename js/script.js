const display = document.querySelector('.display');
const calculatorBtnDiv = document.querySelector('#calculator-buttons');
const hasClass = (e, className) => e.target.classList.contains(className); // Check element class short version
let operator = previousOperand = currentOperand = '';
// Math operations
const add = () => +previousOperand + +currentOperand;  // Prevent string concatenation
const subtract = () => previousOperand - currentOperand;
const multiply = () => previousOperand * currentOperand;
const divide = () => (currentOperand !== '0') ? previousOperand / currentOperand : 'ERROR'; // Don't compute division by zero
const round = result => (Math.round(result * 1000) / 1000).toString(); // Rounds the number to three decimal places
// Select correct math operation and store its result
function getResult() {
    let result;
    if (operator === '+') result = add();
    if (operator === '-') result = subtract();
    if (operator === '*') result = multiply();
    if (operator === '/') result = divide();
    smartClear();
    return (result !== 'ERROR') ? round(result) : result; // Round the result only if valid result exists
}
// Clear variables with optional saving for chain operations
function smartClear(saveValue) {
    (saveValue) ? previousOperand = saveValue : previousOperand = '';
    operator = '';
    currentOperand = '0';
}
// Makes sure expected action is taken when a user clicks and chains calculations
function operatorCheck(btn) {
    if (!previousOperand) {
        smartClear(currentOperand);
    } else if (currentOperand !== '0') {
        smartClear(getResult());
    }
    operator = btn.textContent;
}
// Listen to bubbling click events from buttons with classes inside this div.
calculatorBtnDiv.addEventListener('click', (e) => {
    if (currentOperand === 'ERROR') smartClear(); // Clear everything if ERROR is in one of the variables
    if (hasClass(e, 'number')) {
        (currentOperand !== '0') ? currentOperand += e.target.textContent : currentOperand = e.target.textContent;
    }
    if (hasClass(e, 'backspace')) currentOperand = currentOperand.slice(0, currentOperand.length - 1) || '0';
    if (hasClass(e, 'operator')) operatorCheck(e.target);
    if (hasClass(e, 'decimal') && !currentOperand.includes('.')) currentOperand += '.'; // Add only one decimal point
    if (hasClass(e, 'operate') && previousOperand) currentOperand = getResult();
    if (hasClass(e, 'clear')) smartClear();
    display.textContent = `${previousOperand} ${operator} ${currentOperand}`; // Update display after interaction
});
// Uses getElementById because it doesn't return an error on invalid id like querySelector
document.addEventListener('keydown', e => {
    const element = document.getElementById(`kb:${e.key}`);
    if (!element) return;
    if (!(element.classList.contains('active'))) element.classList.toggle('active');
    element.click();
});
document.addEventListener('keyup', e => {
    const element = document.getElementById(`kb:${e.key}`);
    if (element.classList.contains('active')) element.classList.toggle('active');
});