// === for Daniel to edit ===
const instructions = `
    IN THIS TASK, dolor sit amet consectetur adipisicing elit. Eum blanditiis reiciendis harum. Inventore fugit ex
    qui perspiciatis laborum molestias odio aspernatur, error quo officia quasi perferendis est, ipsa in id.
    Placeat illo modi reprehenderit voluptatum iusto, vero ducimus. Vero recusandae suscipit mollitia tempora
    ratione ut, totam perspiciatis quidem, repellendus a quae sapiente nostrum quam deserunt eveniet porro adipisci
    esse similique.
    Alias quas ullam enim consequatur tempora, molestias mollitia omnis quidem sequi sed similique quam earum
    laborum, culpa doloribus. Quos voluptates cum cumque earum consequuntur dolores perferendis tenetur nemo
    incidunt corporis?
`;


const typingQuote = `Education is an integral part of life. You are taught different lessons and activities since your birth. Sometimes we grasp things easily and develop our own way of doing and sometimes we simply copy. Educating someone does not mean attaining textual knowledge. It is also responsible for your overall development. There are various activities shown in your science book, they are from our day to day activities and you should try them because when you perform such activities, your mind automatically generates various questions and this leads to a searching tendency.`;

function generateQuoteHTML(quote) {
    const chars = quote.split("");
    let quoteHTML = "";
    for (let i = 0; i < chars.length; i++) {
        quoteHTML += `<span>${chars[i]}</span>`;
    }
    return quoteHTML;
}

const typingQuoteHTML = generateQuoteHTML(typingQuote);


const PAGES = {

    instructionsPage: `
        <p class="h3">
            ${instructions}
        </p>
        <button class="btn btn-primary" onclick="renderNextPage('semanticInstructionsPage');">
            End instructions
        </button>
    `,

    semanticInstructionsPage: `
    <p class="h3">
    You will now be completing a semantic fluency task. A category will be presented on the screen and you will have 1 minute to list as many words as possible that fall under that category. Press continue when you are ready to proceed.
    </p>
    <button class="btn btn-primary" onclick="renderNextPage('animalsPage');">
    continue
    </button>
    `,

    animalsPage: `
        <form>
            <label for="animals" class="h4">Please list as many words as possible that fall under the category
                <b>"Animals"</b> separated by commas and spaces - you have <span id="timeLeft">60</span> seconds</label>
            <textarea class="form-control" name="animals" id="animals" placeholder="animal1, animal2, ..."></textarea>
            <button disabled type="button" class="form-control btn btn-primary mt-3" onclick="saveResultAndNext('animals', 'jobsPage');">next</button>
        </form>
    `,

    jobsPage: `
    <form>
        <label for="animals" class="h4">Please list as many words as possible that fall under the category
            <b>"Jobs"</b> separated by commas and spaces - you have <span id="timeLeft">60</span> seconds</label>
        <textarea class="form-control" name="jobs" id="jobs" placeholder="job1, job2, ..."></textarea>
        <button disabled type="button" class="form-control btn btn-primary mt-3" onclick="saveResultAndNext('jobs', 'verbalSPage');">next</button>
    </form>
    `,

    verbalInstructionsPage: `
    <p class="h3">
    You will now be completing a verbal fluency task. A letter will be presented on the screen and you will have 1 minute to list as many words as possible that start with that letter. Press continue when you are ready to proceed.
    </p>
    <button class="btn btn-primary" onclick="renderNextPage('verbalSPage');">
    continue
    </button>
    `,

    verbalSPage: `
    <form>
        <label for="S" class="h4">
        Please list as many words as possible that start with the letter
            <b>"s"</b> separated by commas and spaces - you have <span id="timeLeft">60</span> seconds</label>
            <textarea class="form-control" name="S" id="S" placeholder="s---, s----, ..."></textarea>
            <button disabled type="button" class="form-control btn btn-primary mt-3" onclick="saveResultAndNext('S', 'verbalFPage');">next</button>
    </form>
    `,

    verbalFPage: `
    <form>
    <label for="F" class="h4">
    Please list as many words as possible that start with the letter
        <b>"f"</b> separated by commas and spaces - you have <span id="timeLeft">60</span> seconds</label>
        <textarea class="form-control" name="F" id="F" placeholder="f-----, f----, ..."></textarea>
        <button disabled type="button" class="form-control btn btn-primary mt-3" onclick="saveResultAndNext('F', 'typingInstructionsPage');">next</button>
    </form>
    `,

    typingInstructionsPage: `
    <p class="h3">
    For the next section, a paragraph will appear on the screen. Type the paragraph as fast as possible in the textbox that will appear below within 60 seconds. Press continue when you are ready to proceed.
    </p>
    <button class="btn btn-primary" onclick="renderNextPage('typingPage');">
    continue
    </button>
    `,

    typingPage: `
    <span id="timeLeft">60</span>
    <div class="typing-container">
        <div class="quote-display" id="quoteDisplay">${typingQuoteHTML}
        </div>
        <textarea id="typing" class="quote-input" autofocus></textarea>
        <button disabled type="button" class="form-control btn btn-primary mt-3" onclick="saveResultAndNext('typing', 'endingPage');">next</button>
    </div>
    `,
    endingPage: `
    <p class="h3">
    Task over. Thank you for participating in this study. You can close this window.
    </p>
    `,
}
