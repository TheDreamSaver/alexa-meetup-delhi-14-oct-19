/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk-core');

const LaunchHandler = {
    canHandle(handlerInput) {
      const request = handlerInput.requestEnvelope.request;
      return request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
      return handlerInput.responseBuilder
        .speak(`Welcome. You can say tell me a super hero trivia, or, you can say exit... What can I help you with?`)
        .reprompt(`What can I help you with?`)
        .getResponse();
    },
};

const GetTriviaIntentHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
        && request.intent.name === 'GetTriviaIntent';
  },
  handle(handlerInput) {
    const factArr = data;
    const factIndex = Math.floor(Math.random() * factArr.length);
    const randomFact = factArr[factIndex];
    const speechOutput = `Here's your superhero trivia: ${randomFact} <break time="1s"/> You can say tell me a super hero trivia to hear another one.`;

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .reprompt(`You can say tell me a super hero trivia to hear another one.`)
      .getResponse();
  },
};

const GetHeroTriviaIntentHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
        && request.intent.name === 'GetHeroTriviaIntent';
  },
  handle(handlerInput) {
    const factArr = heroData;
    const heroName = handlerInput.requestEnvelope.request.intent.slots.hero.value.toLowerCase();
    const factIndex = Math.floor(Math.random() * factArr[heroName].length);
    const randomFact = factArr[heroName][factIndex];
    const speechOutput = `Here's your ${heroName} trivia: ${randomFact} <break time="1s"/> You can say tell me a super hero trivia to hear another one.`;

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .reprompt(`You can say tell me a super hero trivia to hear another one.`)
      .getResponse();
  },
};

const HelpHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(`You can say tell me a super hero trivia, or, you can say exit... What can I help you with?`)
      .reprompt(`What can I help you with?`)
      .getResponse();
  },
};

const ExitHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && (request.intent.name === 'AMAZON.CancelIntent'
        || request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(`Goodbye!`)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, an error occurred.')
      .reprompt('Sorry, an error occurred.')
      .getResponse();
  },
};

const data = [
  `Originally, Stan Lee wanted to make the Hulk grey, but due to issues with printing, they moved forward with the iconic green.`,
  `Superman's first appearance was as a bald supervillain, bent on conquering the world.`,
  `Bruce Wayne has an IQ of 192, beating out both Stephen Hawking and Albert Einstein.`,
  `Superman's shield is his family's crest, known as the insignia for the house of El.`,
  `Joker was originally supposed to die in his second appearance but was saved by the editor, Whitney Ellsworth, who saw the potential for a perfect arch-nemesis to Batman.`,
  `There is a course at the University of Victoria, called Science of Batman, where students can study the Dark Knight.`,
  `Superman has complete control over his heart allowing him to stop it from beating, or make it beat louder.`,
  `Adding to the list of strange superheroes is Dogwelder, created by DC, with the surprising and strange power of welding dead K9s into evil-doers.`,
  `Harley Quinn's origin story came after her TV debut in the Batman animated series.`,
  `One of Gambit's superpowers is possessing a hypnotic charm that he uses to influence pretty much anybody he wants.`,
  `One of Thor's powers is "All-Tongue", the ability to speak and have anybody understand him.`,
  `There was a superhero called Green Lama, who was a practicing Buddhist.`,
  `In the What if? Marvel comic series, Peter Parker was bitten by radioactive sheep, turning him into Sheep-Boy. With great powers come great sweater making responsibilities.`,
];

const heroData = {
    
    'deadpool': [
        `When Deadpool was first created, he was remarkably similar to DC's Deathstroke. So much so that, as a joke, they named him Wade Wilson. Deathstroke's real name is Slade Wilson.`,
        `Speaking of Spider-Man, of all the enduring relationships in Marvel history, there is none sweeter than Deadpool's undying desire for Spider-Man to be his best friend.`,
        `When he was first introduced, in New Mutants issue 98, he was a villain. There was no plan to have him become the character he has developed into today.`,
        `Deadpool got his powers after he joined Weapon-X in an attempt to obtain the healing factor that would cure him of his cancer.`,
        `Deadpool was named after a betting pool run by a group of failed government subjects which gave each of them odds of survival. Deadpool's odds were 1000 to 1. He beat the odds.`,
        `Deadpool has survived quite a few difficult situations, including nuclear blasts and beheadings. Because of his apparent immortality, he often donates his organs to people in need, knowing that they'll immediately regenerate.`
    ],
    'thor': [
        `Thor made his first appearance in an August 1962 issue of "Journey into Mystery." That same month, Spider-Man was also introduced to the world.`,
        `According to Norse mythology, Thor and his fellow Gods are granted immortality by eating magic apples that only grow in Asgard.`,
        `As a prank, Loki once transformed Thor into a frog. An actual frog. Thor subsequently participated in a rats vs. frogs war in New York's Central Park.`,
        `Thor's iconic weapon, the magic hammer Mjolnir, was said to be forged in the heart of a dying star.`,
        `Superman was able to temporarily wield the hammer when Odin lifted the enchantment for a brief moment so he could deal a killing blow to the near-omnipotent Krona.`,
        `One of the hammer's lesser known functions was raising the dead.`,
    ],
    'hulk': [
        `Despite being one of the original Marvel characters, created around the same time as Spider-Man and Iron Man, the Hulk has always been on the verge of cancellation.`,
        `In the Ultimate Universe, Bruce Banner triggers a Hulk transformation because The Ultimates had nobody else to fight.`,
        `Thinking that it was the best way to contain him, the Illuminati, pretending to be Hulk's friends, sent him into outer space to take out a satellite.`,
        `Amongst his many powers are a couple of unique abilities that aren't as well publicized including the ability to breathe underwater via a specialized gland and the ability to see ghosts, which made him one of the few characters able to see Doctor Strange in his astral form.`,
        `In order to revive interest in the character, Marvel launched a new series with a violent and sadistic Red Hulk who did all sorts of terribly things including stealing the Silver Surfer's surfboard.`,
        `Arnold Schwarzenegger was also briefly considered for the role, but was rejected for being too short.`,
    ],
    'batman': [
        `Bruce Wayne's father, Thomas Wayne, was a medical doctor and heir to the Wayne Enterprises fortune. It's been implied in a number of stories that Thomas Wayne was himself a masked vigilante.`,
        `Wayne Enterprises is pretty large as far as fictional corporations go. Valued at 31 billion, Wayne Enterprises has many, many subdivisions.`,
        `Among the holdings of Wayne Entertainment is the newspaper The Daily Planet, which means Batman is technically Superman's boss.`,
        `Bruce Wayne is estimated to be worth 9 billion. This makes him wealthier than the X-Men's Professor Xavier, but not as wealthy as Tony Stark, AKA Iron Man.`,
        `Batman has been frequently joined in his adventures by his sidekick, Robin. There have been many Robins over the years, most of them orphans Wayne has adopted.`,
        `Voice actor Troy Baker is the only person to have played both Batman and his archrival, the Joker. He has played both roles several times in different animated series and video games.`,
    ]
}

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchHandler,
    GetTriviaIntentHandler,
    GetHeroTriviaIntentHandler,
    HelpHandler,
    ExitHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
