const RESULTS = {};
const TYPING_TIME = 60;
const EXP_TIME = 60;
function renderNextPage(nextPage) {
    const main = document.getElementsByTagName("main")[0];
    main.innerHTML = PAGES[nextPage];
    if (nextPage == "typingPage") {
        setupTypingTest();
        typingTimer(TYPING_TIME);
    } else if (["animalsPage", "jobsPage", "verbalSPage", "verbalFPage"].includes(nextPage)) {
        expTimer(EXP_TIME);
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
    function handleErrors(response) {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    }

    fetch("/save", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: results })
    })
        .then(handleErrors)
        .then(response => console.log("Request complete! response: ", response))
        .catch(error => console.log("We got an error: ", error));


}
