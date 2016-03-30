module.controller('MyCtrl', function($scope, $cordovaSQLite) {

  var db = $cordovaSQLite.openDB({ name: "mood_tracker_database" });

  $scope.execute = function() {
    var query = "INSERT INTO test_table (data, data_num) VALUES (?,?)";
    $cordovaSQLite.execute(db, query, ["test", 100]).then(function(res) {
      console.log("insertId: " + res.insertId);
    }, function (err) {
      console.error(err);
    });
  };

});
