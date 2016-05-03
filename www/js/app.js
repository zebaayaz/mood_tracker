// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('mood_tracker.controllers', []);

angular.module('mood_tracker', ['ionic', 'ngCordova', 'mood_tracker.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppController'
  })

  .state('app.home', {
    url: '/home',
    views: {
      'menuContent': {
        templateUrl: 'templates/home.html',
        controller: 'homeController'
      }
    }
  })

  .state('app.history', {
      url: '/history',
      views: {
        'menuContent': {
          templateUrl: 'templates/history.html',
          controller: 'historyController'
        }
      }
    })

  .state('app.analyze', {
    url: '/analyze',
    views: {
      'menuContent': {
        templateUrl: 'templates/analyze.html',
        controller: 'analyzeController'
      }
    }
  })

  .state('app.help', {
    url: '/help',
    views: {
      'menuContent': {
        templateUrl: 'templates/help.html',
        controller: 'helpController'
      }
    }
  })

  .state('app.settings', {
    url: '/settings',
    views: {
      'menuContent': {
        templateUrl: 'templates/settings.html',
        controller: 'settingsController'
      }
    }
  })

  .state('app.mood_input', {
    url: '/mood_input',
    views: {
      'menuContent': {
        templateUrl: 'templates/mood_input.html',
        controller: 'mood_inputController'
      }
    }
  })

  .state('signup', {
    url: '/signup',
    templateUrl: 'templates/signup.html',
    controller: 'userController'
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'userController'
  });


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
});
