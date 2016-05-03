angular.module('mood_tracker.controllers').controller('historyController', function($scope,$window, $stateParams) {
  //get theme
  $scope.appTheme = 'positive';
  var selectedTheme = $window.localStorage.appTheme;
    if (selectedTheme) {
        $scope.appTheme = selectedTheme;
    } else {
        $scope.appTheme = 'positive';
    }

  //select by date  or mood
  $scope.show = [true, false];
  $scope.selectBy = 'Date';
  $scope.moods = ["Happy", "Sad", "Hungry"];
  $scope.updateSelectBy = function(selected){
    if(selected === 'Date'){
      $scope.show = [true, false];
    }else{
      $scope.show = [false, true];
    }
  };
});
