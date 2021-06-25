

let primes = [2];
//const limitDown = 2
//const limitUp = 100000000;
let = Array();
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
let utolsoSzamjegyetMegelozoSzamjegyEloszlas = Array();
for (let i = 0; i < 10; i++) {
    utolsoSzamjegyetMegelozoSzamjegyEloszlas[i] = Array();
    for (let j = 0; j < 10; j++) {
        utolsoSzamjegyetMegelozoSzamjegyEloszlas[i][j] = 0;
    }
}

let matrix = Array();
for (let i = 0; i < 10; i++) {
    matrix[i] = Array();
    for (let j = 0; j < 10; j++) {
        matrix[i][j] = 9;
    }
}
console.log(matrix);


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

primeStrings = Array();
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
        let content = `(${i}) ${primes[i]}`
        mySpan1.innerHTML = content;
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
    document.querySelector("#distributionCanvas").width = occurrenceOfDistances.length * 5;
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
//sumOfNumbersArray: az ennyiedik indexű prím számjegyeinek az összege ennyi
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
    newTr.innerHTML = "";
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

let testing = false;
let osszegetKovetoEloszlasArray = Array();
const osszegetKovetoEloszlasFunction = function () {
    osszegetKovetoEloszlasArray = Array();

    let myGap = 1;
    if (testing == false) {
        myGap = document.querySelector("#selectForOsszegetKovetoEloszlas").value;
        myGap = parseInt(myGap);
        console.log(myGap)
    }

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
    if (testing == false) {
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
    };
}

let result = 0;
const test = function (first, second) {
    testing = true;
    osszegetKovetoEloszlasArray = Array();
    osszegetKovetoEloszlasFunction();
    result = 0;
    for (let i = 0; i < 10; i++) {
        let a = osszegetKovetoEloszlasArray[first][i];
        if (a == "-") { a = 0 };
        a = parseInt(a);
        let b = osszegetKovetoEloszlasArray[i][second];
        if (b == "-") { b = 0 };
        b = parseInt(b);
        console.log(a);
        console.log(b);
        console.log("a*b=", a * b)
        result += a * b / 100;
    }
    console.log(result);
    testing = false;
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#buttonForUtolsoSzamjegyetMegelozoSzamjegyEloszlas").addEventListener('click', utolsoSzamjegyetMegelozoSzamjegyEloszlasFunction)
})

const place3 = document.querySelector("#TheadForUtolsoSzamjegyetMegelozoSzamjegyEloszlas");
newTr3 = document.createElement("tr");
place3.appendChild(newTr3);
for (let i = 0; i < 11; i++) {
    let myTd = document.createElement("td");
    newTr3.appendChild(myTd);
    if (i == 0) { myTd.innerHTML = "" }
    else { myTd.innerHTML = i - 1 }
}

const utolsoSzamjegyetMegelozoSzamjegyEloszlasFunction = function () {
    let myNumber1 = document.querySelector("#selectForUtolsoSzamjegyetMegelozoSzamjegyEloszlas1").value;
    let myNumber2 = document.querySelector("#selectForUtolsoSzamjegyetMegelozoSzamjegyEloszlas2").value;
    myNumber1 = parseInt(myNumber1);
    myNumber2 = parseInt(myNumber2);
    let myMax = Math.max(myNumber1, myNumber2)
    newPrimeStrings = primeStrings.filter((value) => { if (value.length > myMax - 1) { return true } })
    szamjegyEloszlasFunction(myNumber1, myNumber2, newPrimeStrings);
    szamjegyEloszlasInPercent();
    //?????????????????
    eloszlastKiir(utolsoSzamjegyetMegelozoSzamjegyEloszlas)
}


const szamjegyEloszlasFunction = function (myNumber1, myNumber2, newPrimeStrings) {

    //index: mi a prím a hátulról myNumber1-edik számjegye;
    //belső Array indexe: abban az esetben mi a prím a hátulról myNumber2-edik számjegye;

    console.log(utolsoSzamjegyetMegelozoSzamjegyEloszlas)
    console.table(utolsoSzamjegyetMegelozoSzamjegyEloszlas)

    newPrimeStrings.forEach((value) => {
        utolsoSzamjegyetMegelozoSzamjegyEloszlas[value[value.length - myNumber1]][value[value.length - myNumber2]] += 1;
    })

    console.log(utolsoSzamjegyetMegelozoSzamjegyEloszlas)
    console.table(utolsoSzamjegyetMegelozoSzamjegyEloszlas)

    return utolsoSzamjegyetMegelozoSzamjegyEloszlas;
}

