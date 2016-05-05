angular.module('mood_tracker.controllers').controller('historyController', function($scope,$window, $stateParams) {
  //get theme
  $scope.appTheme = 'positive';
  var selectedTheme = $window.localStorage.appTheme;
  if (selectedTheme) {
    $scope.appTheme = selectedTheme;
  } else {
    $scope.appTheme = 'positive';
  }


  $scope.startDate = new Date(0);
  $scope.endDate = new Date(Date.now());

  $scope.setNewEndDate = function(endDate){
    $scope.endDate = new Date(endDate);
    updateByDate();
    //console.log($scope.endDate);
    //$window.location.reload(true);
  };
  $scope.setNewStartDate = function(startDate){
    if($scope.startDate > new Date(Date.now())){
      $scope.startDate = new Date(Date.now());
    }else{
      $scope.startDate = new Date(startDate);
    }
    updateByDate();
    //console.log($scope.startDate);
    //$window.location.reload(true);
  };

  var updateByDate=function(){
    $scope.logs =[];
    _.each($scope.mood_logs, function(mood_log){
      if(mood_log.datetime >= $scope.startDate && mood_log.datetime <= $scope.endDate){
        console.log(JSON.stringify(mood_log));
        $scope.logs.push(mood_log);
      }
    });
  };

  $scope.selectedMood ="Happy";

  $scope.setSelectedMood = function(selectMood){
      $scope.selectedMood = selectMood;
      updateByMood();
  };

  var updateByMood=function(){
    $scope.logs =[];
    _.each($scope.mood_logs, function(mood_log){
      if(mood_log.mood === $scope.selectedMood){
        console.log(JSON.stringify(mood_log));
        $scope.logs.push(mood_log);
      }
    });
  };

  $scope.mood_logs = {};
  $scope.logs = [];
  $scope.moods =[];

  //select by date  or mood
  $scope.show = [true, false, true, false];
  $scope.selectBy = 'Date';


$scope.$on('$ionicView.enter', function() {
    $scope.mood_logs = {};
    $scope.logs = [];
    localforage.getItem('moods').then(function(response){
      $scope.moods = response;
      updateByDate();
    //  $window.location.reload(true);
    });
      localforage.getItem('mood_logs').then(function(response){
        $scope.mood_logs = response;
        updateByDate();
      //  $window.location.reload(true);
      });
  });




  $scope.updateSelectBy = function(selected){
    if(selected === 'Date'){
      updateByDate();
      $scope.show = [true, false, true,false];
    }else{
      updateByMood();
      $scope.show = [false, true, false,true];
    }
  };
});
