var triggers = {};
var moods = {};
var behaviors = {};

var moodsGivenTrigger = {};
var behaviorsGivenMood = {};

function extractWords(words){
  wordlist = [];

  ///TODO: implement extractWords

  return wordlist;
}

function inputData(mood, triggerword, behaviorword){
  triggers[triggerword]++;
  moods[mood]++;
  behaviors[behaviorword]++;

  behaviorsGivenMood[behaviorword][mood]++;
  moodsGivenTrigger[mood][triggerword]++;
}
