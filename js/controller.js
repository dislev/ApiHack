/**
 * Created by Soundwave on 2/10/14.
 */

var init = (function(){

    function onReady(){
        //$('#map-canvas').hide();
        //$('#yelp-info').hide();

        getLocation();
        googleMap();
    }

    return {
        onReady:onReady
    }

})();
$(document).ready(init.onReady);