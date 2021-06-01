
let primes = [2];
//const limitDown = 2
//const limitUp = 100000000;
let primeStrings = Array();
let numbers = Array();
let numbersOfChosenDigit = Array();
numberSystem = 10;
for (let i = 0; i < numberSystem; i++) { numbers[i] = 0; numbersOfChosenDigit[i] = 0 }
//hátulról a hányadik számjegy
chosenDigit = 3;
let percentages = Array();
let percentagesCD = Array();
let allNumbers = 0;
let allChosenDigit = 0;
let chosenDigitString = 0;

let limitDown = document.querySelector("#startNumber").value;
limitDown = Number(limitDown);
let limitUp = document.querySelector("#finishNumber").value;
limitUp = Number(limitUp);
document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#finishNumber").addEventListener("input", limitUpInputFunction)
})
let limitUpInputFunction = function () {
    limitUp = document.querySelector("#finishNumber").value;
    limitUp = Number(limitUp);
    if (limitUp > 10000000) {
        alert("max. 10 000 000; magasabb értéknél 'out of memory' várható");
        document.querySelector("#finishNumber").value = 10000000;
    }

}

const searchingPrimes = function () {
    timeStart = new Date();
    let limitDown = document.querySelector("#startNumber").value;
    limitDown = Number(limitDown);
    let limitUp = document.querySelector("#finishNumber").value;
    limitUp = Number(limitUp);

    primes = [2];
    primeStrings = Array();
    numbers = Array();
    numbersOfChosenDigit = Array();
    let percentages = Array();
    let percentagesCD = Array();
    let allNumbers = 0;
    let allChosenDigit = 0;
    let chosenDigitString = 0;

    for (let i = 0; i < numberSystem; i++) { numbers[i] = 0; numbersOfChosenDigit[i] = 0 }
    for (let j = limitDown; j < limitUp; j++) {
        myNumber = j;
        myRoot = Math.ceil(Math.sqrt(myNumber))
        thisIsPrime = true;

        /*for (let i = 2; i <myRoot+1; i++) {
            remainder = myNumber %i;
            if (remainder == 0) { thisIsPrime = false;break}
        }*/

        for (let i = 0; i < primes.length; i++) {
            remainder = myNumber % primes[i];
            if (remainder == 0) { thisIsPrime = false; break }
            if (primes[i] > myRoot + 1) { break }
        }
        if (thisIsPrime == true) {
            primes[primes.length] = myNumber;
        }
    }
    document.querySelector("#numberOfPrimes").innerHTML = primes.length;
    primes.forEach((value, index) => { primeStrings[index] = value.toString(numberSystem) })
    let a = document.querySelector("#firstNumber").checked ? 1 : 0
    let b = document.querySelector("#lastNumber").checked ? 1 : 0
    primeStrings.forEach((value) => {
        for (let k = a; k < value.length - b; k++) {
            let myNumber = parseInt(value[k]);
            numbers[myNumber] += 1;
            allNumbers += 1;
        }
        if (value.length >= chosenDigit) {
            myChosenDigit = value[value.length - chosenDigit];
            numbersOfChosenDigit[myChosenDigit] += 1;
            allChosenDigit += 1;
            chosenDigitString += myChosenDigit;
        }
    })
    numbers.forEach((value, index) => { percentages[index] = (value * 100 / allNumbers).toFixed(2); })

    numbersOfChosenDigit.forEach((value, index) => { percentagesCD[index] = (value * 100 / allChosenDigit).toFixed(2) })

    place = document.querySelector("#allOfThePrimes")
    var sectorArray = Array();
    sectorArray = document.querySelectorAll("#allOfThePrimes span")
    if (sectorArray.length > 0) {
        for (let i = 0; i < sectorArray.length; i++) {
            place.removeChild(sectorArray[i])
        }
    }
    area = document.querySelector("#startingTd")
    sector2 = document.querySelectorAll("#startingTd td")
    if (sector2.length > 0) {
        for (let i = 0; i < sector2.length; i++) {
            area.removeChild(sector2[i])
        }
    }

    for (let i = 0; i < primes.length; i++) {
        mySpan1 = document.createElement("span");
        mySpan1.innerHTML = primes[i];
        place.appendChild(mySpan1);

        mySpan2 = document.createElement("span");
        mySpan2.innerHTML = ', ';
        place.appendChild(mySpan2);
    }





    let content = ``;
    for (let i = 0; i < 10; i++) {
        content = `<td>${percentages[i]} %</td>`
        document.querySelector("#startingTd").innerHTML += content
    }




    timeFinish = new Date();
    time = (timeFinish - timeStart) / 1000
    id = "#running-time"
    showTime(time, id);
}

