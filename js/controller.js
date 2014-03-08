/**
 * Created by Soundwave on 2/10/14.
 */

var init = (function(){

    function onReady(){
        //yelpApi.yelpSearch();
        googleApi.googleMaps();
    };

    return {
        onReady:onReady
    }

})();
$(document).ready(init.onReady);