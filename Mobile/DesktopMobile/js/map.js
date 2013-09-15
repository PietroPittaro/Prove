var map;
var drogheria = new google.maps.LatLng(42.1122157, 14.7098139);

var MY_MAPTYPE_ID = 'custom_style';

var image = 'img/icon.png';

function initialize() {

  var featureOpts = [
    {
      featureType: "all",
      stylers: [
        { hue: "#a39d87" },
      ]
    },
    {
      featureType: "all",
      elementType: "label",
      stylers: [
        { lightness: 30 },
		{ saturation: -50 },
      ]
    },         
	{
      featureType: "administrative",
      elementType: "geometry",
	  stylers: [
       { lightness: 30 },
		{ saturation: -50 }
	 ]
    },
	{
      featureType: "administrative",
      elementType: "label",
	  stylers: [
       { visibility: "simplified" },
	 ]
    },
    {
      featureType: "water",
      stylers: [
        { hue: "#68b0a5" },
        { saturation: 10 },
        { lightness: -20 },
		
      ]
	},
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [
        { lightness: -20 },
		{ saturation: -50 }
      ]
    },
  
	{
      featureType: "transit",
      stylers: [
        { visibility: "off" }
      ]
    },
    {
      featureType: "landscape",
      elementType: "geometry",
      stylers: [
        { lightness: -40 },
      ]
    },
    {
      featureType: "poi",
      stylers: [
        { visibility: "off" },
      ]
    }
	
  ];

  var mapOptions = {
    zoom: 13,
    center: drogheria,
    mapTypeControlOptions: {
      mapTypeIds: [google.maps.MapTypeId.ROADMAP, MY_MAPTYPE_ID]
    },
    mapTypeId: MY_MAPTYPE_ID
  };

  map = new google.maps.Map(document.getElementById('map_canvas'),
      mapOptions);

  var styledMapOptions = {
    name: 'Custom Style'
  };

  var beachMarker = new google.maps.Marker({
      position: drogheria,
      map: map,
      icon: image
  });


  var customMapType = new google.maps.StyledMapType(featureOpts, styledMapOptions);

  map.mapTypes.set(MY_MAPTYPE_ID, customMapType);
}


google.maps.event.addDomListener(window, 'load', initialize);