const showTime = function () {
    time = Math.ceil(time);
    sec = time % 60
    minAll = (time - time % 60) / 60;
    min = minAll % 60;
    hour = (minAll - minAll % 60)
    document.querySelector(id).innerHTML = `${hour} óra, ${min} perc, ${sec} mp`;

}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#nextNearestButton").addEventListener("click", nextNearestFunction)
})

let lastDigitNumbers = Array();
for (let i = 0; i < 10; i++) { lastDigitNumbers[i] = 0 }
const nextNearestFunction = function () {
    let allNumber = 0;
    let onlyFour = Array();
    for (let i = 0; i < 10; i++) { lastDigitNumbers[i] = 0 }
    let myLastDigit = document.querySelector("#lastDigit").value;
    myRange = document.querySelector("#howManyNextNearest").value;
    myRange = Number(myRange);
    myLastDigit = Number(myLastDigit);
    primeStrings.forEach((value, index, array) => {
        let valueLastNumber = Number(value[value.length - 1]);
        if (valueLastNumber == myLastDigit && index < primeStrings.length - myRange) {
            let nextLastNumber = Number(array[index + myRange][array[index + myRange].length - 1])
            lastDigitNumbers[nextLastNumber] += 1;
            allNumber += 1;
        }
    })
    onlyFour[0] = lastDigitNumbers[1]; onlyFour[1] = lastDigitNumbers[3];
    onlyFour[2] = lastDigitNumbers[7]; onlyFour[3] = lastDigitNumbers[9];
    let min = Math.min(...onlyFour);
    document.querySelector("#nextNearestTd").innerHTML = "";
    document.querySelector("#nextNearestTd").innerHTML = `
        <td ${lastDigitNumbers[1] == min ? 'class="red"' : ''}>${(lastDigitNumbers[1] * 100 / allNumber).toFixed(2)} %</td>
        <td ${lastDigitNumbers[3] == min ? 'class="red"' : ''}>${(lastDigitNumbers[3] * 100 / allNumber).toFixed(2)} %</td>
        <td ${lastDigitNumbers[7] == min ? 'class="red"' : ''}>${(lastDigitNumbers[7] * 100 / allNumber).toFixed(2)} %</td>
        <td ${lastDigitNumbers[9] == min ? 'class="red"' : ''}>${(lastDigitNumbers[9] * 100 / allNumber).toFixed(2)} %</td>
        `;
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#distanceButton").addEventListener("click", distanceButtonFunction)
})

const distances = Array();
const distanceButtonFunction = function () {
    primes.forEach((value, index, array) => {
        if (index < primes.length - 1) {
            distances[index] = array[index + 1] - value
        }
    })

    div4Distances = document.querySelector("#distancesDiv")
    div4Distances.innerHTML = '';
    let distanceContent = "";
    distances.forEach((value) => {
        distanceContent += `<span>${value},</span> `
    })
    document.querySelector("#distancesDiv").innerHTML = distanceContent

    let max=Math.max(...distances);
    document.querySelector("#distMax").innerHTML=max;
    let occurrenceOfDistances=Array()
    for(let i=0;i<max+1;i++){ occurrenceOfDistances[i]=0}
    distances.forEach((value)=>{
        occurrenceOfDistances[value]+=1;
    })

    let contentDistancesTr1="";
    let contentDistancesTr2="";
    occurrenceOfDistances.forEach((value,index)=>{
        contentDistancesTr1+=`
        <td>${index}</td>
        `
    })
    occurrenceOfDistances.forEach((value,index)=>{
        contentDistancesTr2+=`
        <td>${value}</td>
        `
    })
    
    document.querySelector("#distancesDistributionTr1").innerHTML=contentDistancesTr1
    document.querySelector("#distancesDistributionTr2").innerHTML=contentDistancesTr2
}


