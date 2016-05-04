angular.module('mood_tracker.controllers').controller('historyController', function($scope,$window, $stateParams) {
  //get theme
  $scope.appTheme = 'positive';
  var selectedTheme = $window.localStorage.appTheme;
    if (selectedTheme) {
        $scope.appTheme = selectedTheme;
    } else {
        $scope.appTheme = 'positive';
    }

  var start = document.getElementById("start").value;
  var end = document.getElementById("end").value;
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
    //  if(mood_log.datetime > start && mood_log.datetime < end){
        console.log(JSON.stringify(mood_log));
        $scope.logs.push(mood_log);
//      }
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
