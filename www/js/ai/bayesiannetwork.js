var triggers = {};
var moods = {};
var behaviors = {};

var moodsGivenTrigger = {};
var behaviorsGivenMood = {};

//List of words to not be counted
var blackListedWords = ['a', 'the', 'it'];

function extractWords(words){
  var wordlist = words.split(" ");

  wordlist.filter(function(value, index, array1){
    return blackListedWords.indexOf(value) <= -1;
  });

  return wordlist;
}


function inputTriggerMoodData(mood, triggerword){
  if(triggers[trigger] === undefined){
    triggers[trigger] = 0;
  }

  if(moodsGivenTrigger[mood][triggerword] === undefined){
    moodsGivenTrigger[mood][triggerword] = 0;
  }

  triggers[triggerword]++;
  moodsGivenTrigger[mood][triggerword]++;
}

function inputBehaviorMoodData(mood, behaviorword){
  behaviors[behaviorword]++;
  behaviorsGivenMood[behaviorword][mood]++;
}

function inputMoodLog(mood, listofBehaviorStrings, listofTriggerStrings){

  ///TODO: This should take in list of strings instead of a string as it does now
  var behaviorwords = [];
  var triggerwords = [];

  for(var i = 0; i < listofBehaviorStrings.length; i++){
    behaviorwords = behaviorwords.concat(extractWords(listofBehaviorStrings));
  }

  for(var i = 0; i < listofTriggerStrings.length; i++){
    triggerwords = triggerwords.concat(extractWords(listofTriggerStrings));
  }

  moods[mood]++;
  for(var i = 0; i < behaviorwords.length; i++){
    inputBehaviorMoodData(mood, behaviorwords[i]);
  }

  for(var i = 0; i < triggerwords.length; i++){
    inputTriggerMoodData(mood, triggerwords[i]);
  }
}

function getMoodGivenTrigger(mood, trigger){
  return moodsGivenTrigger[mood][trigger]/triggers[trigger];
}
