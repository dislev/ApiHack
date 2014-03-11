/**
 * Created by Soundwave on 2/10/14.
 */
var mapFunctions = (function(){

    function getLocation(){

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(getPos, onError);
        }

     }

    function getPos(position){
        var lat = position.coords.latitude;
        var long = position.coords.longitude;

        $('#geolocation').text("{\"Latitude\":"+ lat + "," + "\"Longitude\":" + long +"}");

        var userLocation = userLatLng(lat, long);
        var webMap = googleMap(userLocation);
        createLocationMarker(webMap, userLocation);
    }

    function onError(){
        alert("Browser did not support geolocation");
    }

    function googleMap(userLocale){

        var myOptions = {
            zoom : 16,
            center : userLocale,
            mapTypeId : google.maps.MapTypeId.ROADMAP
        };

        return new google.maps.Map(document.getElementById("map-canvas"), myOptions);
    }

    function userLatLng(latitude, longitude){
        return  new google.maps.LatLng(latitude, longitude);
    }

    function createLocationMarker(mapObj, userLocale){
        new google.maps.Marker({
            map: mapObj,
            position: userLocale
        });
    }

    return{
      getLocation:getLocation
    }

})();

var yelpFunctions = (function(){

    var yelpApiEndPoint = "http://api.yelp.com/v2/search";

    var auth = {
        consumerKey: "eijVNVNlhAlvGVh3CkihCQ",
        consumerSecret: "fYQqJ8HDfCO-_YF5vEq7vTY7wGw",
        accessToken: "wU97t7G2_hIZ2uyFM_K_U8XRhkDrP4qk",
        accessTokenSecret: "9I8b13XIH2b6U-QPvWD9QZdv5Uo",
        serviceProvider: {
            signatureMethod: "HMAC-SHA1"
        }
    };

    var accessor = {
        consumerSecret: auth.consumerSecret,
        tokenSecret: auth.accessTokenSecret
    };

    function searchYelp(keyword, jsonCoord, radius){

        var x = jsonCoord['Latitude'];
        var y = jsonCoord['Longitude'];

        params = [];
        params.push(['term', keyword]);
        params.push(['ll', x + ',' + y]);
        params.push(['radius_filter', radius]);
        params.push(['callback', 'cb']);
        params.push(['oauth_consumer_key', auth.consumerKey]);
        params.push(['oauth_consumer_secret', auth.consumerSecret]);
        params.push(['oauth_token', auth.accessToken]);
        params.push(['oauth_signature_method', 'HMAC-SHA1']);

        var message = {
            action: yelpApiEndPoint,
            method: 'GET',
            parameters: params
        };

        OAuth.setTimestampAndNonce(message);
        OAuth.SignatureMethod.sign(message, accessor);

        var parameterMap = OAuth.getParameterMap(message.parameters);
        parameterMap.oauth_signature = OAuth.percentEncode(parameterMap.oauth_signature)
        console.log(parameterMap);

        $.ajax({
            'url': message.action,
            'data': parameterMap,
            'cache': true,
            'dataType': 'jsonp',
            'jsonpCallback': 'cb',
            'success': function(data, textStats, XMLHttpRequest) {
                console.log(data);
                var output = JSON.stringify(data);
                alert(output);
            }
        });
    }

    return{
        searchYelp:searchYelp
    }
})();


