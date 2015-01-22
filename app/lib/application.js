(function() {
  this.app = angular.module("interestingtimes", []);

}).call(this);

(function() {
  this.app.controller("InterestingtimeController", [
    "$scope", "$interval", function($scope, $interval) {
      var date_to_time, promise, update_fact;
      date_to_time = function(d) {
        return d.toTimeString().substring(0, 5);
      };
      update_fact = function(num) {
        return $.get("http://numbersapi.com/" + num + "/trivia", function(data) {
          return $scope.fact = data;
        });
      };
      promise = void 0;
      (function() {
        var animPromise;
        return animPromise = $interval(function() {
          var current_date;
          current_date = new Date;
          $scope.time = date_to_time(current_date);
          $scope.seconds = current_date.getSeconds();
          $scope.integer = $scope.time.replace(/:/g, "");
          if ($scope.seconds === 0) {
            return update_fact($scope.integer);
          }
        }, 1000);
      })();
      $scope.$on("$destroy", function() {
        return $interval.cancel(promise);
      });
      $scope.time = date_to_time(new Date);
      $scope.seconds = (new Date).getSeconds();
      $scope.integer = date_to_time(new Date).replace(/:/g, "");
      $scope.fact = "...";
      return update_fact($scope.integer);
    }
  ]);

}).call(this);