const szamjegyEloszlasInPercent = function () {
    myLengths = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    utolsoSzamjegyetMegelozoSzamjegyEloszlas.forEach((value, index) => {
        let myLength = 0;
        value.forEach((value) => { myLength += value })
        myLengths[index] = myLength;

    })

    utolsoSzamjegyetMegelozoSzamjegyEloszlas.forEach((value, index, array) => {
        array[index] = value.map(item =>
            myLengths[index] == 0 ? 0 : Number((item * 100 / myLengths[index]).toFixed(5)))
    })
}

const eloszlastKiir = function (utolsoSzamjegyetMegelozoSzamjegyEloszlas) {
    const myTbody = document.querySelector("#TbodyForUtolsoSzamjegyetMegelozoSzamjegyEloszlas")
    myTbody.innerHTML = "";
    let content = "";
    utolsoSzamjegyetMegelozoSzamjegyEloszlas.forEach((value, index, array) => {
        content += `
        <tr><td>${index}</td>
        `
        let min = Math.min(...array[index]);
        let max = Math.max(...array[index]);
        value.forEach((value) => {
            content += `
            <td
            ${value == min && value != 0 ? "style='color:green'" : ''}
            ${value == max && value != 0 ? "style='color:red'" : ''}
            >${value} %</td>
            `
        })
        content += `<tr>`
        myTbody.innerHTML = content;
    })
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#buttonForSzamjegyetMegelozoMaximumokHol")
        .addEventListener('click', szamjegyetMegelozoMaximumokHolFunction)
})

content = "<tr>"
for (let i = 0; i < 10; i++) {
    content += `<td>${i}</td>`
}
content += "</tr>"
document.querySelector("#theadForDistributionOfExtreme").innerHTML = content;

