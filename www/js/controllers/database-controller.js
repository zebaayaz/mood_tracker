module.controller('MyCtrl', function($scope, $cordovaSQLite) {

  // SQLite database used for application
  // plugin is from ngCordova : https://github.com/litehelpers/Cordova-sqlite-storage.git

  var db = $cordovaSQLite.openDB({ name: "mood_tracker_database" });

  // this is example code left for the moment so others can better understand database structure
  $scope.execute = function() {
    var query = "INSERT INTO test_table (data, data_num) VALUES (?,?)";
    $cordovaSQLite.execute(db, query, ["test", 100]).then(function(res) {
      console.log("insertId: " + res.insertId);
    }, function (err) {
      console.error(err);
    });
  };

});
