// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('mood_tracker.controllers', []);

var db = null;

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

    // db = $cordovaSQLite.openDB({ name: "db" });
    // $cordovaSQLite.execute(db,"CREATE TABLE IF NOT EXISTS Log (log_id INTEGER PRIMARY KEY AUTO_INCREMENT, timestamp text NOT NULL, mood_id integer NOT NULL, intensity integer NOT NULL)");
    // $cordovaSQLite.execute(db,"CREATE TABLE IF NOT EXISTS Mood (mood_id INTEGER PRIMARY KEY AUTO_INCREMENT, mood TEXT)");
    // $cordovaSQLite.execute(db,"CREATE TABLE IF NOT EXISTS Trigger (trigger TEXT, FOREIGN KEY(id_page) references Log (log_id))");
    // $cordovaSQLite.execute(db,"CREATE TABLE IF NOT EXISTS Behavior (behavior TEXT, FOREIGN KEY(id_page) references Log (log_id))");
    // $cordovaSQLite.execute(db,"CREATE TABLE IF NOT EXISTS Belief (belief TEXT, FOREIGN KEY(id_page) references Log (log_id))");
    // $cordovaSQLite.execute(db,"CREATE TABLE IF NOT EXISTS Theme (name TEXT PRIMARY KEY, navBarColor INT, fontColor INT, background INT)");
    // $cordovaSQLite.execute(db,"CREATE TABLE IF NOT EXISTS User (name TEXT PRIMARY KEY, pin INTEGER)");
    //
    // $cordovaSQLite.execute(db, "INSERT INTO Mood (mood) VALUES ('Happy')");
    // $cordovaSQLite.execute(db, "INSERT INTO Mood (mood) VALUES ('Sad')");
    // $cordovaSQLite.execute(db, "INSERT INTO Mood (mood) VALUES ('Hungry')");

    var moods = ['Happy', 'Sad', 'Hungry'];

    var exampleMood1 = {
      datetime: new Date(Date.now()),
      mood: 'Happy',
      intensity: 5,
      triggers: ['Exam'],
      beliefs: ['Will fail'],
      behaviors: ['Failed exam', 'Went cycling']
    }

    var exampleMood2 = {
      datetime: new Date(Date.now()),
      mood: 'Sad',
      intensity: 10,
      triggers: ['I suck'],
      beliefs: ['I am the worst'],
      behaviors: ['Ate worms']
    }

    localforage.getItem('moods').then(function(response){
      if(response === null){
        localforage.setItem('moods', moods);
      }
    });
    localforage.getItem('mood_logs').then(function(response){
      if(response === null){
        localforage.setItem('mood_logs', [exampleMood1, exampleMood2]);
      }
    });
    
    var exampleUser = {
      username: 'bfresh',
      password: 'password'
    }

    localforage.setItem('moods', moods);
    localforage.setItem('mood_logs', [exampleMood1, exampleMood2]);
    localforage.setItem('user', [exampleUser]);
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
