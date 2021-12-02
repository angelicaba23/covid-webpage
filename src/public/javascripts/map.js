console.log("map")

let map;

function initMap() {
  var options = {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8
  };
  map = new google.maps.Map(document.getElementById("map"), options);
}