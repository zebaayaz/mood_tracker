angular.module('mood_tracker.controllers').controller('homeController', function($scope, $stateParams, $location) {
	$scope.mood_input = function(){
		$location.path("app/mood_input");
	};
});