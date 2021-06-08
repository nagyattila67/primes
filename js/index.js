
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
    sumOfNumbersFunction();
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#distanceButton").addEventListener("click", distanceButtonFunction)
})

let occurrenceOfDistances = Array()
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

    let max = Math.max(...distances);
    document.querySelector("#distMax").innerHTML = max;
    occurrenceOfDistances = Array()
    for (let i = 0; i < max + 1; i++) { occurrenceOfDistances[i] = 0 }
    distances.forEach((value) => {
        occurrenceOfDistances[value] += 1;
    })

    let contentDistancesTr1 = "";
    let contentDistancesTr2 = "";
    occurrenceOfDistances.forEach((value, index) => {
        contentDistancesTr1 += `
        <td>${index}</td>
        `
    })
    occurrenceOfDistances.forEach((value, index) => {
        contentDistancesTr2 += `
        <td>${value}</td>
        `
    })

    document.querySelector("#distancesDistributionTr1").innerHTML = contentDistancesTr1
    document.querySelector("#distancesDistributionTr2").innerHTML = contentDistancesTr2
    distancesMaxFunction();
    drawOccurranceGraph();
    checkMonotonityOfOccurrenceOfDistances();
}

let distancesMax = 0;
const distancesMaxFunction = function () {
    for (let i = 0; i < occurrenceOfDistances.length; i++) {
        if (occurrenceOfDistances[i] > distancesMax) { distancesMax = occurrenceOfDistances[i] }
    }
}

const drawOccurranceGraph = function () {
    const down = distancesMax;
    document.querySelector("#distributionCanvas").setAttribute("height", `${distancesMax}px`)
    let c = document.querySelector("#distributionCanvas");
    let ctx = c.getContext("2d");
    ctx.lineWidth = 4;
    ctx.beginPath();
    occurrenceOfDistances.forEach((value, index) => {
        ctx.moveTo(5 * index, down);
        ctx.lineTo(5 * index, down - value);
    })
    ctx.stroke();
}

let occurrenceOfDistances2 = Array();
let monotonityOfOccurrenceOfDistances = Array();
const checkMonotonityOfOccurrenceOfDistances = function () {
    occurrenceOfDistances2 = Array();
    occurrenceOfDistances.forEach((value, index) => {
        if (index % 2 == 0) { occurrenceOfDistances2.push(value) }
    })
    monotonityOfOccurrenceOfDistances = Array();
    for (let i = 1; i < occurrenceOfDistances2.length - 1; i++) {
        let myDifference = occurrenceOfDistances2[i + 1] - occurrenceOfDistances2[i];
        //nullával nem oszthatunk, meg kell keresni az utolsó nem 0 értéket
        let lastNotNullValue = occurrenceOfDistances2[i];
        myIndex = i;
        while (lastNotNullValue == 0) {
            myIndex = myIndex - 1;
            lastNotNullValue = occurrenceOfDistances2[myIndex];
        }
        myDifference = myDifference * 100 / lastNotNullValue;
        myDifference = Math.ceil(myDifference);



        monotonityOfOccurrenceOfDistances.push(myDifference)
    }
    let c = document.querySelector("#monotonityOfOccurrenceOfDistancesCanvas");
    let middle = 100;
    document.querySelector("#monotonityOfOccurrenceOfDistancesCanvas").setAttribute("height", `${2 * middle}px`)
    let ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.lineWidth = 4;
    ctx.strokeStyle = 'blue';
    ctx.moveTo(0, -1000);
    ctx.lineTo(0, 1000);
    ctx.stroke();

    ctx.beginPath();
    ctx.lineWidth = 4;
    ctx.strokeStyle = 'black';
    monotonityOfOccurrenceOfDistances.forEach((value, index) => {
        ctx.moveTo(5 * index, middle);
        ctx.lineTo(5 * index, middle + value);
        ctx.stroke();
    })
}

let place = document.querySelector("#tbodyForSumOfNumbers");
let newTr = "";
const buildingTableForSumOfNumbers = function () {
    newTr = document.createElement("tr");
    place.appendChild(newTr);
    for (let i = 0; i < 10; i++) {
        let newTd = document.createElement("td");
        newTr.appendChild(newTd);
        newTd.innerHTML = i;
    }
    newTr = document.createElement("tr");
    place.appendChild(newTr);
}
buildingTableForSumOfNumbers();

let sumOfNumbersArray = Array();
let occurrenceOfSum = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const sumOfNumbersFunction = function () {
    occurrenceOfSum = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    sumOfNumbersArray = Array();

    primes.forEach((value, index) => {
        let onlyOneNumber = false;
        let mySum = 0;
        if (value % 10 == value) { onlyOneNumber = true; mySum = value }
        while (onlyOneNumber == false) {
            mySum += value % 10;
            value = (value - value % 10) / 10;
            if (value % 10 == value) {
                mySum += value;
                if (mySum % 10 == mySum) { onlyOneNumber = true }
                else { value = mySum; mySum = 0 }
            }
        }
        sumOfNumbersArray.push(mySum)
    })
    console.log(sumOfNumbersArray);
    sumOfNumbersArray.forEach((value, index) => {
        occurrenceOfSum[value] += 1;
    })
    newTr.innerHTML="";
    occurrenceOfSum.forEach((value, index) => {
        newTr.innerHTML += `<td>${value}</td>`
    })
}

let place2 = document.querySelector("#TheadForOsszegetKovetoEloszlas");
var newTr2 = document.createElement("tr");
place2.appendChild(newTr2);
for (let i = 0; i < 11; i++) {
    let newTd = document.createElement("td");
    newTr2.appendChild(newTd);
    if (i == 0) { newTd.innerHTML = "" }
    else { newTd.innerHTML = i - 1; }
}
//var newTr2 = document.createElement("tr");
//place2.appendChild(newTr2)

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#buttonForOsszegetKovetoEloszlas").addEventListener('click', osszegetKovetoEloszlasFunction)
})

let osszegetKovetoEloszlasArray = Array();
const osszegetKovetoEloszlasFunction = function () {
    osszegetKovetoEloszlasArray = Array();

    let myGap = document.querySelector("#selectForOsszegetKovetoEloszlas").value;
    myGap = parseInt(myGap);
    console.log(myGap)

    for (let j = 0; j < 10; j++) {
        let myArray = Array();
        for (let i = 0; i < 10; i++) {
            myArray[i] = 0;
        }
        osszegetKovetoEloszlasArray[j] = myArray;
    }
    for (let i = 0; i < sumOfNumbersArray.length - myGap; i++) {
        osszegetKovetoEloszlasArray[sumOfNumbersArray[i]][sumOfNumbersArray[i + myGap]] += 1;
    }

    osszegetKovetoEloszlasArray.forEach((value, index) => {
        value.forEach((value, index, array) => {
            if (array[index] != 0 && occurrenceOfSum[index] != 0) {
                array[index] = (value * 100 / occurrenceOfSum[index]).toFixed(1);
            }
            else { array[index] = "-" }
        })
    })
    let place = document.querySelector("#TbodyForOsszegetKovetoEloszlas")
    let myContent = "";
    for (let i = 0; i < 10; i++) {
        myContent += `<tr><td>${i}</td>`
        for (let j = 0; j < 10; j++) {
            myContent += `<td>${osszegetKovetoEloszlasArray[i][j]}</td>`
        }
        place.innerHTML += `</tr>`
    }
    place.innerHTML = myContent;


}


















