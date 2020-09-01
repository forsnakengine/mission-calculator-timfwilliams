import Big from './big.mjs'; //external library to handle arbitrary numeric precision in JS

/*
Javascript doesn't operate on decimalized numbers with enough precision to even construct an initial number, 
so for accurate math we need to pass around nonDecimalized numbers and keep track of the decimalized value, 
this implementation may need refactoring once start implementing operators
*/
var numberConstructor;
var storedNumber;
var decimalPlace = 0;
var displayDigitCount = 0;
var decimalDisplayString = "0";

var previousOperation;

const maxDisplayLength = 10; //arbitrarily chosen

function updateDisplay(){
    document.getElementById("output").innerHTML = decimalDisplayString;
}

function clearButton() {
    numberConstructor = undefined;
    storedNumber = undefined;
    decimalPlace = 0;
    displayDigitCount = 0;
    decimalDisplayString = "0";
    previousOperation = undefined;
    updateDisplay();
}

function numberButton(button) {
    if(displayDigitCount === maxDisplayLength){ // don't add digits beyond display length
        return;
    } else if (displayDigitCount === 0 && button === 0) { // handle entering a zero
        numberConstructor = new Big(0);
    } else {
        displayDigitCount++;
        if (!numberConstructor){
            numberConstructor = new Big(0);
        }
        if (decimalPlace === 0){
            numberConstructor = numberConstructor.times(10).plus(button);
            decimalDisplayString = numberConstructor.toString();
        } else if (button === 0){ // appropriately display trailing zeros
            decimalDisplayString = decimalDisplayString.toString().concat("0");
            decimalPlace++
        } else {
            numberConstructor = numberConstructor.plus(button/Math.pow(10, decimalPlace));
            decimalDisplayString = numberConstructor.toString();
            decimalPlace++
        }
        updateDisplay();
    }
}

function decimalButton() {
    if (decimalPlace === 0) {
        if (displayDigitCount === 0){
            displayDigitCount++;
        }
        decimalPlace = 1;
        if (!numberConstructor){
            numberConstructor = new Big(0);
        }
        decimalDisplayString = numberConstructor.toString().concat("."); // appropriately display trailing decimal
        updateDisplay();
    }
}

function calculate(){
    if (previousOperation == "plus") {
        storedNumber = storedNumber.plus(numberConstructor);
    } else if (previousOperation == "minus") {
        storedNumber = storedNumber.minus(numberConstructor);
    } else if (previousOperation == "times") {
        storedNumber = storedNumber.times(numberConstructor);
    } else if (previousOperation == "div") {
        storedNumber = storedNumber.div(numberConstructor);
    } else { //
        console.log("Error: Calculation was triggered without an operation.");
        clearButton();
        return;
    }
    decimalDisplayString = storedNumber.toString();
    updateDisplay();
    decimalPlace = 0;
    displayDigitCount = 0;
    numberConstructor = undefined;
}


function equalButton() {
    if (!previousOperation || !storedNumber || !numberConstructor) {
        return;
    } else {
        calculate();
        previousOperation = undefined;
    }
}

function operatorButton(operation){
    if (!numberConstructor && !storedNumber){
        return;
    } else if (numberConstructor && !storedNumber){
        storedNumber = numberConstructor;
        numberConstructor = undefined;
    } else if (storedNumber && numberConstructor && previousOperation){ //previousOperation should always be true when the others two are
        calculate();
    }
    previousOperation = operation;
}

export {clearButton, numberButton, decimalButton, operatorButton, equalButton};