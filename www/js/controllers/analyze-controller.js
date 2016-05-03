angular.module('mood_tracker.controllers').controller('analyzeController', function($scope,$window, $stateParams) {
  $scope.show = [true, false];
  $scope.selectBy = 'Date';
  $scope.moods = ["Happy", "Sad", "Hungry"];
 // get theme
  $scope.appTheme = 'positive';
  var selectedTheme = $window.localStorage.appTheme;
    if (selectedTheme) {
        $scope.appTheme = selectedTheme;
    } else {
        $scope.appTheme = 'positive';
    }
  //select by date or mood
  $scope.updateSelectBy = function(selected){
    if(selected === 'Date'){
      $scope.show = [true, false];
    }else{
      $scope.show = [false, true];
    }
  };
});
