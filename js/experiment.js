const RESULTS = {};

function renderNextPage(nextPage) {
    const body = document.getElementsByTagName("body")[0];
    body.innerHTML = PAGES[nextPage];
    if (nextPage == "typingPage") {
        setupTypingTest();
        typingTimer(10);
    } else if (["animalsPage", "jobsPage", "verbalSPage", "verbalFPage"].includes(nextPage)) {
        expTimer(10);
    } else if (nextPage == "endingPage") {
        sendResults(RESULTS);
    }
}

function saveResultAndNext(category, nextPage) {
    const textAreaString = document.getElementById(category).value;
    RESULTS[category] = textAreaString.split(", ");
    renderNextPage(nextPage);
}

function expTimer(time) {
    const timeLeftHTML = document.getElementById("timeLeft");
    const textArea = document.getElementsByTagName("textarea")[0];
    const button = document.getElementsByTagName("button")[0];
    // when 60s is up, disable textarea input and enable button. 
    let timeLeft = time;
    let downloadTimer = setInterval(function () {
        if (timeLeft <= 0) {
            clearInterval(downloadTimer);
            textArea.disabled = true;
            button.disabled = false;

        }
        timeLeftHTML.innerText = timeLeft;
        timeLeft -= 1;
    }, 1000);

}
function typingTimer(time) {
    const timeLeftHTML = document.getElementById("timeLeft");

    const button = document.getElementsByTagName("button")[0];

    // when 60s is up, disable textarea input and enable button. 
    let timeLeft = time;
    let downloadTimer = setInterval(function () {
        if (timeLeft <= 0) {
            clearInterval(downloadTimer);
            const quoteDisplayElement = document.getElementById('quoteDisplay')
            const quoteInputElement = document.getElementById('typing')
            const arrayQuote = quoteDisplayElement.querySelectorAll('span')
            const arrayValue = quoteInputElement.value.split('')
            quoteInputElement.disabled = true;
            button.disabled = false;
            let correctCount = 0;
            let errorCount = 0;
            arrayQuote.forEach((characterSpan, index) => {
                const character = arrayValue[index]
                if (character == null) {
                    // do nothing
                } else if (character === characterSpan.innerText) {
                    correctCount++
                } else {
                    errorCount++
                }
            })
            const totalCount = correctCount + errorCount;
            const accuracy = Math.round((correctCount / totalCount) * 100)
            quoteInputElement.value = `cpm: ${totalCount}, accuracy: ${accuracy}%`;

        }
        timeLeftHTML.innerText = timeLeft;
        timeLeft -= 1;
    }, 1000);

}
function setupTypingTest() {
    const quoteDisplayElement = document.getElementById('quoteDisplay')
    const button = document.getElementsByTagName("button")[0];
    const quoteInputElement = document.getElementById('typing')
    quoteInputElement.addEventListener('input', () => {
        const arrayQuote = quoteDisplayElement.querySelectorAll('span')
        const arrayValue = quoteInputElement.value.split('')
        let done = true
        arrayQuote.forEach((characterSpan, index) => {
            const character = arrayValue[index]
            if (character == null) {
                characterSpan.classList.remove('correct')
                characterSpan.classList.remove('incorrect')
                done = false
            } else if (character === characterSpan.innerText) {
                characterSpan.classList.add('correct')
                characterSpan.classList.remove('incorrect')
            } else {
                characterSpan.classList.remove('correct')
                characterSpan.classList.add('incorrect')
                done = false
            }
        })

        if (done) {
            quoteInputElement.disabled = true;
            button.disabled = false;
            let correctCount = 0;
            let errorCount = 0;
            arrayQuote.forEach((characterSpan, index) => {
                const character = arrayValue[index]
                if (character == null) {
                    // do nothing
                } else if (character === characterSpan.innerText) {
                    correctCount++
                } else {
                    errorCount++
                }
            })
            const totalCount = correctCount + errorCount;
            const accuracy = Math.round((correctCount / totalCount) * 100)
            quoteInputElement.value = `cpm: ${totalCount}, accuracy: ${accuracy}%`;
        }
    })
}


// how to save final result, I think:
async function sendResults(results) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/save", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        data: results
    }));
}

