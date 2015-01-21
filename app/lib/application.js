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
        var type, _i, _len, _ref;
        _ref = ["year", "trivia", "math"];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          type = _ref[_i];
          $.get("http://numbersapi.com/" + num + "/" + type + "?json", function(data) {
            if (data.found) {
              $scope.fact = data.text;
            }
          });
        }
        return "...";
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
      return $scope.fact = update_fact($scope.integer);
    }
  ]);

}).call(this);
