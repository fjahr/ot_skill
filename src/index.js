"use strict";
exports.__esModule = true;
var Alexa = require("alexa-sdk");
var handlers = {
    "SynonymsIntent": function () {
        var self = this;
        var intentRequest = self.event.request;
        var value = intentRequest.intent.slots.word.value;
        // Insert OT api call
        var speechOutput = "Synonyme für " + value + " sind foo, bar, baz.";
        self.emit(":tellWithCard", speechOutput, "Open Thesaurus", speechOutput);
    }
};
var Handler = (function () {
    function Handler(event, context, callback) {
        var alexa = Alexa.handler(event, context);
        alexa.appId = "ot_skill";
        alexa.registerHandlers(handlers);
        alexa.execute();
    }
    return Handler;
}());
exports.Handler = Handler;
