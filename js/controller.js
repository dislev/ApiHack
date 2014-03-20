/**
 * Created by Soundwave on 2/10/14.
 */

var init = (function(){

    function onReady(){
        $('#user-input-search, #map-canvas, #yelp-info').hide();

        getLocation();

        $('#search-tab').click(function(){
            searchDisplay();
        });

        $('#map-tab').click(function(){
            mapDisplay(null);
        });

        $('#results-tab').click(function(){
            resultsDisplay();
        });

        $('form').submit(function(e){
            e.preventDefault();

            var yelpResults = searchYelp(null, null);
            mapDisplay(yelpResults);
        });

    }

    return {
        onReady:onReady
    }

})();
$(document).ready(init.onReady);

function searchDisplay(){
    $('#user-input-search').show();
    $('#map-canvas, #yelp-info').hide();

    $('#geolocation').text('Lat: '+ lat + '\n' + 'Long: ' + long);

}

function mapDisplay(yelpResults){
    $('#user-input-search, #yelp-info').hide();

    $('#map-canvas').show(function(){

        if(webMap == null){
            createMap(lat, long);
        }

        createLocationMarker(lat, long, myIcon);

        if(yelpResults != null){
            $.when(yelpResults).then(function(resp){
                makePinsFromResults(resp);
            });
        }
    });
}

function resultsDisplay(){
    $('#yelp-info').show();
    $('#map-canvas, #user-input-search').hide();


}