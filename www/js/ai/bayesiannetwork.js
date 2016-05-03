/*
To be used like This when help function is pressed

bayesiannetwork.clearData();

for each moodlog in database
    bayesiannetwork.inputMoodLog(mood, listofBehaviorStrings, listofTriggerStrings);

listOfSuggestionObjects = bayesiannetwork.getSuggestions();

display suggestions
listOfSuggestionObjects[i].mood //The mood string
listOfSuggestionObjects[i].behavior //The behavior string word
listOfSuggestionObjects[i].suggestion //The suggestion string
listOfSuggestionObjects[i].probability //Probability that the mood is responsable for this behavior

if a suggestion is not available for this mood behavior pair, it will not show up in the list

*/

var triggers = {};
var moods = {};
var behaviors = {};

var moodsGivenTrigger = {};
var behaviorsGivenMood = {};

var suggestions = {};

//List of words to not be counted
var blackListedWords = ['a', 'the', 'it'];

function clearData(){
    triggers = {};
    moods = {};
    behaviors = {};

    moodsGivenTrigger = {};
    behaviorsGivenMood = {};
    suggestions = {};

    suggestions['mood']['behavior'] = "This is a suggestion for mood behavior"
    suggestions['Sad']['fail'] = "Don't be a waste of space"

}

function extractWords(words){
  var wordlist = words.split(" ");

  wordlist.filter(function(value, index, array1){
    return blackListedWords.indexOf(value) <= -1;
  });

  return wordlist;
}


function inputTriggerMoodData(mood, triggerword){
  if(triggers[triggerword] === undefined){
    triggers[triggerword] = 0;
  }

  if(moodsGivenTrigger[mood][triggerword] === undefined){
    moodsGivenTrigger[mood][triggerword] = 0;
  }

  triggers[triggerword]++;
  moodsGivenTrigger[mood][triggerword]++;
}

function inputBehaviorMoodData(mood, behaviorword){
  if(behaviors[behaviorword] === undefined){
      behaviors[behaviorword] = 0;
  }

  if(behaviorsGivenMood[behaviorword][mood] === undefined){
    behaviorsGivenMood[behaviorword][mood] = 0;
  }

  behaviors[behaviorword]++;
  behaviorsGivenMood[behaviorword][mood]++;
}

function inputMoodLog(mood, listofBehaviorStrings, listofTriggerStrings){

  var behaviorwords = [];
  var triggerwords = [];

  if(moods[mood] === undefined){
      moods[mood] = 0;
  }


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


function getSuggestions(){
    suggestionList = [];

    for (var moodkey in moods){
        for (var behaviorkey in behaviors){
            if(suggestions[moodkey][behaviorkey] === undefined){
                continue;
            }

            suggestionList.add({
                mood: moodkey,
                behavior: behaviorkey,
                suggestion: suggestions[moodkey][behaviorkey],
                probability: behaviorsGivenMood[behaviorkey][moodkey]/moods[mood]
            });

        }
    }

    return suggestionList;
}