let allExtremeArray = Array();
let extremeArray = Array();
let myDigit = "";
let allEloszlasNumber = Array();
let allEloszlasPercent = Array();
let digitEloszlasPercent = Array();
const szamjegyetMegelozoMaximumokHolFunction = function () {
    let myNumber1 = document.querySelector("#selectForSzamjegyetMegelozoMaximumokHol1").value;
    myNumber1 = parseInt(myNumber1);
    let myNumber2 = document.querySelector("#selectForSzamjegyetMegelozoMaximumokHol4").value;
    myNumber2 = parseInt(myNumber2);
    let intervalLength = document.querySelector("#hosszInputForSzamjegyetMegelozoMaximumokHol3").value;
    intervalLength = parseInt(intervalLength);
    myDigit = document.querySelector("#selectForSzamjegyetMegelozoMaximumokHol2").value

    if (intervalLength > primes.length) {
        alert(`A hosszúság max. értéke ${primes.length} lehet.`);
        document.querySelector("#hosszInputForSzamjegyetMegelozoMaximumokHol3").value = primes.length;
    }
    const howManyInterval = Math.floor(primes.length / intervalLength);

    console.log("intervalLength", intervalLength);
    console.log("howManyInterval", howManyInterval)

    const myMax = Math.max(myNumber1, myNumber2);
    const primes2 = primes.filter((value) => { if (value >= 10 ** myMax) { return true } })

    extremeArray = Array();
    let extremePercentArray = Array();
    myDigitEloszlas = Array();
    myDigitEloszlas2 = Array();
    allEloszlasNumber = Array();
    allEloszlasPercent = Array();
    digitEloszlasPercent = Array();

    for (let i = 0; i < howManyInterval; i++) {
        const first = i * intervalLength;
        const last = (i + 1) * intervalLength - 1;
        console.log(first);
        console.log(last);
        myPrimes = primes2.filter((value, index) => {
            if (index >= first && index <= last) { return true }
        })
        let myPrimeStrings = Array();
        myPrimes.forEach((value, index) => { myPrimeStrings[index] = value.toString(numberSystem) });

        for (let k = 0; k < 10; k++) {
            for (let j = 0; j < 10; j++) {
                utolsoSzamjegyetMegelozoSzamjegyEloszlas[k][j] = 0;
            }
        }

        //ellenőrzés:
        if (i == 2) {
            for (let k = 0; k < 10; k++) {
                for (let j = 0; j < 10; j++) {
                    matrix[k][j] = utolsoSzamjegyetMegelozoSzamjegyEloszlas[k][j];
                }
            }
        }

        console.log("utolsoSzamjegyetMegelozoSzamjegyEloszlas");
        console.log(utolsoSzamjegyetMegelozoSzamjegyEloszlas)
        console.table(utolsoSzamjegyetMegelozoSzamjegyEloszlas)
        utolsoSzamjegyetMegelozoSzamjegyEloszlas = szamjegyEloszlasFunction(myNumber1, myNumber2, myPrimeStrings);
        console.log("utolsoSzamjegyetMegelozoSzamjegyEloszlas");
        console.log(utolsoSzamjegyetMegelozoSzamjegyEloszlas)
        console.table(utolsoSzamjegyetMegelozoSzamjegyEloszlas)

        saveAllEloszlasNumber();

        let myArray = utolsoSzamjegyetMegelozoSzamjegyEloszlas[myDigit].slice();
        szamjegyEloszlasInPercent();
        saveAllEloszlasPercent();
        saveDigitEloszlasPercent(myArray);
        let myPercentArray = utolsoSzamjegyetMegelozoSzamjegyEloszlas[myDigit].slice();
        //let myExtreme = 0;
        if (document.querySelector("#radioMax").checked == true) {
            myExtreme = Math.max(...myArray);
            myExtremeIndex = myArray.indexOf(myExtreme);
            myExtremePercent = myPercentArray[myExtremeIndex];
            extremeSum = 0;
            myArray.forEach((value) => { extremeSum += value })
        }
        if (document.querySelector("#radioMin").checked == true) {
            myExtreme = Math.min(...myArray);
            myExtremeIndex = myArray.indexOf(myExtreme);
            myExtremePercent = myPercentArray[myExtremeIndex];
            extremeSum = 0;
            myArray.forEach((value) => { extremeSum += value })
        }
        //mi a szám - mi a százaléka - hányszor fordul elő
        //- összes szám összes előfordulásának az összege
        let myLittleArray = [myExtremeIndex, myExtremePercent, myExtreme, extremeSum]
        extremeArray.push(myLittleArray);

        let content = "";
        extremeArray.forEach((value) => {
            content += `${value[0]}, <span>`
        })
        document.querySelector("#extremeEloszlas").innerHTML = content;
        console.log(extremeArray);
    }

    szamjegyetMegelozoMaximumokCanvasFunction();

    distributionOfExtremeArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    extremeArray.forEach((value, index) => {
        distributionOfExtremeArray[value[0]] += 1;
    })

    let sumOfExtremePercentes = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let sumOfExtremePercentesLength = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    extremeArray.forEach((value) => {
        index = 0;
        for (let i = 0; i < 10; i++) {
            if (value[0] == i) {
                sumOfExtremePercentes[i] += value[1];
                sumOfExtremePercentesLength[i] += 1;
            }
        }
    })
    let finalPercentes = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    sumOfExtremePercentes.forEach((value, index) => {
        finalPercentes[index] =
            (value / (sumOfExtremePercentesLength[index] == 0 ? 1 : sumOfExtremePercentesLength[index])).toFixed(2);
    })
    console.log(finalPercentes);
    //DoE DistributionOfExtreme
    let DoEcontent = "";
    DoEcontent += "<tr>"
    distributionOfExtremeArray.forEach((value) => {
        DoEcontent += `<td>${value}</td>`
    })
    DoEcontent += "</tr><tr>";
    finalPercentes.forEach((value) => {
        DoEcontent += `<td>${value} %</td>`

    })
    DoEcontent += "<tr>"

    let myArray2 = Array();
    myArray2 = tablazatNegyedikSora(myNumber1);

    DoEcontent += "<tr>"
    myArray2.forEach((value) => {
        DoEcontent += `<td>${value} %</td>`
    })

    document.querySelector("#tbodyForDistributionOfExtreme").innerHTML = DoEcontent;
}

const szamjegyetMegelozoMaximumokCanvasFunction = function () {

    document.querySelector("#szamjegyetMegelozoMaximumokCanvas").width = `${extremeArray.length * 3}`


    down = 100
    let c = document.querySelector("#szamjegyetMegelozoMaximumokCanvas");
    let ctx = c.getContext("2d");
    ctx.lineWidth = 2;
    ctx.beginPath();
    extremeArray.forEach((value, index) => {
        ctx.moveTo(3 * index, 100);
        ctx.lineTo(3 * index, 100 - 10 * value[0]);
        ctx.stroke();
    })
    //ctx.closePath();
}

const tablazatNegyedikSora = function (myNumber1) {

    let myArray = Array()
    for (let i = 0; i < 10; i++) {
        myArray[myArray.length] = percentFunction2(myNumber1, i)
    }
    return myArray;
}

