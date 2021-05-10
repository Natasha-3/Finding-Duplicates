let questionsArea = document.querySelector(".questions");
let findButton = document.querySelector(".find-button");
let resultArea = document.querySelector(".result");
let clearButton = document.querySelector(".clear-button");
let caseSensitive = document.getElementById("caseSensitive");

findButton.onclick = function () {
    if (resultArea.innerHTML !== "") return;
    let questionsStr = caseSensitive.checked ?
        questionsArea.value.toLowerCase() : questionsArea.value;
    let questionsArr = createQuestionsArr(questionsStr);
    let duplicatesArr = findDuplicates(questionsArr);
    showResult(duplicatesArr);
};

function createQuestionsArr(str) {
    let arr = str.split(/\n\s*-\s/);
    /*Split method delete only separators, that's why we must delete hyphen and spaces
    from the beginning of the first element and spaces from the end of the last
    element.*/
    arr[0] = arr[0].replace(/\s*-\s/, '');
    arr[arr.length - 1] = arr[arr.length - 1].trim();
    // console.log('Массив содержит ' + arr.length + ' элементов: '
    //     + '/' + arr.join('/') + '/');
    return arr;
}

function findDuplicates(questionsArr) {
    let duplicatesArr = [];
    outer: for (let i = 1; i < questionsArr.length; i++) {
        for (let j = 0; j < i; j++) {
            if (questionsArr[i] === questionsArr[j]) {
                duplicatesArr = createDuplicatesArr(questionsArr[i], duplicatesArr);
                continue outer;
            }
        }
    }
    console.log(duplicatesArr);
    return duplicatesArr;
}

function createDuplicatesArr(duplicate, arr) {
    if (arr.length !== 0) {
        for (let k = 0; k < arr.length; k++) {
            if (duplicate === arr[k].question) {
                arr[k].amount++;
                return arr;
            }
        }
    }
    arr.push({
        question: duplicate,
        amount: 2
    });
    return arr;
}

function showResult(arr) {
    if (arr.length === 0) {
        resultArea.innerHTML = "Дубли не найдены."
    } else {
        resultArea.innerHTML = "Обнаружено " + arr.length + " дублей:" + "<br>";
        for (let i = 0; i < arr.length; i++) {
            resultArea.innerHTML += arr[i].question + " - " + arr[i].amount + "<br>";
        }
    }
}

clearButton.onclick = function() {
    resultArea.innerHTML = "";
    questionsArea.value = "";
};
