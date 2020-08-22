import Big from './big.mjs'; //external library to handle arbitrary numeric precision in JS

/*
Javascript doesn't operate on decimalized numbers with enough precision to even construct an initial number, 
so for accurate math we need to pass around nonDecimalized numbers and keep track of the decimalized value, 
this implementation may need refactoring once start implementing operators
*/
var numberConstructor = new Big(0);
var decimalPlace = 0;
var displayDigitCount = 0;
var decimalDisplayString;
var maxDisplayLength = 10; //arbitrarily chosen

function clearButton() {
    numberConstructor = new Big(0);
    decimalPlace = 0;
    displayDigitCount = 0;
    document.getElementById("output").innerHTML = numberConstructor;
}

function numberButton(button) {
    if((displayDigitCount === 0 && button === 0) || displayDigitCount === maxDisplayLength){
        console.log(displayDigitCount);
        return;
    } else {
        displayDigitCount++;
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
        document.getElementById("output").innerHTML = decimalDisplayString;
    }
}

function decimalButton() {
    if (decimalPlace === 0) {
        if (displayDigitCount === 0){
            displayDigitCount++;
            console.log(displayDigitCount);
        }
        decimalPlace = 1;
        decimalDisplayString = numberConstructor.toString().concat("."); // appropriately display trailing decimal
        document.getElementById("output").innerHTML = decimalDisplayString;
    }
}

export {clearButton, numberButton, decimalButton};