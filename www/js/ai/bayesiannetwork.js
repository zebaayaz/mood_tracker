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

function inputData(mood, triggerword, beliefword){
  triggers[triggerword]++;
  moods[mood]++;
  beliefs[beliefword]++;

  behaviorsGivenMood[behavior][mood]++;
  moodsGivenTrigger[mood][triggerword]++;
}
