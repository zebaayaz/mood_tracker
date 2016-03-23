// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('mood_tracker.controllers', []);

angular.module('mood_tracker', ['ionic', 'mood_tracker.controllers', 'ngCordova'])

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

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('app.moods', {
      url: '/moods',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html',
          controller: 'MoodController'
        }
      }
    })

  .state('app.behaviors', {
    url: '/behaviors',
    views: {
      'menuContent': {
        templateUrl: 'templates/browse.html',
        controller: 'BehaviorController'
      }
    }
  })
  .state('app.triggers', {
    url: '/triggers',
    views: {
      'menuContent': {
        templateUrl: 'templates/browse.html',
        controller: 'TriggerController'
      }
    }
  })

  .state('app.beliefs', {
    url: '/beliefs',
    views: {
      'menuContent': {
        templateUrl: 'templates/browse.html',
        controller: 'BeliefController'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/search');
});
