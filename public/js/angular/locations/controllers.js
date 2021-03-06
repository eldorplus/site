angular.module('app.controllers', [])
.controller('LocationViewController', function($scope, $state, $stateParams, StateService, Location) {

    // Issues a GET to /api/loc/:id
    $scope.location = Location.get({ id: $stateParams.id });

    $scope.gotoState = StateService.gotoState;

}).controller('LocationEditController', function($scope, $state, $stateParams, StateService, Location) {

    $scope.updateLocation = function() {
        $scope.location.$update(function() {
            $state.go('home');
        });
    };

    $scope.loadLocation = function() {
        $scope.location = Location.get({ id: $stateParams.id });
    };

    $scope.gotoState = StateService.gotoState;

    $scope.loadLocation($stateParams);

}).controller('LocationAddController', function($scope, $state, $stateParams, StateService, Location) {

    $scope.location = new Location();

    $scope.createLocation = function() {
        $scope.location.$save(function() {
            $state.go('home');
        });
    };

    $scope.updateLocationInfo = function(locationObj) {
        $scope.location.loc = locationObj.loc;
        $scope.location.address = locationObj.address;
        $scope.location.name = locationObj.name;
    };

    $scope.gotoState = StateService.gotoState;


}).controller('HomeController', function($scope, $state, $stateParams, StateService, Location) {

    $scope.gotoState = StateService.gotoState;

}).controller('LocationListController', function($scope, $state, $window, StateService, Location) {

    $scope.locations = Location.query(); //fetch all locations. Issues a GET to /api/movies
    $scope.gotoState = StateService.gotoState;

    console.log("locations", $scope.locations);
});