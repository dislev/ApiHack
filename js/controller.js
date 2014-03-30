/**
 * Created by Soundwave on 2/10/14.
 */

var init = (function(){

    var DEFAULT_RADIUS = 10;

    function onReady(){
        $('#map, #results').hide();
        $('#search').show();

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
            var keyword = $('#criteria').val();
            var radius = $('#radius').val();

            if (radius == ""){
                radius = DEFAULT_RADIUS;
            }

            if(keyword != ""){
                var yelpResults = searchYelp(keyword, radius);
                $('#search-tab').removeClass("active");
                $('#map-tab').addClass("active");
                mapDisplay(yelpResults);
            }
            else{
                $('#criteria').effect( "pulsate" );
                $('#criteria').attr('placeholder', "Enter a Valid Value");
            }
        });

        if (marker != null){
            marker.on('click', function() {
                maker.openPopup();
            });
        }
    }

    return {
        onReady:onReady
    }

})();
$(document).ready(init.onReady);

function searchDisplay(){
    $('#search').show();
    $('#map, #results').hide();

    $('#geolocation').text('Lat: '+ lat + '\n' + 'Long: ' + long);
}

function mapDisplay(yelpResults){
    $('#search, #results').hide();

    $('#map').show(function(){

        if(webMap == null){
            createMap(lat, long);
        }

        createLocationMarker(lat, long, 'Current Location', '');

        if(yelpResults != null){
            $.when(yelpResults).then(function(resp){
                makePinsFromResults(resp);
            });
        }
    });
}

function resultsDisplay(){
    $('#results').show();
    $('#map, #search').hide();
}