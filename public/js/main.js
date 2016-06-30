$(function initializeMap (){

  var fullstackAcademy = new google.maps.LatLng(40.705086, -74.009151);

  var styleArr = [{
    featureType: 'landscape',
    stylers: [{ saturation: -100 }, { lightness: 60 }]
  }, {
    featureType: 'road.local',
    stylers: [{ saturation: -100 }, { lightness: 40 }, { visibility: 'on' }]
  }, {
    featureType: 'transit',
    stylers: [{ saturation: -100 }, { visibility: 'simplified' }]
  }, {
    featureType: 'administrative.province',
    stylers: [{ visibility: 'off' }]
  }, {
    featureType: 'water',
    stylers: [{ visibility: 'on' }, { lightness: 30 }]
  }, {
    featureType: 'road.highway',
    elementType: 'geometry.fill',
    stylers: [{ color: '#ef8c25' }, { lightness: 40 }]
  }, {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{ visibility: 'off' }]
  }, {
    featureType: 'poi.park',
    elementType: 'geometry.fill',
    stylers: [{ color: '#b6c54c' }, { lightness: 40 }, { saturation: -40 }]
  }];

  var mapCanvas = document.getElementById('map-canvas');

  var currentMap = new google.maps.Map(mapCanvas, {
    center: fullstackAcademy,
    zoom: 13,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: styleArr
  });

  var iconURLs = {
    hotel: '/images/lodging_0star.png',
    restaurant: '/images/restaurant.png',
    activity: '/images/star-3.png'
  };

  function drawMarker (type, coords) {
    var latLng = new google.maps.LatLng(coords[0], coords[1]);
    var iconURL = iconURLs[type];
    var marker = new google.maps.Marker({
      icon: iconURL,
      position: latLng
    });
    marker.setMap(currentMap);
    return marker;
  }

  // drawMarker('hotel', [40.705137, -74.007624]);
  // drawMarker('restaurant', [40.705137, -74.013940]);
  // drawMarker('activity', [40.716291, -73.995315]);

  // LOCATION ARRAYS
  var hotelarr = [];
  for (var key in hotels) {
    var hotel = hotels[key];
    // console.log(hotel)
    hotelarr[hotel.name] = hotel.place.location;
  }
  var restaurantarr = [];
  for (var key in restaurants) {
    var restaurant = restaurants[key];
    // console.log(hotel)
    restaurantarr[restaurant.name] = restaurant.place.location;
  }
  var activityarr = [];
  for (var key in activities) {
    var activity = activities[key];
    // console.log(hotel)
    activityarr[activity.name] = activity.place.location;
  }

// ARRAY OF MAP MARKERS
 var gmarkers = {};

// CLICKING '+' BUTTON ADDS ITINERARY ITEM TO ITINERARY
  $('button').on('click', function() {
    var marker;
    var theButton = ($(this));
    var theSelect = (theButton.prev());
    var idOfTheSelect = (theSelect.attr('id'));
    var type = $(theSelect).data('type');
    var value = $(theSelect).val();
    $( 'div.itinerary-item#' + idOfTheSelect + '').append('<span class="title">' + value + '</span> <button class="btn btn-xs btn-danger remove btn-circle pull-right">x</button>');
    if (type === 'hotel') {
      marker = drawMarker('hotel', hotelarr[value]);
    } else if (type === 'restaurant') {
      marker = drawMarker('restaurant', restaurantarr[value]);
    } else if (type === 'activity') {
      marker = drawMarker('activity', activityarr[value]);
    }
    gmarkers[value] = marker;
  });

// CLICKING 'x' BUTTON REMOVES ITINERARY ITEM FROM ITINERARY
  $('#itinerary').on('click', '.remove', '.title', function () {
    var prev = $(this).prev();
    var name = $(prev)[0].innerHTML;
    $(prev).remove();
    $(this).remove();

    gmarkers[name].setMap(null);
    delete gmarkers[name];
  });

var daysArr = [];
var itineraryDayObj = {};

// CLICKING A DAY BUTTON HIGHLIGHTS IT
$('div.day-buttons').on('click', '.not-add', function() {
  $(this).toggleClass('clicked');
  $(this).siblings().removeClass('clicked');
});

// CLICKING '+' BUTTON ADDS A DAY BUTTON TO ITINERARY
  $('#day-add').on('click', function() {
    var before = $('#day-add').prev();
    var num = parseInt(before[0].innerHTML, 10);
    before.after('<button class="btn btn-circle day-btn not-add">' + (num + 1) + '</button>');
  });

});
