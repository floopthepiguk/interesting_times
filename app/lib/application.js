(function() {
  this.app = angular.module("interestingtimes", []);

}).call(this);

(function() {
  this.app.controller("InterestingtimeController", [
    "$scope", "$interval", function($scope, $interval) {
      var date_to_time, promise;
      date_to_time = function(d) {
        return d.toTimeString().substring(0, 8);
      };
      promise = void 0;
      (function() {
        var animPromise;
        return animPromise = $interval(function() {
          var current_date;
          current_date = new Date;
          $scope.time = date_to_time(current_date);
          return $scope.integer = $scope.time.replace(/:/g, "");
        }, 1000);
      })();
      $scope.$on("$destroy", function() {
        return $interval.cancel(promise);
      });
      $scope.time = date_to_time(new Date);
      $scope.integer = date_to_time(new Date).replace(/:/g, "");
      $scope.factors = function(num) {
        var factors, i, quotient, _i, _ref;
        factors = [];
        i = 1;
        for (i = _i = 2, _ref = Math.sqrt(num); _i <= _ref; i = _i += 1) {
          quotient = num / i;
          if (quotient === Math.floor(quotient)) {
            factors.push(i);
          }
        }
        return factors;
      };
      return $scope.is_prime = function(num) {
        return numbers.prime.simple(num);
      };
    }
  ]);

}).call(this);
