"use strict"

var APP_ID = undefined;

var AlexaSkill = require('./AlexaSkill');

// @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
var Blinkt = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
Blinkt.prototype = Object.create(AlexaSkill.prototype);
Blinkt.prototype.constructor = Blinkt;

Blinkt.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("Blinkt onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

Blinkt.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("Blinkt onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    response.ask("Welcome to the space agency!", "You can say: how many people are in space");
};

Blinkt.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("Blinkt onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

let sendColor = require("./sendColor");

Blinkt.prototype.intentHandlers = {
    // register custom intent handlers
   "TurnOffIntent": function (intent, session, response) {
        let color = {r:0,g:0,b:0};
        var speechOutput = "OK, I'll turn the Blinkt off.";
        sendColor(color, () => {
           response.tellWithCard(speechOutput, "Blinkt", speechOutput);
        });
   },
   "ChangeColorIntent": function (intent, session, response) {
       let colorRequested = intent.slots.BlinktColor.value;
       let color= {r:0,g:0,b:0};
       if(colorRequested == "red") { 
         color.r = 255;
        } else if(colorRequested== "blue") {
            color.b = 255;
        }else if (colorRequested == "green") {
            color.g = 255;
        }
        else {
            reponse.ask("What color?", "What color?");
            return;
        }
        var speechOutput = "OK, let's make your Blinkt go "+colorRequested+".";

        sendColor(color, () => {
            response.tellWithCard(speechOutput, "Blinkt", speechOutput);
        });
   },
   "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can ask me who's in space!", "You can ask me who's in space!");
    }
};

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the Blinkt skill.
    var helloWorld = new Blinkt();
    helloWorld.execute(event, context);
};

