/*
Javascript doesn't operate on decimalized numbers with enough precision to even construct an initial number, 
so for accurate math we need to pass around nonDecimalized numbers and keep track of the decimalized value, 
this implementation may need refactoring once start implementing operators
*/
var nonDecimalizedNumber = 0;
var decimalizedNumber = 0;
var decimalPlace = 0;
var displayDigitCount = 0;
var decimalDisplayString;
var maxDisplayLength = 10; //arbitrarily chosen

function clearButton() {
    nonDecimalizedNumber = 0;
    decimalizedNumber = 0;
    decimalPlace = 0;
    displayDigitCount = 0;
    document.getElementById("output").innerHTML = nonDecimalizedNumber;
}

function numberButton(button) {
    if(displayDigitCount < maxDisplayLength){
        var newNumber = (nonDecimalizedNumber * 10) + button;
        nonDecimalizedNumber = newNumber; 
        displayDigitCount++;
        if (decimalPlace > 0){
            newNumber = newNumber/Math.pow(10, decimalPlace);
            decimalizedNumber = newNumber;
            decimalPlace++;
            decimalDisplayString = decimalDisplayString.concat(button.toString());
            document.getElementById("output").innerHTML = decimalDisplayString;
        } else {
            document.getElementById("output").innerHTML = newNumber;
    }
    }
}

function decimalButton() {
    if (decimalPlace < 1) {
        decimalPlace = 1;
        decimalDisplayString = nonDecimalizedNumber.toString().concat(".");
        document.getElementById("output").innerHTML = decimalDisplayString;
    }
}

export {clearButton, numberButton, decimalButton};