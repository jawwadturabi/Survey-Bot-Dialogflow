const express = require("express");
const bodyParser = require("body-parser");
const app = express().use(bodyParser.json());
const { WebhookClient, Card, Suggestion } = require("dialogflow-fulfillment");

app.get('/', (request, response) => {
    response.send("Welcome to survey bot")
})

app.post('/webhook', (request, response) => {

    const _agent = new WebhookClient({ request, response });
    console.log('Dialogflow Request body: ' + JSON.stringify(request.body));
    function welcome(agent) {
        agent.add("Hi! How are you doing?. Please tell me where do you live?")
        agent.add(new Suggestion(`Post-Code-1`));
        agent.add(new Suggestion(`Post-Code-2`));
        agent.add(new Suggestion(`Post-Code-3`));
        agent.add(new Suggestion(`None of them`));
    }

    function detail(agent) {
        agent.add("What is your occupation?")
        agent.add(new Suggestion(`Sedentary Occupation`));
        agent.add(new Suggestion(`Standing Occupation`));
        agent.add(new Suggestion(`Strenuous Occupation`));
        agent.add(new Suggestion(`None of them`));
    }

    function more(agent) {
        agent.add("What is your biological sex?")
        agent.add(new Suggestion(`Male`));
        agent.add(new Suggestion(`Female`));
    }

    function more(agent) {
        agent.add("Do you shave everyday?")
        agent.add(new Suggestion(`Yes`));
        agent.add(new Suggestion(`No`));
    }


    let intents = new Map();
    intents.set("Default Welcome Intent", welcome);
    intents.set("details", detail);
    intents.set("more", more)
    intents.set("gender", gender)
    // intents.set("Bio", Bio)
    _agent.handleRequest(intents)
});

app.listen(process.env.PORT, () => {
    console.log("server running on port " + process.env.PORT)
})
