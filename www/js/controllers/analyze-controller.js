angular.module('mood_tracker.controllers').controller('analyzeController', function($scope,$window, $stateParams) {
  $scope.show = [true, false];
  $scope.selectBy = 'Date';
  $scope.moods = [];
  $scope.mood_logs = {};
  $scope.mood_scores =[];
  $scope.logs =[];

  $scope.$on('$ionicView.enter', function() {
    $scope.mood_logs = {};
    $scope.logs =[];
    localforage.getItem('mood_logs').then(function(logs){
      $scope.mood_logs = logs;
      updateChartByDate();
    //  $window.location.reload(true);
    });
  });


  // get theme
  $scope.appTheme = 'positive';
  var selectedTheme = $window.localStorage.appTheme;
  if (selectedTheme) {
    $scope.appTheme = selectedTheme;
  } else {
    $scope.appTheme = 'positive';
  }



  $scope.startDate = new Date(0);
  $scope.endDate = new Date(Date.now());

  $scope.setNewEndDate = function(endDate){
    $scope.endDate = new Date(endDate);
    updateChartByDate();
    //console.log($scope.endDate);
    //$window.location.reload(true);
  };
  $scope.setNewStartDate = function(startDate){
    if($scope.startDate > new Date(Date.now())){
      $scope.startDate = new Date(Date.now());
    }else{
      $scope.startDate = new Date(startDate);
    }
    updateChartByDate();
    //console.log($scope.startDate);
    //$window.location.reload(true);
  };


  var updateChartByDate=function(){
    $scope.logs =[];
    $scope.mood_scores=[];
    $scope.allMoods=[];
    $scope.moods=[];

    _.each($scope.mood_logs, function(mood_log){
      if(mood_log.datetime >= $scope.startDate && mood_log.datetime <= $scope.endDate){
      //  console.log(JSON.stringify(mood_log));
        $scope.logs.push(mood_log);
      }
    });
    $scope.allMoods = _.pluck($scope.logs, 'mood');
    $scope.moods = _.unique($scope.allMoods);
    console.log(JSON.stringify($scope.moods));
  //  console.log(JSON.stringify($scope.allMoods));
    _.each($scope.moods,function(unique_mood){
      var count = 0;
      _.each($scope.allMoods,function(mood){
        if(unique_mood === mood){
          count++;
        }
      });
      //console.log(JSON.stringify($scope.mood_scores));
      $scope.mood_scores.push(count);
    });
    var data = {
      labels: $scope.moods,
      series: $scope.mood_scores
    };

    //console.log(JSON.stringify(data));
    var options = {
      showLabel: true
    };

    var responsiveOptions = [
      ['screen and (min-width: 640px)', {
        chartPadding: 30
      }],
      ['screen and (min-width: 1024px)', {
        chartPadding: 20
      }]
    ];

    new Chartist.Pie('.ct-chart', data, options, responsiveOptions);
  };

  //select by date or mood
  $scope.updateSelectBy = function(selected){
    if(selected === 'Date'){
      updateChartByDate();
      $scope.show = [true, false];
    }else{
      updateChartByDate();
      $scope.show = [false, true];
    }
  };

});