const saveAllEloszlasNumber = function () {
    let myArray = Array();
    allEloszlasNumber[allEloszlasNumber.length] = myArray;
    for (let i = 0; i < 10; i++) {
        myArray[i] = Array();
        for (let j = 0; j < 10; j++) {
            myArray[i][j] = utolsoSzamjegyetMegelozoSzamjegyEloszlas[i][j];
        }
    }
}

const saveAllEloszlasPercent = function () {
    let myArray = Array();
    allEloszlasPercent[allEloszlasPercent.length] = myArray;
    for (let i = 0; i < 10; i++) {
        myArray[i] = Array();
        for (let j = 0; j < 10; j++) {
            myArray[i][j] = utolsoSzamjegyetMegelozoSzamjegyEloszlas[i][j];
        }
    }
}

const saveDigitEloszlasPercent = function (myArray) {
    let myArray2 = Array();
    digitEloszlasPercent[allEloszlasPercent.length] = myArray2;
    for (let i = 0; i < 10; i++) {
        myArray2[i] = myArray[i];
    }
}

//ellenőrzés
extremeArrayNumber = Array();
const percentFunction = function (number) {
    extremeArrayNumber = Array();
    let mySum = 0;
    extremeArrayNumber = extremeArray.filter((value) => { if (value[0] == number) { return true } })
    extremeArrayNumber.forEach((value) => {
        mySum += value[1];
    })
    mySum = (mySum / extremeArrayNumber.length).toFixed(2);
    console.log(mySum)
}

const percentFunction2 = function (number1, number2) {
    extremeArrayNumber = Array();
    let mySum = 0;
    allEloszlasPercent.forEach((value) => {
        mySum += value[number1][number2]
    })
    mySum = (mySum / allEloszlasPercent.length).toFixed(2);
    console.log(mySum)
    return mySum;
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#buttonForHatulrolAHanyadikSzamjegy")
        .addEventListener('click', hatulrolAHanyadikSzamjegyFunction)
})

let primesHHSz = Array();
let myGapsArray = Array();
let myMax = 0;
let primeStrings2 = Array();
const hatulrolAHanyadikSzamjegyFunction = function () {
    let myNumber1 = document.querySelector("#selectForHatulrolAHanyadikSzamjegy").value;
    myNumber1 = parseInt(myNumber1);
    let myNumber2 = document.querySelector("#selectForHatulrolAHanyadikSzamjegy2").value;
    myNumber2 = parseInt(myNumber2);
    primeStrings2 = primeStrings.filter((value) => { if (value.length > myNumber1 - 1) { return true } });
    console.log(primeStrings2);
    primesHHSz = Array();

    let myGap = 0;
    myGapsArray = Array();
    primeStrings2.forEach((value) => {
        if (value[value.length - myNumber1] == myNumber2) {
            myGapsArray.push(myGap); myGap = 0;
            primesHHSz.push(value)
        }
        else {
            myGap += 1;
        }
    })

    console.log(myGapsArray);

    myMax = Math.max(...myGapsArray)
    document.querySelector("#span1").innerHTML = myNumber1;
    document.querySelector("#span2").innerHTML = primeStrings2.length;
    let myPercent = (myGapsArray.length * 100 / primeStrings2.length).toFixed(2);
    document.querySelector("#span3").innerHTML = `${myPercent} %`;
    document.querySelector("#span4").innerHTML = myMax;

    hatulrolAHanyadikSzamjegyArrayFunction();
    hatulrolAHanyadikSzamjegyCanvasFunction();
    hatulrolAHanyadikSzamjegyEloszlasFunction();
    hanyPrimEgymasMellettFunction();
}

