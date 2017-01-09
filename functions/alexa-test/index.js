'use strict';

const oneshot = require('./oneshotRequests');

// --------------- Main handler -----------------------

// Route the incoming request based on type (LaunchRequest, IntentRequest,
// etc.) The JSON body of the request is provided in the event parameter.
exports.handle = (event, context, callback) => {
    try {
        /*
        console.log(`event.session.application.applicationId=${event.session.application.applicationId}`);

        if (event.session.application.applicationId !== 'amzn1.ask.skill.50a37bb7-6b6c-4a7a-8bbe-d38ddb9d43ef') {
             callback('Invalid Application ID');
        }
        */

        if (event.session.new) {
            onSessionStarted({ requestId: event.request.requestId }, event.session);
        }

        if (event.request.type === 'LaunchRequest') {
            onLaunch(event.request,
                event.session,
                (sessionAttributes, speechletResponse) => {
                    callback(null, buildResponse(sessionAttributes, speechletResponse));
                });
        } else if (event.request.type === 'IntentRequest') {
            onIntent(event.request,
                event.session,
                (sessionAttributes, speechletResponse) => {
                    callback(null, buildResponse(sessionAttributes, speechletResponse));
                });
        } else if (event.request.type === 'SessionEndedRequest') {
            onSessionEnded(event.request, event.session);
            callback();
        }
    } catch (err) {
        callback(err);
    }
};

// --------------- Events -----------------------




/**
 * Called when the session starts.
 */
function onSessionStarted(sessionStartedRequest, session) {
    console.log(`onSessionStarted requestId=${sessionStartedRequest.requestId}, sessionId=${session.sessionId}`);
}

/**
 * Called when the user launches the skill without specifying what they want.
 */
function onLaunch(launchRequest, session, callback) {
    console.log(`onLaunch requestId=${launchRequest.requestId}, sessionId=${session.sessionId}`);
    getWelcomeResponse(callback);
}

function onIntent(intentRequest, session, callback) {
    console.log(`onIntent requestId=${intentRequest.requestId}, sessionId=${session.sessionId}`);

    const intent = intentRequest.intent;
    const intentName = intentRequest.intent.name;

    if (intentName === 'OneshotGetPersonsTeam') {
        oneshot.getPersonsTeam(intent, session, callback);
    } else if (intentName === 'OneshotGetTeamMembers') {
        oneshot.getTeamMembers(intent, session, callback);
    } else if (intentName === 'AMAZON.HelpIntent') {
        getWelcomeResponse(callback);
    } else if (intentName === 'AMAZON.StopIntent' || intentName === 'AMAZON.CancelIntent') {
        handleSessionEndRequest(callback);
    } else {
        throw new Error('Invalid intent');
    }

}

function onSessionEnded(sessionEndedRequest, session) {
    console.log(`onSessionEnded requestId=${sessionEndedRequest.requestId}, sessionId=${session.sessionId}`);
}






// --------------------Helpers------------------------------------

function buildResponse(sessionAttributes, speechletResponse) {
    return {
        version: '1.0',
        sessionAttributes,
        response: speechletResponse
    };
}

function getWelcomeResponse(callback) {
    const sessionAttributes = {};
    const cardTitle = 'Welcome';
    const speechOutput = 'Whats up, this is the Team Finder skill. I tell you who is on which engineering team. ' +
      'Find out what team Mario is on by saying, what team is Mario on?';
    const repromptText = '';
    const shouldEndSession = false;

    callback(sessionAttributes,
        _buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
};

function handleSessionEndRequest(callback) {
    const cardTitle = 'Session Ended';
    let speechOutput = 'Closing Team Finder. Goodbye!';
    const shouldEndSession = true;

    callback({}, _buildSpeechletResponse(cardTitle, speechOutput, null, shouldEndSession));
};

function _buildSpeechletResponse(title, output, repromptText, shouldEndSession) {
    return {
        outputSpeech: {
            type: 'PlainText',
            text: output
        },
        card: {
            type: 'Simple',
            title: `SessionSpeechlet - ${title}`,
            content: `SessionSpeechlet - ${output}`
        },
        reprompt: {
            outputSpeech: {
                type: 'PlainText',
                text: repromptText
            },
        },
        shouldEndSession
    };
}

