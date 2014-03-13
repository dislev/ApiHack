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
            searchDisplay();
        });

        $('#map-tab').click(function(){
            mapDisplay();
        });

        $('#results-tab').click(function(){
            resultsDisplay();
        });

        $('form').submit(function(e){
            e.preventDefault();

            var yelpResults = yelpFunctions.searchYelp();
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
    $('#map-canvas').hide();
    $('#yelp-info').hide();

}

function mapDisplay(yelpResults){
    $('#user-input-search').hide();
    $('#map-canvas').show();
    $('#yelp-info').hide();

    $.when(yelpResults).then(function(resp){
        alert('inside deffered');
        mapFunctions.makePinsFromResults(resp);
    });

    alert('outside deffered');
}

function resultsDisplay(){
    $('#user-input-search').hide();
    $('#map-canvas').hide();
    $('#yelp-info').show();


}