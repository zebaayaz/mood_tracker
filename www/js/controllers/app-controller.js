angular.module('mood_tracker.controllers', []).controller('AppController', function($scope,$window, $ionicModal,$location, $timeout, $cordovaSQLite) {
//get theme color
  $scope.appTheme = 'positive';
  var selectedTheme = $window.localStorage.appTheme;
    if (selectedTheme) {
        $scope.appTheme = selectedTheme;
    } else {
        $scope.appTheme = 'positive';
    }

    //do logout
    $scope.doLogout = function(){
      $location.path("/login");
    };


  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
});
