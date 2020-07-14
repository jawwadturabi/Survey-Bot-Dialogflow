const express = require("express");
const bodyParser = require("body-parser");
const app = express().use(bodyParser.json());
const { WebhookClient, Card, Suggestion } = require("dialogflow-fulfillment");

app.get('/', (request, response) => {
    response.send("Welcome to survey bot")
})

app.post('/webhook', (request, response) => {

    const _agent = new WebhookClient({ request, response });

    function welcome(agent) {
        agent.add("Hi! How are you doing?. Please tell me where do you live?")
        agent.add(new Suggestion(`Post-Code-1`));
        agent.add(new Suggestion(`Post-Code-2`));
        agent.add(new Suggestion(`Post-Code-3`));
        agent.add(new Suggestion(`None of them`));
    }


    let intents = new Map();
    intents.set("Default Welcome Intent", welcome);
    intents.set("Start-quiz", startQuiz);
    intents.set("question", question)
    intents.set("question - yes", questionYes)
    intents.set("Bio", Bio)
    _agent.handleRequest(intents)
});

app.listen(process.env.PORT, () => {
    console.log("server running on port " + process.env.PORT)
})
