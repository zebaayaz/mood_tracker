angular.module('mood_tracker.controllers').controller('userController', function($scope,$window,$stateParams,$location, $state) {
  //get theme color
  $scope.appTheme = 'positive';
  var selectedTheme = $window.localStorage.appTheme;
    if (selectedTheme) {
        $scope.appTheme = selectedTheme;
    } else {
        $scope.appTheme = 'positive';
    }

  $scope.loginData = {};

  //do login
  $scope.doLogin = function(){
    
    localforage.getItem('user')
      .then(function(res){
        var length = res.length; 
        var password = res[length-1].password;

        if($scope.loginData.passwordInput === password){
          $state.go('app.home', {});
        }
        else{
          console.log("Wrong password! You entered: " + $scope.loginData.passwordInput);
        } 
      });
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
    var user = {
      username: $scope.loginData.username,
      password: $scope.loginData.password
    }

    console.log("New user created! Log in with new password: " + user.password);

    localforage.getItem('user').then(function(response){
      response.push(user);
      localforage.setItem('user', response);
    });

    $location.path("/login");
  };
});
