@app.controller "PrimetimeController", [
  "$scope", "$interval"
  ($scope, $interval) ->
    date_to_time = (d) ->
      return d.toTimeString().substring(0,8)



    promise   = undefined
    #The loop
    ( ->
      animPromise = $interval(->
        current_date    = new Date
        $scope.time     = date_to_time current_date
        $scope.integer  = $scope.time.replace(/:/g,"")
      , 1000))()

    
    # Make sure that the interval is destroyed too
    $scope.$on "$destroy", ->
      $interval.cancel(promise)


    #
    # Properties
    #
    $scope.time     = date_to_time(new Date)
    $scope.integer  = date_to_time(new Date).replace(/:/g,"")

    $scope.factors = (num) ->
      factors = []
      i = 1
      for i in [2..Math.sqrt(num)] by 1
        quotient = num / i
        factors.push i  if quotient is Math.floor(quotient)
      factors
  
    $scope.is_prime = (num) ->
      return numbers.prime.simple(num)

]
