/**
 * Created by Soundwave on 2/10/14.
 */
var mapFunctions = (function(){

    var webMap;
    var geocoder = new google.maps.Geocoder();

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
        webMap = googleMap(userLocation);
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

    function makePinsFromResults(data){
        var address;

        for (element in data['businesses']){
            address = element['display_address'];
            console.log(address);
            createPinOnMap(address);
        }
    }

    function createPinOnMap(address){

        geocoder.geocode( { 'address': address}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                new google.maps.Marker({
                    map: webMap,
                    position: results[0].geometry.location
                });
            }
            else {
                alert("Geocode was not successful for the following reason: " + status);
            }
        });
    }

    return{
      getLocation:getLocation,
      makePinsFromResults:makePinsFromResults
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

    function searchYelp(keyword, radius){
        var coordStr = $('#geolocation').text();
        var jsonCoord = $.parseJSON(coordStr);
        var x = jsonCoord['Latitude'];
        var y = jsonCoord['Longitude'];

        params = [];
        params.push(['term', 'hooker']);
        params.push(['ll', x + ',' + y]);
        params.push(['radius_filter', 40000]);
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

       var yelpResults =  $.ajax({
            'url': message.action,
            'data': parameterMap,
            'cache': true,
            'dataType': 'jsonp',
            'jsonpCallback': 'cb',
            'success': function(data){
                return data;
            },
            'error':function(data){
                console.log(data);
                alert(JSON.stringify(data));
                return data;
            }
        });

        return yelpResults;
    }

    return{
        searchYelp:searchYelp
    }
})();


