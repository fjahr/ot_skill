import * as Alexa from "alexa-sdk";

let handlers: Alexa.Handlers = {
  "SynonymsIntent": function() {
    let self: Alexa.Handler = this;
    let intentRequest = <Alexa.IntentRequest> self.event.request;
    let value = intentRequest.intent.slots.word.value;

    // Insert OT api call

    let speechOutput = "Synonyme für " + value + " sind foo, bar, baz.";
    self.emit(":tellWithCard", speechOutput, "Open Thesaurus", speechOutput);
  }
}

export class Handler {
  constructor(event: Alexa.RequestBody, context: Alexa.context, callback: Function) {
    let alexa = Alexa.handler(event, context);
    alexa.appId = "FILL ME IN";
    alexa.registerHandlers(handlers);
    alexa.execute();
  }
}
