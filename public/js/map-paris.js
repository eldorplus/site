gb.Namespace(gb,"gb.ui.MapDemo");
gb.ui.MapDemo = new gb.Class();

/**
 * Prototype extension for computing distance
 * between two points in meters.
 * @param latlng
 * @returns {number}
 */
google.maps.LatLng.prototype.distanceFrom = function(latlng) {
    var lat = [this.lat(), latlng.lat()],
        lng = [this.lng(), latlng.lng()],
        R = 6378137,
        dLat = (lat[1]-lat[0]) * Math.PI / 180,
        dLng = (lng[1]-lng[0]) * Math.PI / 180,
        a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat[0] * Math.PI / 180 ) * Math.cos(lat[1] * Math.PI / 180 ) *
            Math.sin(dLng/2) * Math.sin(dLng/2),
        c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)),
        d = R * c;
    return Math.round(d);
};

/*
var loc1 = new GLatLng(52.5773139, 1.3712427);
var loc2 = new GLatLng(52.4788314, 1.7577444);
var dist = loc2.distanceFrom(loc1);
alert(dist/1000);
*/

gb.ui.MapConfig = {
    mapPath: "/img/map/",
    mapStyles: [
        {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
                { "color": "#4875b7" },
                { "lightness": 13 }
            ]
        },{
            "featureType": "water"  },{
            "elementType": "labels.text.fill",
            "stylers": [
                { "color": "#333333" }
            ]
        },
        {
            "featureType": "landscape.natural.terrain",
            "stylers": [
                { "hue": "#c3ff00" },
                { "saturation": -48 },
                { "lightness": -51 }
            ]
        },{
            "featureType": "road.highway",
            "stylers": [
                { "hue": "#ff6e00" },
                { "lightness": -1 },
                { "saturation": 5 }
            ]
        },{
            "featureType": "road.local",
            "stylers": [
                { "saturation": 21 },
                { "color": "#95cdcf" },
                { "lightness": 5 }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "labels.text",
            "stylers": [
                { "color": "#fff" }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "geometry",
            "stylers": [
                { "hue": "#ff8000" },
                { "color": "#e8be86" }
            ]
        }
    ],
    mapStyles2: [
        {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
                { "color": "#4875b7" },
                { "lightness": 13 }
            ]
        },{
            "featureType": "water"  },{
            "elementType": "labels.text.fill",
            "stylers": [
                { "color": "#333333" }
            ]
        },
        {
            "featureType": "landscape.natural.terrain",
            "stylers": [
                { "hue": "#c3ff00" },
                { "saturation": -48 },
                { "lightness": -51 }
            ]
        },{
            "featureType": "road.highway",
            "stylers": [
                { "hue": "#ff6e00" },
                { "lightness": -1 },
                { "saturation": 5 }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#dff1ee"
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#b1d7e8"
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#095e5f"
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "color": "#acf2f7"
                }
            ]
        },

        {
            "featureType": "road.arterial",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#ffffff"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#ffa75b"
                }
            ]
        }
    ],
    mapOptions: {
        center: new google.maps.LatLng(48.85340300000001,2.3487840000000233),
        zoom: 18,
        mapTypeControl: true,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.DEFAULT,
            mapTypeIds: [
                google.maps.MapTypeId.ROADMAP,
                google.maps.MapTypeId.TERRAIN
            ]
        },
        zoomControl: true,
        zoomControlOptions: {
            style: google.maps.ZoomControlStyle.SMALL
        }
    }
};
gb.ui.MapConfig.mapMarkers = [
    {
        url: gb.ui.MapConfig.mapPath + "pin14.png", // red
        size: new google.maps.Size(25, 45),
        origin: new google.maps.Point(0,0),
        anchor: new google.maps.Point(13, 45)
    },
    {
        url: gb.ui.MapConfig.mapPath + "pin4.png", // green
        size: new google.maps.Size(25, 45),
        origin: new google.maps.Point(0,0),
        anchor: new google.maps.Point(13, 45)
    },
    {
        url: gb.ui.MapConfig.mapPath + "pin10.png", // blue
        size: new google.maps.Size(25, 45),
        origin: new google.maps.Point(0,0),
        anchor: new google.maps.Point(13, 45)
    },
    {
        url: gb.ui.MapConfig.mapPath + "pin9.png", // orange
        size: new google.maps.Size(25, 45),
        origin: new google.maps.Point(0,0),
        anchor: new google.maps.Point(13, 45)
    },
    {
        url: gb.ui.MapConfig.mapPath + "pin6.png", // yello-green
        size: new google.maps.Size(25, 45),
        origin: new google.maps.Point(0,0),
        anchor: new google.maps.Point(13, 45)
    },
    {
        url: gb.ui.MapConfig.mapPath + "pin15.png", // sky blue
        size: new google.maps.Size(25, 45),
        origin: new google.maps.Point(0,0),
        anchor: new google.maps.Point(13, 45)
    }
];
gb.ui.MapConfig.mapMarkerStyles = {
    "53ca3a80": gb.ui.MapConfig.mapMarkers[0],
    "-662d500": gb.ui.MapConfig.mapMarkers[1],
    "3a98100": gb.ui.MapConfig.mapMarkers[2],
    "1939180": gb.ui.MapConfig.mapMarkers[3],
    "-2a77fa60": gb.ui.MapConfig.mapMarkers[4],
    "none": gb.ui.MapConfig.mapMarkers[5]
};
gb.ui.MapConfig.mapLayerNames = {
    "53ca3a80": "Food",
    "-662d500": "Art &amp; Museums",
    "3a98100": "Landmarks",
    "1939180": "Shops &amp; Markets",
    "-2a77fa60": "Specialty",
    "none": "None"
};

