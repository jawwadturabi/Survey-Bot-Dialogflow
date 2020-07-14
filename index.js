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

    function gender(agent) {
        agent.add(new Card({
            title: "Do you shave everyday?",
            imageUrl: "https://thumbs.dreamstime.com/b/young-man-shaving-face-foam-vector-young-man-shaving-face-foam-vector-flat-cartoon-character-illustration-icon-design-111702476.jpg",
        })
        )
        agent.add(new Suggestion(`Yes`));
        agent.add(new Suggestion(`No`));
    }

    function genderYes(agent) {
        agent.add(new Card({
            title: "Do you play risk-sports?",
            imageUrl: "https://cover4insurance.com/download/anigif.gif",
        })
        )
        agent.add(new Suggestion(`Yes`));
        agent.add(new Suggestion(`No`));
    }
    //https://cover4insurance.com/download/anigif.gif
    function genderNo(agent) {
        agent.add(new Card({
            title: "Do you play risk-sports?",
            imageUrl: "https://cover4insurance.com/download/anigif.gif",
        })
        )
        agent.add(new Suggestion(`Yes`));
        agent.add(new Suggestion(`No`));
    }

    function genderYesYes(agent) {
        agent.add(new Card({
            title: "Thanks for filling out this survey",
            imageUrl: "",
            text: "For more details visit our website",
            buttonText: " Visit website ",
            buttonUrl: "https://www.example.com"
        })
        )
    }

    function genderNoNo(agent) {
        agent.add(new Card({
            title: "Thanks for filling out this survey",
            imageUrl: "",
            text: "For more details visit our website",
            buttonText: " Visit website ",
            buttonUrl: "https://www.example.com"
        })
        )
    }

    function genderf(agent) {
        agent.add(new Card({
            title: "Are you a mother?",
            imageUrl: "https://previews.123rf.com/images/baldyrgan/baldyrgan1309/baldyrgan130900138/22398385-mother-and-baby-symbol.jpg",
        })
        )
        agent.add(new Suggestion(`Yes`));
        agent.add(new Suggestion(`No`));
    }

    function genderfYes(agent) {
        agent.add(new Card({
            title: "Did you breastFeed your child?",
            imageUrl: "https://www.msh.org/sites/default/files/intl-bf-logo.gif",
        })
        )
        agent.add(new Suggestion(`Yes`));
        agent.add(new Suggestion(`No`));
    }

    function genderfNo(agent) {
        agent.add(new Card({
            title: "Did you breastFeed your child?",
            imageUrl: "https://www.msh.org/sites/default/files/intl-bf-logo.gif",
        })
        )
        agent.add(new Suggestion(`Yes`));
        agent.add(new Suggestion(`No`));
    }

    function genderfYesYes(agent) {
        agent.add(new Card({
            title: "Thanks for filling out this survey",
            imageUrl: "",
            text: "For more details visit our website",
            buttonText: " Visit website ",
            buttonUrl: "https://www.example.com"
        })
        )
    }

    function genderfNoNo(agent) {
        agent.add(new Card({
            title: "Thanks for filling out this survey",
            imageUrl: "",
            text: "For more details visit our website",
            buttonText: " Visit website ",
            buttonUrl: "https://www.example.com"
        })
        )
    }


    let intents = new Map();
    intents.set("Default Welcome Intent", welcome);
    intents.set("details", detail);
    intents.set("more", more)
    intents.set("gender", gender)
    intents.set("gender-yes", genderYes)
    intents.set("gender-no", genderNo)
    intents.set("gender-yes-yes", genderYesYes)
    intents.set("gender-no-no", genderNoNo)
    intents.set("genderf", genderf)
    intents.set("genderf-yes", genderfYes)
    intents.set("genderf-no", genderfNo)
    intents.set("genderf-yes-yes", genderfYesYes)
    intents.set("genderf-no-no", genderfNoNo)

    // intents.set("Bio", Bio)
    _agent.handleRequest(intents)
});

app.listen(process.env.PORT, () => {
    console.log("server running on port " + process.env.PORT)
})
