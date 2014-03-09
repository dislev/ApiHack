/**
 * Created by Soundwave on 2/10/14.
 */

function getLocation(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getPos, onError);
    }

    function getPos(position)
    {
        googleMap(position.coords.latitude, position.coords.longitude);
        alert(position.coords.latitude +", "+ position.coords.longitude)
    }

    function onError()
    {
        alert("Brower did not support geolocation");
    }
 }

function googleMap(latitude, longitude){

    var userLatLng = new google.maps.LatLng(latitude, longitude);

    var myOptions = {
        zoom : 16,
        center : userLatLng,
        mapTypeId : google.maps.MapTypeId.ROADMAP
    }

    var map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);

    google.maps.event.trigger(map, "resize");

    new google.maps.Marker({
        map: map,
        position: userLatLng
    });


}



