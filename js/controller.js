/**
 * Created by Soundwave on 2/10/14.
 */

var init = (function(){

    function onReady(){
        $('#user-input-search').hide();
        $('#map-canvas').hide();
        $('#yelp-info').hide();

        mapFunctions.getLocation();

        $('#search-tab').click(function(){
            $('#user-input-search').show();
            $('#map-canvas').hide();
            $('#yelp-info').hide();

            var coordStr = $('#geolocation').text();
            var coordJson = $.parseJSON(coordStr);
            yelpFunctions.searchYelp("strip club",coordJson,40000);
        });

        $('#map-tab').click(function(){
            $('#user-input-search').hide();
            $('#map-canvas').show();
            $('#yelp-info').hide();

        });

        $('#results-tab').click(function(){
            $('#user-input-search').hide();
            $('#map-canvas').hide();
            $('#yelp-info').show();

        });
    }

    return {
        onReady:onReady
    }

})();
$(document).ready(init.onReady);