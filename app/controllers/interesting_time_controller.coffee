@app.controller "InterestingtimeController", [
  "$scope", "$interval"
  ($scope, $interval) ->
    date_to_time = (d) ->
      return d.toTimeString().substring(0,5)

    update_fact = (num) ->
      $.get "http://numbersapi.com/#{num}/math", (data) ->
        $scope.fact = data

    promise   = undefined
    #The loop
    ( ->
      animPromise = $interval(->
        current_date    = new Date
        $scope.time     = date_to_time current_date
        $scope.seconds  = current_date.getSeconds()
        $scope.integer  = $scope.time.replace(/:/g,"")
        update_fact($scope.integer) if $scope.seconds == 0
      , 1000))()

    
    # Make sure that the interval is destroyed too
    $scope.$on "$destroy", ->
      $interval.cancel(promise)


    #
    # Properties
    #
    $scope.time     = date_to_time(new Date)
    $scope.seconds  = (new Date).getSeconds()
    $scope.integer  = date_to_time(new Date).replace(/:/g,"")
    $scope.fact     = "..."
    update_fact($scope.integer)
]
