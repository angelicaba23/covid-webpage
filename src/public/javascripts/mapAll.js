let map;
var markers;
async function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 12,
    center: new google.maps.LatLng(10.9583295, -74.791163502),
  });
  getAddress();
  //setMarkers(results)
}

async function getAddress(idcase = '', name = '', id = '') {
    const data = [idcase,name,id];
    console.log(data);

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    const response = await fetch('/links/filter', options);
    console.log(response);
    const dates = await response.json();
    console.log(dates);
    addresshome = [];
    colorhome = [];
    dates.forEach(patient => {
      addresshome.push(patient.addresshome);
      colorhome.push(patient.color);
    });
    
    addresstoCoords(addresshome, colorhome)
    //setMarkers(coords)
}

const addresstoCoords = (address, color) => {
  console.log("addresstoCo")
  console.log(address);
  let coords = []
  
  address.forEach(function (info,s) {
  console.log(s, info)
  axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
    params: {
      address: info +' Barranquilla',
      key: "AIzaSyF18bdRVDFU"}
  })
  .then(function (response) {
    coords = [response.data.results[0].geometry.location.lat,response.data.results[0].geometry.location.lng, color[s], s, info]
    addMarkers(coords);
  })
  .catch(function (error) {
    console.log(error);
  })
  });
}

// Loop through the results array and place a marker for each
// set of coordinates.
const addMarkers = (coords) => {
  //let coords = [[10.7583295, -74.791163502, 'red'],[10.6583295, -74.791163502, 'yellow'], ,[10.6583295, -74.691163502, 'pink']]
  console.log("setMarkers")
  let url = "http://maps.google.com/mapfiles/ms/icons/";
  url += coords[2] + "-dot.png";
  console.log(coords)
  const latLng = new google.maps.LatLng(coords[0], coords[1]);
  const marker = new google.maps.Marker({
    position: latLng,
    map: map,
    icon: {
      url: url
    }
  });
  //markers.push(marker);
}


function mapView() {
  let toggle = document.querySelector('.map-container');
  toggle.classList.toggle('active')
}
