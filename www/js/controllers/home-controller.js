angular.module('mood_tracker.controllers').controller('homeController', function($scope,$window, $stateParams, $location) {
	// get theme
	$scope.appTheme = 'positive';
  var selectedTheme = $window.localStorage.appTheme;
    if (selectedTheme) {
        $scope.appTheme = selectedTheme;
    } else {
        $scope.appTheme = 'positive';
    }
	$scope.mood_input = function(){
		$location.path("app/mood_input");
	};
});
