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

}).controller('LocationAddController', function($scope, $state, $stateParams, StateService, MapService, Location) {

    $scope.location = new Location();
    $scope.createLocation = function() {
        $scope.location.$save(function() {
            $state.go('home');
        });
    };
    $scope.updateLocationInfo = function(locationObj) {
        MapService.updateLocationInfo($scope.location, locationObj);
    };
    $scope.gotoState = StateService.gotoState;


}).controller('HomeController', function($scope, $state, $stateParams, StateService, Location) {

    $scope.locations = Location.query();
    $scope.gotoState = StateService.gotoState;

}).controller('LocationListController', function($scope, $state, $stateParams, StateService, Location) {

    $scope.locations = Location.query(); //fetch all locations. Issues a GET to /api/loc
    $scope.gotoState = StateService.gotoState;

}).controller('MapListController', function($scope, $state, $stateParams, StateService, MapDocument) {

    $scope.maps = MapDocument.query();
    $scope.gotoState = StateService.gotoState;

}).controller('MapAddController', function($scope, $state, $stateParams, $log, StateService, MapService, MapDocument) {

    $scope.map = new MapDocument();
    $scope.mapWidget = new gb.ui.MapEdit(window, "map-widget", gb.ui.MapConfig.mapOptions, MapService);
    $scope.addLocation = function() {
        $scope.mapWidget.getGeoLocation();
    };
    $scope.createMap = function() {
        $scope.map.center = MapService.getCenter($scope.mapWidget);
        $scope.map.zoom = $scope.mapWidget.map.getZoom();
        $scope.map.$save(function() {
            $state.go('maps');
        });
    };

}).controller('MapEditController', function($scope, $state, $stateParams, $log, $modal, StateService, MapService, MapDocument, Location) {

    // note
    // ==========================
    // map -- document
    // mapWidget -- google map object.

    $scope.map = MapDocument.get({ id: $stateParams.id });
    $scope.mapWidget = null;

    // Save state and go back to list.
    $scope.updateMap = function() {
        $scope.map.center = MapService.getCenter($scope.mapWidget);
        $scope.map.zoom = $scope.mapWidget.map.getZoom();
        $scope.map.$update(function() {
            $state.go('maps');
        });
    };

    $scope.deleteMap = function(mapObj) {
        var modalInstance = $modal.open({
            animation: false,
            templateUrl: '/jade/maps/delete-map',
            controller: 'DeleteMapModalController',
            resolve: {
                map: function (){
                    $scope.map = mapObj;
                    return $scope.map;
                }
            }
        });
        modalInstance.result.then(function (map) {
            $scope.map = map;
            $scope.map.$delete(function() {
                $state.go('maps');
            });
            }, function (){});
    };

    $scope.addMarker = function() {
        $scope.mapWidget.getGeoLocation();
    };

    $scope.addLocation = function(location) {
        $scope.location = location;
        var modalInstance = $modal.open({
            animation: false,
            templateUrl: '/jade/maps/add-map-location',
            controller: 'AddMapLocationModalController',
            size: 'lg',
            resolve: {
                location: function (){
                    $scope.location = location;
                    return $scope.location;
                }
            }
        });
        modalInstance.result.then(function (location) {
            var locationDocument = new Location(location);
            $log.info("resolved map", $scope.map._id);
            locationDocument.map = $scope.map._id;
            locationDocument.$save($scope.mapWidget.addLocation(location));
        }, function () {
        });
    };

    $scope.editMapLocation = function(id) {
        var modalInstance = $modal.open({
            animation: false,
            templateUrl: '/jade/maps/edit-map-location',
            controller: 'EditMapLocationModalController',
            size: 'lg',
            resolve: {
                location: function (){
                    $scope.location = Location.get({id:id});
                    return $scope.location;
                }
            }
        });
        modalInstance.result.then(function (location) {
            $scope.location = location;
            $scope.location.$update();
        }, function (){});
    };

    $scope.updateLocationInfo = function(locationObj) {
        if (!$scope.location) {
            $scope.location = new Location();
        }
        MapService.updateLocationInfo($scope.location, locationObj);
    };

    // instantiate a mapWidget.
    $scope.loadMap = function(param) {
        $scope.map = MapDocument.get({ id: param.id }, function(mapObj){
            $scope.mapWidget = new gb.ui.MapEdit(window, "map-widget", mapObj, MapService);
        });
    };

    $scope.updateMapSetting = function(zoom, lat, lng) {
       $scope.map.zoom = zoom;
       $scope.map.center = {
           type: 'Point',
           coordinates: [lng, lat]
       };
    };

    $scope.loadMap($stateParams);

}).controller('DeleteMapModalController',
    function ($scope, $modalInstance, map) {
        $scope.map = map;
        $scope.ok = function () {
            $modalInstance.close($scope.map);
        };
        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
}).controller('AddMapLocationModalController',
    function ($scope, $log, $modalInstance, location) {
        $scope.location = location;
        $scope.ok = function () {
            $modalInstance.close($scope.location);
        };
        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
}).controller('EditMapLocationModalController',
    function ($scope, $log, $modalInstance, location) {
        $scope.location = location;
        $scope.ok = function () {
            $modalInstance.close($scope.location);
        };
        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
});

