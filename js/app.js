/**
 * Created by Soundwave on 2/10/14.
 */

var googleApi = (function() {

    var browserSupportFlag =  new Boolean();
    var myOptions = {
        zoom: 6,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    function googleMaps(){
        var map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);
        Geolocation(map);
    };

    function Geolocation(map){
        if(navigator.geolocation) {
            browserSupportFlag = true;
            navigator.geolocation.getCurrentPosition(function(position) {
                var initPosition = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
                map.setCenter(initPosition);
            });
        };
    };

    return{
        googleMaps:googleMaps
    }

})();

var yelpApi = (function() {

    function yelpSearch(){
        console.log('yelp');
    };

    return{
        yelpSearch:yelpSearch
    }

})();