angular.module('mood_tracker.controllers').controller('userController', function($scope,$window,$stateParams,$location) {
  //get theme color
  $scope.appTheme = 'positive';
  var selectedTheme = $window.localStorage.appTheme;
    if (selectedTheme) {
        $scope.appTheme = selectedTheme;
    } else {
        $scope.appTheme = 'positive';
    }
  //do login
  $scope.doLogin = function(){
		$location.path("app/home");
	};
  // do logout
  $scope.doLogout = function(){
    $location.path("/login");
  };
  // go to sign in page
  $scope.goToSignup = function(){
    $location.path("/signup");
  };
  // do signup
  $scope.doSignup = function(){
    $location.path("/login");
  };
});