let hatulrolAHanyadikSzamjegyEloszlas = Array();
const hatulrolAHanyadikSzamjegyEloszlasFunction = function () {
    for (let i = 0; i < myMax + 1; i++) {
        hatulrolAHanyadikSzamjegyEloszlas[i] = 0;
    }
    myGapsArray.forEach((value) => {
        hatulrolAHanyadikSzamjegyEloszlas[value] += 1;
    })
    hatulrolAHanyadikSzamjegyEloszlas2 = hatulrolAHanyadikSzamjegyEloszlas.slice(0);
    hatulrolAHanyadikSzamjegyEloszlas2.shift();
    let myMax2 = Math.max(...hatulrolAHanyadikSzamjegyEloszlas2);
    let place = document.querySelector("#divForHatulrolAHanyadikSzamjegyEloszlasArray");
    let content = "";
    hatulrolAHanyadikSzamjegyEloszlas.forEach((value, index) => {
        content += `<span
        ${value == 0 ? ' style="color:green" ' : ''}
        ${value == myMax2 ? ' style="color:red" ' : ''}
        >(${index}) ${value}, </span>`
    })
    place.innerHTML = content;


    document.querySelector("#canvasHatulrolAHanyadikSzamjegyEloszlas").width = hatulrolAHanyadikSzamjegyEloszlas2.length * 5;
    document.querySelector("#canvasHatulrolAHanyadikSzamjegyEloszlas").height = myMax2;

    let c = document.querySelector("#canvasHatulrolAHanyadikSzamjegyEloszlas");
    let ctx = c.getContext("2d");
    ctx.lineWidth = 5;
    ctx.beginPath();
    hatulrolAHanyadikSzamjegyEloszlas2.forEach((value, index) => {
        ctx.moveTo(index * 5, myMax2);
        ctx.lineTo(index * 5, myMax2 - value);
        ctx.stroke();
    })

}

let hanyPrimEgymasMellettArray = Array();
const hanyPrimEgymasMellettFunction = function () {
    let howManyNeighbour = 0;
    let howLongTheGap = 0;
    myGapsArray.forEach((value, index) => {
        if (value == 0) {
            if (howLongTheGap != 0) {
                hanyPrimEgymasMellettArray.push(howLongTheGap);
            }
            howLongTheGap = 0;
            howManyNeighbour += 1;

        }
        else {
            if (howManyNeighbour != 0) { hanyPrimEgymasMellettArray.push(howManyNeighbour) }
            howManyNeighbour = 0;
            howLongTheGap += value;
        }
    })
    console.log(hanyPrimEgymasMellettArray);

    let place = document.querySelector("#divForHanyPrimEgymasMellettArray");
    content = "";
    hanyPrimEgymasMellettArray.forEach((value, index) => {
        content += `<span
        ${index % 2 == 0 ? " style='color:grey' " : " style='color:black' "}
        >${value}, </span>`
    })
    place.innerHTML = content;

    let myMax2 = Math.max(...hanyPrimEgymasMellettArray);
    document.querySelector("#canvasForHanyPrimEgymasMellett").width = hanyPrimEgymasMellettArray.length * 5;
    document.querySelector("#canvasForHanyPrimEgymasMellett").height = myMax2;

    let c = document.querySelector("#canvasForHanyPrimEgymasMellett");
    let ctx = c.getContext("2d");
    ctx.lineWidth = 5;
    hanyPrimEgymasMellettArray.forEach((value, index) => {
        ctx.beginPath();
        ctx.moveTo(index * 5, myMax2);
        ctx.lineTo(index * 5, myMax2 - value);
        if (index % 2 == 0) { ctx.strokeStyle = "grey" }
        if (index % 2 == 1) { ctx.strokeStyle = "black" }
        ctx.stroke();
    })

    let myPrimesContent = "";
    primeStrings2.forEach((value, index) => {
        myPrimesContent += `<span
        ${primesHHSz.includes(value) ? " style='color:black' " : " style='color:grey' "}
        >(${index + 1}) ${value}, </span>`
    })
    document.querySelector("#myPrimes").innerHTML = myPrimesContent;
}

const hatulrolAHanyadikSzamjegyArrayFunction = function () {
    let place = document.querySelector("#divForHatulrolAHanyadikSzamjegyArray");
    let content = "";
    myGapsArray.forEach((value, index) => {
        content += `<span
        ${value != 0 ? " style='color:red' " : ""}
        >(${index}) ${value}, </span>`
    })
    place.innerHTML = content;
}

const hatulrolAHanyadikSzamjegyCanvasFunction = function () {
    console.log(myGapsArray);
    let limit = Math.min(myGapsArray.length, 5000);
    let myMax = Math.max(...myGapsArray);
    document.querySelector("#canvasForHatulrolAHanyadikSzamjegy").width = `${limit}`
    document.querySelector("#canvasForHatulrolAHanyadikSzamjegy").height = `${myMax}`

    let c = document.querySelector("#canvasForHatulrolAHanyadikSzamjegy");
    let ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.lineWidth = 2;
    //myGapsArray.forEach((value, index) => {
    for (let index = 0; index < limit; index++) {
        ctx.moveTo(index, myMax);
        ctx.lineTo(index, myMax - myGapsArray[index]);
        ctx.stroke();
    }
    ctx.moveTo(0, myMax);
    ctx.lineTo(0, 0);
    ctx.stroke();

    //})
    //ctx.closePath();
}

