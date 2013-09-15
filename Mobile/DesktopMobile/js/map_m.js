function initialize() {
  var mapOptions = {
    zoom: 16,
    center: new google.maps.LatLng(42.1122157, 14.7098139),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }
  var map = new google.maps.Map(document.getElementById('map_canvas'),
                                mapOptions);

  var image = 'img/icon.png';
  var myLatLng = new google.maps.LatLng(42.1122157, 14.7098139);
  var beachMarker = new google.maps.Marker({
      position: myLatLng,
      map: map,
      icon: image
  });
}

google.maps.event.addDomListener(window, 'load', initialize);