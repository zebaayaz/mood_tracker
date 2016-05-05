angular.module('mood_tracker.controllers').controller('helpController', function($scope, $stateParams) {
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

    }

    function extractWords(words){
      var wordlist = words.split(" ");

      var blackListedList =
      //Filter out blackListedWords
      wordlist.filter(function(value, index, array1){
        return blackListedWords.indexOf(value) <= -1;
      });

      var noDuplicate =
      //Remove any duplicate words
      blackListedList.filter(function(item, pos, blackListedList) {
          return blackListedList.indexOf(item) == pos;
      });

      return noDuplicate;
    }


    function inputTriggerMoodData(mood, triggerword){
      if(triggers[triggerword] === undefined){
        triggers[triggerword] = 0;
      }

      if(moodsGivenTrigger[mood] === undefined){
          moodsGivenTrigger[mood] = {};
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

      if(behaviorsGivenMood[behaviorword] === undefined){
          behaviorsGivenMood[behaviorword] = {};
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

      var singleStringBehavior = "";
      var singleStringTrigger = "";


      for(var i = 0; i < listofBehaviorStrings.length; i++){
        singleStringBehavior += " " + listofBehaviorStrings[i];

      }

      for(var i = 0; i < listofTriggerStrings.length; i++){
        singleStringTrigger += " " + listofTriggerStrings[i];
      }

      behaviorwords = extractWords(singleStringBehavior);
      triggerwords = extractWords(singleStringTrigger);

      moods[mood]++;
      for(var i = 0; i < behaviorwords.length; i++){
        inputBehaviorMoodData(mood, behaviorwords[i]);
      }

      for(var i = 0; i < triggerwords.length; i++){
        inputTriggerMoodData(mood, triggerwords[i]);
      }

    }

    function inputNewSuggestion(moodString, behaviorString, suggestionString){

        if(suggestions[moodString] === undefined){
            suggestions[moodString] = {};
        }

        suggestions[moodString][behaviorString] = suggestionString;



    }

    function getSuggestions(){
        var suggestionList = [];

        for (var moodkey in moods){
            for (var behaviorkey in behaviors){
                if(suggestions[moodkey] === undefined || suggestions[moodkey][behaviorkey] === undefined){
                    continue;
                }

                suggestionList.push({
                    mood: moodkey,
                    behavior: behaviorkey,
                    suggestion: suggestions[moodkey][behaviorkey],
                    probability: behaviorsGivenMood[behaviorkey][moodkey]/moods[moodkey]
                });

            }
        }

        return suggestionList;
    }



    inputNewSuggestion('mood', 'behavior', "This is a suggestion for mood behavior");
    inputNewSuggestion('Sad', 'it', "This should not appear anywhere because 'it' should be blacklisted");
    inputNewSuggestion('Sad', 'failure', "Don't be a waste of space");
    inputNewSuggestion('Happy', 'cycling', "Use a car instead");

    $scope.$on('$ionicView.enter', function() {
        localforage.getItem('mood_logs').then(function(response){
            clearData();

            for(var i = 0; i < response.length; i++){
                inputMoodLog(response[i].mood, response[i].behaviors, response[i].triggers);
            }

            $scope.suggestionlist = getSuggestions();
        });
    });



});
