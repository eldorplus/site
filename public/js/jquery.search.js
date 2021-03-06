(function ($) {

    $.fn.search = function(options) {
        "use strict";

        var that = this;
        var intervalHandler = null;
        var previousTerm = null;

        var settings = $.extend({
            input: "search-field",
            results: "search-results",
            minchars: 4,
            requestInterval: 3000
        }, options);

        var showHeading = function(collectionName, count) {
            var heading = "<div class='heading'>" +
                    collectionName + ": " + count +
                    "</div>";
            that.resultsDiv.append(heading);
        };

        var showTracks = function(collectionName, data) {
            var tracks = data.tracks;
            if (data.count && tracks && tracks.length){
                showHeading(collectionName, data.count);
                for(var i= 0,n=tracks.length; i<n; i++) {
                    var track = "<div class='track'>" +
                        "<div class='title'>"+tracks[i].Name+"</div>" +
                        "<div class='normal'>"+tracks[i].Artist+"</div>" +
                        "<div class='normal'>"+tracks[i].Album+"</div>" +
                        "</div>";
                    that.resultsDiv.append(track);
                }
            }
        };

        var showTitle = function(collectionName, data) {
            var tracks = data.tracks;
            if (data.count && tracks && tracks.length){
                showHeading(collectionName, data.count);
                for(var i= 0,n=tracks.length; i<n; i++) {
                    var track = "<div class='track'>" +
                        "<div class='title'>" +
                        tracks[i]._id +
                        " <span class=\'count\'>"+ tracks[i].value + "</span>" +
                        "</div>" +
                        "</div>";
                    that.resultsDiv.append(track);
                }
            }
        };

        var hideResults = function() {
            that.resultsDiv.empty();
            that.resultsDiv.hide();
        };

        var showResults = function(response) {
            that.resultsDiv.show();
            var keys = response.keys;
            that.resultsDiv.empty();

            if (response.total) {
                var found = "<div class='found'>Found: " +
                    response.total + "</div>";
                that.resultsDiv.append(found);
                for (var i=0,n=keys.length;i<n;i++){
                    var collectionName = keys[i];
                    var data = response.data[collectionName];

                    if (response.data[collectionName].type==="find") {
                        showTracks(collectionName, data);
                    } else {
                        showTitle(collectionName, data);
                    }


                }
            } else {
                that.resultsDiv.append("<div class='none-found'>No results found.</div>");
            }
        };

        var requestQuery = function() {
            var term = that.searchInput.val().trim();
            if (term.length<settings.minchars) {
                hideResults();
                return;
            }
            if (term === previousTerm) {
                return;
            }
            previousTerm = term;
            var url = "/multi/"+term;
            $.ajax(url, {
                type: 'GET',
                dataType: 'json',
                success: function(response,status,jqxhr) {
                    console.log("success:", status);
                    showResults(response);
                }
            });
        };

        // call this when the window is resized
        this.onResize = function() {
            if (!that.searchInput) {
                return;
            }

            var pos = that.searchInput.position();
            var width = that.searchInput.outerWidth(true);
            var height = that.searchInput.outerHeight(true);
            that.resultsDiv.css({
                position: "absolute",
                top: (pos.top+height+10)+"px",
                left: pos.left+"px",
                width: width+"px",
                height: "600px"
            });
        };

        var init = function() {
            that.searchInput = $("#"+settings.input);
            if (typeof that.searchInput[0] === 'undefined') {
                return null;
            }
            if (!intervalHandler) {
                intervalHandler = setInterval(requestQuery, settings.requestInterval);
            }
            that.searchInput.after("<div id=\'"+settings.results+"\'></div>");
            that.resultsDiv = $("#"+settings.results);
            // reposition on window resize.
            that.onResize();
            that.resultsDiv.hide();

            // initialized.. return self.
            return that;
        };
        return init();
    };
}(jQuery));

$(function(){
    // Search Hookups.
    var $search = $("#search-field").search();
    if ($search) {
        $(window).resize(gb.util.throttle($search.onResize, 500));
    }
});