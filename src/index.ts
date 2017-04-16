import * as Alexa from "alexa-sdk";
import * as Request from 'request';

let handlers: Alexa.Handlers = {
  "SynonymsIntent": function() {
    let self: Alexa.Handler = this;
    let intentRequest = <Alexa.IntentRequest> self.event.request;
    let value = intentRequest.intent.slots.word.value;
    let url = 'https://www.openthesaurus.de/synonyme/search?q=' + value + '&format=application/json'

    Request(url, function(error, response, body) {
      if (error) {
        let speechOutput = "Leider gab es einen Fehler. Bitte versuchen sie es in wenigen Minuten erneut.";
        self.emit(":tellWithCard", speechOutput, "Open Thesaurus", speechOutput);
      } else {
        let json = JSON.parse(body);
        let terms = json['synsets'][0].terms;
        var syns = [];

        for(let term of terms) {
          syns.push(term["term"]);
        }

        let ownIndex = syns.indexOf(value);
        if (ownIndex > -1) {
          syns.splice(ownIndex, 1);
        }

        syns = syns.slice(0,9);

        let speechOutput = "Synonyme für " + value + " sind " + syns.join(", ") + ".";
        self.emit(":tellWithCard", speechOutput, "Open Thesaurus", speechOutput);
      };
    });
  }
}

export class Handler {
  constructor(event: Alexa.RequestBody, context: Alexa.context, callback: Function) {
    let alexa = Alexa.handler(event, context);
    alexa.appId = "ot_skill";
    alexa.registerHandlers(handlers);
    alexa.execute();
  }
}