gb.ui.MapDemo.include({

    init: function(window, divID, formID, centerID, addID, homeID) {
        var that = this;

        this.queryRadius = 100;
        this.locations = {};
        this.styleHashes = {};
        this.geocoder = new google.maps.Geocoder();
        this.selectorMarker = null;

        this.initMap(divID);
        this.initButtons(formID, centerID, addID, homeID);
        this.getStyleFilters(that);
        $("#message").hide();
    },

    initButtons: function(formID, centerID, addID, homeID) {
        var that = this;
        this.geocodeButton = $("#"+formID+" #go");
        this.geocodeButton.on("click", function(evt){
            var value = $("#"+formID+" #address").val();
            that.geocode(that, value);
        });
        this.centerButton = $("#"+centerID);
        this.centerButton.on("click",function(){
            that.getGeoLocation(true);
        });
        this.addButton = $("#"+addID);
        this.addButton.on("click",function(){
            that.getGeoLocation(false);
        });
        this.homeButton = $("#"+homeID);
        this.homeButton.on("click",function(){
            that.panToHome();
        });
    },
    /**
     * Initialize map instance.
     * @param divID
     */
    initMap: function(divID) {
        var that = this;
        this.map = new google.maps.Map(document.getElementById(divID), gb.ui.MapConfig.mapOptions);
        this.map.setOptions({styles: gb.ui.MapConfig.mapStyles2});

        google.maps.event.addListener(that.map, 'bounds_changed', gb.util.throttle(function(){
            var bounds = that.map.getBounds(),
                neLatLng = bounds.getNorthEast(),
                swLatLng = bounds.getSouthWest(),
                neLatLngStr = neLatLng.lat() + "," + neLatLng.lng(),
                swLatLngStr = swLatLng.lat() + "," + swLatLng.lng();
            // console.log("bounds_changed", swLatLngStr, neLatLngStr);
            that.queryMarkersWithin(swLatLngStr, neLatLngStr);
        }, 1000));
        google.maps.event.addListener(that.map, 'click', gb.util.throttle(function(event){
            var latLng = event.latLng,
                clickCoord = latLng.lat()+","+latLng.lng();
            // console.log("lat,lng:",clickCoord);
            that.queryMarkersNearPoint(clickCoord, that.queryRadius);
        }, 500));
        google.maps.event.addListener(that.map, 'maptypeid_changed', function() {
            console.log("type changed", that.map.getMapTypeId());
        });
    },
    /**
     * Angular utility. Fetch the $scope.
     * @returns {*}
     */
    getAngularScope: function() {
        return angular.element(document.getElementById("screen")).scope();
    },
    /**
     * Go to an Angular state with parameters.
     * @param state
     * @param params
     */
    gotoAngularState: function(state, params) {
        var scope = this.getAngularScope();
        scope.$apply(function () {
            scope.gotoState(state, params);
        });
    },
    /**
     * Create a Google Map InfoWindow.
     * @param name
     * @returns {google.maps.InfoWindow}
     */
    createInfoWindow: function(name) {
        var contentString = '<div class="info"><p>'+name+'</p></div>';
        return new google.maps.InfoWindow({
            content: contentString
        });
    },
    /**
     * Create a marker.
     * @param icon
     * @param id
     * @param name
     * @param desc
     * @param lng
     * @param lat
     * @returns {google.maps.Marker}
     */
    createMarker: function(icon, id, name, desc, lng, lat) {
        var that = this,
            latLng = new google.maps.LatLng(lat,lng),
            marker = new google.maps.Marker({
                position: latLng,
                map: this.map,
                icon: icon,
                title: name
            }),
            infoWindow = this.createInfoWindow(name);

        google.maps.event.addListener(marker, 'mouseover', function() {
            infoWindow.open(that.map, marker);
        });

        google.maps.event.addListener(marker, 'mouseout', function() {
            infoWindow.close();
        });

        google.maps.event.addListener(marker, 'click', function() {
            that.map.panTo(latLng);
            that.gotoAngularState("editLocation", {"id":id});
        });

        return marker;
    },
    /**
     * Handle incoming response data from backend queries.
     * @param that
     * @param data
     */
    onQueryResponse: function(that, data) {
        if (data.length) {
            // var markerStyles = gb.util.getDedupedValuesByKey(data,"styleHash");
            // console.log("styles", markerStyles);
            for (var i=0, n=data.length; i<n; i++) {
                var item = data[i];
                that.addLocation(item);
            }
            that.filterLocationsByStyle();
        }
    },

    addLocation: function(location) {
        var id = location._id;
        if (!this.locations[id]) {
            // console.log("loc:", location.name);
            var coords = location.loc.coordinates,
                style = (location.styleHash) ? location.styleHash : "none",
                mapMarkerStyle = gb.ui.MapConfig.mapMarkerStyles[style];
            // used for filtering
            this.styleHashes[id] = style;
            this.locations[id] = this.createMarker(
                mapMarkerStyle,
                id,
                location.name,
                location.description,
                coords[0],
                coords[1]);
        }
    },
    /**
     * Query backend for locations near point.
     * @param ctr
     * @param dist
     */
    queryMarkersNearPoint: function(ctr, dist) {
        var that = this;
        // console.log("/api/loc/near/"+ctr+"/"+dist);
        $.ajax({
            url: "/api/loc/near/"+ctr+"/"+dist
        }).success(function(data){
            that.onQueryResponse(that, data);
        });
    },
    /**
     * Query backend for locations within two points.
     * @param swLatLng
     * @param neLatLng
     */
    queryMarkersWithin: function(swLatLng, neLatLng) {
        var that = this;
        // console.log("/api/loc/within/"+swLatLng+"/"+neLatLng);
        $.ajax({
            url: "/api/loc/within/"+swLatLng+"/"+neLatLng
        }).success(function(data){
            that.onQueryResponse(that, data);
        });
    },
    /**
     * Retrieve geolocation given a query string.
     * @param that
     * @param queryStr
     */
    geocode: function(that, queryStr) {
        that.geocoder.geocode({
            'address': queryStr,
            'bounds': that.map.getBounds()
        }, function(results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                var latLng = results[0].geometry.location;
                that.map.panTo(latLng);
                that.updateSelectorMarker(latLng, true);
            } else {
                that.showError('Geocode was not successful for the following reason: ' + status);
            }
        });
    },
    /**
     * Retrieve an address given a latitude and longitude.
     * @param lat
     * @param lng
     * @param onSuccess
     * @param onError
     */
    reverseGeocode: function(latLng, onSuccess, onError) {
        var that = this;
        this.geocoder.geocode({'latLng': latLng}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[1] && results[1].formatted_address &&
                    onSuccess && typeof onSuccess === 'function') {
                    onSuccess(results);
                } else {
                    that.showError("No results found.");
                }
            } else {
                that.showError('Geocoder failed due to: ' + status);
            }
        });
    },
    /**
     * The selector marker is a draggable
     * marker used to define new locations.
     *
     * @param latLng
     * @param draggable
     */
    updateSelectorMarker: function(latLng, draggable) {
        var that = this,
            newLatLng = null;
        /**
         * Let's notify the Angular side whenever the
         * user drags the marker on the map.
         * @param results
         */
        var onGeocoderResponse = function(results) {
            console.log("resolved:", results);
            that.gotoAngularState("addLocation");
            var locationObj = {
                    loc: {
                        coordinates: [newLatLng.lng(), newLatLng.lat()]
                    },
                    address: results[0].formatted_address,
                    name: results[1].formatted_address
                };
            // refresh angular
            var scope = that.getAngularScope();
            scope.$apply(function () {
                scope.updateLocationInfo(locationObj);
            });
        };

        var onError = function(message) {
            that.showError("message");
        };

        var onPositionUpdate = function() {
            newLatLng = that.selectorMarker.getPosition();
            that.map.panTo(newLatLng);
            that.reverseGeocode(newLatLng, onGeocoderResponse, onError);
        };

        /**
         * Replace previous instance.
         */
        if (this.selectorMarker) {
            this.selectorMarker.setMap(null);
            this.selectorMarker = null;
        }
        this.selectorMarker = new google.maps.Marker({
            map: this.map,
            position: latLng,
            draggable: draggable
        });
        google.maps.event.addListener(this.selectorMarker, 'click', onPositionUpdate);
        google.maps.event.addListener(this.selectorMarker, 'dragend', onPositionUpdate);
        onPositionUpdate();
    },

    /**
     *
     * @param detectLocation
     */
    getGeoLocation: function(detectLocation) {
        var that = this;

        var showPosition = function(latLng) {
            that.updateSelectorMarker(latLng, true);
        };
        /** either get the location from the browser
         *  or just use the current map center.
         */
        if (detectLocation && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position){
                showPosition(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
            });
        } else {
            showPosition(that.map.getCenter());
        }
    },

    showError: function(message) {
        $("#message").text(message).slideDown();
    },

    panToHome: function() {
        this.map.panTo(gb.ui.MapConfig.mapOptions.center);
    },
    getStyleFilters: function(that) {
        var countChecked = function() {
            var selected = [];
            $("#filter-form input:checked").each(function(){
                selected.push($(this).val());
            });
            // console.log("selected", selected);
            that.enabledList = selected;
            that.filterLocationsByStyle();
        };

        var filterForm = $("<form id='filter-form'></form>");

        for (var key in gb.ui.MapConfig.mapMarkerStyles) {
            var jq = $("<input type='checkbox'>"),
                name = key.replace("-",""),
                layerName = gb.ui.MapConfig.mapLayerNames[key],
                label = $("<label for='filter-"+name+"'>"+layerName+"</label>");

            jq.attr("id", "filter-"+name)
              .attr("value", key)
              .prop('checked', true);

            console.log(key, layerName);
            filterForm.append(jq).append(label);
        }
        $("#notes").append(filterForm);
        $("#filter-form input[type=checkbox]").on("click", countChecked);
        countChecked();
    },
    filterLocationsByStyle: function() {
        for (var item in this.locations) {
            if (this.enabledList.indexOf(this.styleHashes[item])>-1) {
                this.locations[item].setMap(this.map);
            } else {
                this.locations[item].setMap(null);
            }
        }
    }
});

