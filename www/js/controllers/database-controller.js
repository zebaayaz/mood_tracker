module.controller('DatabaseController', function($scope, $cordovaSQLite) {

  // SQLite database used for application
  // plugin is from ngCordova : https://github.com/litehelpers/Cordova-sqlite-storage.git

  // timestamp : YYYY-MM-DD HH:MM:SS

  var db = $cordovaSQLite.openDB({ name: "db" });
  $cordovaSQLite.execute(db,"CREATE TABLE IF NOT EXISTS Log (log_id INTEGER PRIMARY KEY, timestamp text NOT NULL, mood_id integer NOT NULL, intensity integer NOT NULL)");
  $cordovaSQLite.execute(db,"CREATE TABLE IF NOT EXISTS Mood (mood_id INTEGER PRIMARY KEY, mood TEXT)");
  $cordovaSQLite.execute(db,"CREATE TABLE IF NOT EXISTS Trigger (trigger TEXT, FOREIGN KEY(id_page) references Log (log_id))");
  $cordovaSQLite.execute(db,"CREATE TABLE IF NOT EXISTS Behavior (behavior TEXT, FOREIGN KEY(id_page) references Log (log_id))");
  $cordovaSQLite.execute(db,"CREATE TABLE IF NOT EXISTS Belief (belief TEXT, FOREIGN KEY(id_page) references Log (log_id))");
  $cordovaSQLite.execute(db,"CREATE TABLE IF NOT EXISTS Theme (name TEXT PRIMARY KEY, navBarColor INT, fontColor INT, background INT)");
  $cordovaSQLite.execute(db,"CREATE TABLE IF NOT EXISTS User (name TEXT PRIMARY KEY, pin INTEGER)");

  // this is example code left for the moment so others can better understand database queries
  /*$scope.execute = function() {
    var query = "INSERT INTO test_table (data, data_num) VALUES (?,?)";
    $cordovaSQLite.execute(db, query, ["test", 100]).then(function(res) {
      console.log("insertId: " + res.insertId);
    }, function (err) {
      console.error(err);
    });
  };*/

});
