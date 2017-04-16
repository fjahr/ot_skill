const context = require("aws-lambda-mock-context");
var expect = require("chai").expect;
var index = require("../src/index");

const ctx = context();

describe("Testing SynonymsIntent", function() {

  var speechResponse = null;
  var speechError = null;

  before(function(done) {
    index.Handler(
      {
          "session": {
                "sessionId": "SessionId.6ab325dd-xxxx-xxxx-aee5-456cd330932a",
                "application": {
                        "applicationId": "ot_skill"
                      },
                "attributes": {},
                "user": {
                        "userId": "amzn1.ask.account.XXXXXX"
                      },
                "new": true
              },
          "request": {
                "type": "IntentRequest",
                "requestId": "EdwRequestId.b851ed18-2ca8-xxxx-xxxx-cca3f2b521e4",
                "timestamp": "2016-07-05T15:27:34Z",
                "intent": {
                        "name": "SynonymsIntent",
                        "slots": {
                                  "word": {
                                              "name": "word",
                                              "value": "gut"
                                            }
                                }
                      },
                "locale": "en-US"
              },
          "version": "1.0"
      }
      , ctx);
    ctx.Promise
      .then(response => {
        speechResponse = response;
        console.log(speechResponse);
        done();
      })
      .catch( error => {
        speechError = error;
        done();
      })
    });

  describe("Response structure is correct", function() {
    it("should not error", function() {
      expect(speechError).to.be.null;
    });
  });

  describe("Response should use API response", function() {
    it("should include the requested word", function() {
      expect(speechResponse.response.outputSpeech.ssml).to.contain('gut');
    });

    it("should include api response words", function() {
      expect(speechResponse.response.outputSpeech.ssml).to.contain('manierlich, positiv, schön');
    });
  });

});
