/**
 * Created by Soundwave on 2/10/14.
 */

    var webMap;
    var lat;
    var long;
    var myIcon = L.icon({
        iconUrl: 'framework/viewer.png',
        iconSize: [38, 95],
        iconAnchor: [22, 94],
        popupAnchor: [-3, -76]
    });

    function getLocation(){

        if (navigator.geolocation) {
            var deferred = $.Deferred();

            navigator.geolocation.getCurrentPosition(deferred.resolve, deferred.reject);

            $.when(deferred).then(function(resp){
                getPos(resp);
            });
        }

     }

    function getPos(position){
        lat = position.coords.latitude;
        long = position.coords.longitude;
    }

    function createMap(lat, long){

        var map = L.map('map-canvas', {
            center: [lat, long],
            zoom: 16
        });

        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        webMap = map;
    }

    function createLocationMarker(lat, long, icon){
        if(icon != null){
            L.marker([lat, long],{icon: icon}).addTo(webMap);
        }
        else{
            L.marker([lat, long]).addTo(webMap);
        }
    }

    function makePinsFromResults(data){
        var businesses = data['businesses'];
        var name;
        var location;
        var businessArr;

        for (var i in data['businesses']){
            location = businesses[i].location;
            name = businesses[i].name;
            businessArr = [name, location.address[0], location.city, location.state_code, location.postal_code];

            console.log(businessArr);
            createPinOnMap(businessArr);
        }
    }

    function createPinOnMap(business){
        var respObj;
        var businessLoc =  $.getJSON(
            "http://nominatim.openstreetmap.org/search/" + business[1] +","+ business[2] +","+ business[3] +","+ business[4]+"?format=json"
        );

        $.when(businessLoc).then(function(resp){
            respObj = resp[0];
            createLocationMarker(respObj['lat'], respObj['lon'], null)
        });
    }

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

        params = [];
        params.push(['term', 'bakery']);
        params.push(['ll', lat + ',' + long]);
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
                console.log(data);
                return data;
            },
            'error':function(data){
                console.log(data);
                return data;
            }
        });

        return yelpResults;
    }