var placeMarkerByAddress = function(addressObj, streetAddress) {
    geocoder.geocode( { 'address': streetAddress }, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
            var isOpen = false;
            var position = results[0].geometry.location;

            addressObj["latitude"] = position.lat().toFixed(5);
            addressObj["longitude"] = position.lng().toFixed(5);

            positions.push(new google.maps.LatLng(position.lat(), position.lng()));
            console.log('Success: ' + addressObj.address + ": " + position);
            var marker = new google.maps.Marker({
                map: map,
                position: position
            });

            var infoWindow = createInfoWindow(addressObj);

            google.maps.event.addListener(marker, 'mouseover', function() {
                infoWindow.open(map, marker);
            });

            google.maps.event.addListener(marker, 'mouseout', function() {
                infoWindow.close();
            });
        } else {
            console.log('Failed: ' + addressObj.address + ": " + status);
        }
    });
};
var zoomToFit = function() {
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0, n = positions.length; i < n; i++) {
        bounds.extend(positions[i]);
    }
    map.fitBounds(bounds);
};
var loadFromKml = function(map, url) {
    var layer = new google.maps.KmlLayer({
        url: 'http://media.suayan.com/geodata/paris.kml',
        map: map
    });
    google.maps.event.addListener(layer, 'click', function(kmlEvent) {
        var name = kmlEvent.featureData.name,
            id = kmlEvent.featureData.id,
            latLng = kmlEvent.latLng;
        $("#notes").html("<h2>"+name+"</h3><p>ID: "+id+"</p>");
        console.log("kmlEvent", kmlEvent);
    });
    map.data.loadGeoJson('http://media.suayan.com/geodata/paris.json');
};

google.maps.visualRefresh = true;
google.maps.event.addDomListener(window, 'load', function(){
    var parisMap = new gb.ui.MapDemo(window, "map-canvas", "geocode", "center", "add", "home");
});

