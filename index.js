"use strict";
exports.__esModule = true;
var Alexa = require("alexa-sdk");
var Request = require("request");
var handlers = {
    "SynonymsIntent": function () {
        var self = this;
        var intentRequest = self.event.request;
        var value = intentRequest.intent.slots.word.value;
        var url = 'https://www.openthesaurus.de/synonyme/search?q=' + value + '&format=application/json';
        Request(url, function (error, response, body) {
            if (error) {
                var speechOutput = "Leider gab es einen Fehler. Bitte versuchen sie es in wenigen Minuten erneut.";
                self.emit(":tellWithCard", speechOutput, "Open Thesaurus", speechOutput);
            }
            else {
                var json = JSON.parse(body);
                var terms = json['synsets'][0].terms;
                var syns = [];
                for (var _i = 0, terms_1 = terms; _i < terms_1.length; _i++) {
                    var term = terms_1[_i];
                    syns.push(term["term"]);
                }
                var ownIndex = syns.indexOf(value);
                if (ownIndex > -1) {
                    syns.splice(ownIndex, 1);
                }
                syns = syns.slice(0, 9);
                var speechOutput = "Synonyme für " + value + " sind " + syns.join(", ") + ".";
                self.emit(":tellWithCard", speechOutput, "Open Thesaurus", speechOutput);
            }
            ;
        });
    }
};
var Handler = (function () {
    function Handler(event, context, callback) {
        var alexa = Alexa.handler(event, context);
        alexa.appId = "amzn1.ask.skill.c4e913da-6e63-451c-bce4-515a998a5c4e";
        alexa.registerHandlers(handlers);
        alexa.execute();
    }
    return Handler;
}());
exports.Handler = Handler;
