angular.module('mood_tracker.controllers').controller('settingsController', function($scope,$window, $location, $stateParams) {
  $scope.theme = $window.localStorage.appTheme;
  $scope.deleteAccount = function(){
    $location.path("/login");
  };
  $scope.themeChange = function (theme) {
      // save theme locally
      $window.localStorage.appTheme = theme;
      // reload
      $window.location.reload(true);
  };
});
