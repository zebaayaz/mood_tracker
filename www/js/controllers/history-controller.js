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
    //console.log($scope.endDate);
   //$window.location.reload(true);
  };
  $scope.setNewStartDate = function(startDate){
    $scope.startDate = new Date(startDate);
    //console.log($scope.startDate);
    //$window.location.reload(true);
  };
  $scope.mood_logs = {};
  $scope.logs = [];

  //select by date  or mood
  $scope.show = [true, false, false];
  $scope.selectBy = 'Date';
  localforage.getItem('moods').then(function(response){
    $scope.moods = response;
  });
  localforage.getItem('mood_logs').then(function(response){
    $scope.mood_logs = response;
    $scope.logs = [];
    $scope.show[2] = true;
    _.each($scope.mood_logs, function(mood_log){
     if(mood_log.datetime > $scope.startDate && mood_log.datetime < $scope.endDate){
        console.log(JSON.stringify(mood_log));
        $scope.logs.push(mood_log);
      }
    });
  });
  $scope.updateSelectBy = function(selected){
    if(selected === 'Date'){
      $scope.show = [true, false, false];
    }else{
      $scope.show = [false, true, false];
    }
  };
});