const congruence = function (number) {
    let congruenceDistribution = Array();
    for (let i = 0; i < number; i++) {
        congruenceDistribution[i] = 0;
    }
    primes.forEach((value) => {
        congruenceDistribution[value % number] += 1;
    })

    console.table(congruenceDistribution)
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#congruenceButton")
        .addEventListener('click', congruence2)
})

const congruence2 = function () {
    let number = document.querySelector("#congruenceInput").value;
    number = parseInt(number);
    let congruenceDistribution = Array();
    for (let i = 0; i < number; i++) {
        congruenceDistribution[i] = Array();
        for (let j = 0; j < number; j++) {
            congruenceDistribution[i][j] = 0;
        }
    }
    for (let i = 0; i < primes.length - 1; i++) {
        congruenceDistribution[primes[i] % number][primes[i + 1] % number] += 1;
    }
    for (let i = 0; i < congruenceDistribution.length; i++) {
        let sum = 0;
        congruenceDistribution[i].forEach((value) => {
            sum += value;
        })
        congruenceDistribution[i].forEach((value, index, array) => {
            if(document.querySelector("#notPercent").checked==true){array[index] = value}
            if(document.querySelector("#percent").checked==true){
                array[index] = Number((value * 100 / sum).toFixed(2))}
        })
    }
    console.table(congruenceDistribution)
    let content = "";
    content += `<tr><td></td>`
    congruenceDistribution.forEach((value, index) => {
        content += `<td>${index}</td>`
    })
    content += `</tr>`
    congruenceDistribution.forEach((value, index) => {
        let myMax = Math.max(...value);
        content += `<tr><td>${index}</td>`
        value.forEach((value) => {
            content += `<td
            ${value == myMax ? " style='color:red' " : ""}
            ${value == 0 ? " style='color:grey' " : ""}
            >${value}</td>`
        })
        content += `</tr>`
    })
    document.querySelector("#congruenceTbody").innerHTML = content;

    let myMaxArray = Array();
    congruenceDistribution.forEach((value, index) => {
        myMaxArray[index] = value.indexOf(Math.max(...value))
    })
    console.log(myMaxArray)
    let orderArray = Array();
    let orderArray2 = Array();
    orderArray[0] = myMaxArray[0]
    myMaxArray.forEach((value, index) => {
        orderArray[index + 1] = myMaxArray[orderArray[index]]
    })
    console.log(orderArray)
    myMaxArray.forEach((value, index) => {
        orderArray2[index] = value;
    })
    console.log(orderArray2);
    let content2 = "";
    orderArray2.forEach((value, index) => {
        content2 += `
        <span>(${index}) ${value}, </span>
        `
    })
    document.querySelector("#pForOrderArray").innerHTML = content2;

}

let congruenceDistribution = Array();
const congruence3 = function (number, limit) {
    //az adott sorszámú (limit) prím az adott számra (number) milyen maradékot ad
    //ezen számra ezen maradékot adó prímek után következő prímek
    //a legnagyobb százalékban ezt a maradékot adják: a visszatérési érték
    congruenceDistribution = Array();
    for (let i = 0; i < number; i++) {
        congruenceDistribution[i] = 0;
    }
    let remainder = primes[limit] % number;
    for (let i = 0; i < limit - 1; i++) {
        if (primes[i] % number == remainder)
            congruenceDistribution[primes[i + 1] % number] += 1;
    }
    let sum = 0;
    congruenceDistribution.forEach((value) => {
        sum += value;
    })
    congruenceDistribution.forEach((value, index, array) => {
        array[index] = (value * 100 / sum).toFixed(2)
    })

    congruenceDistribution = congruenceDistribution.map(item => Number(item));
    let myMax = Math.max(...congruenceDistribution);
    let myRemainder = congruenceDistribution.indexOf(myMax)

    //console.table(congruenceDistribution)
    //console.log(myMax);
    //console.log(myRemainder)
    return myRemainder;
}

const congruenceResult = function (limit) {
    congruenceResultArray = Array();
    let myLimit = Math.floor(Math.sqrt(limit))
    for (let i = 0; i < myLimit; i++) {
        let myRemainder = congruence3(i, limit);
        let myPrime = primes[i];
        let myArray = [myPrime, myRemainder];
        congruenceResultArray[i] = myArray;

    }
    console.table(congruenceResultArray)
}









