let map;
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 8,
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
    dates.forEach(patient => {
      addresshome.push(patient.addresshome);
    });
    addresstoCoords(addresshome)
    //setMarkers(coords)
}

const addresstoCoords = (address) => {
  console.log("addresstoCo")
  console.log(address);
  let coords = [[10.7583295, -74.791163502, 'red'],[10.6583295, -74.791163502, 'yellow'], ,[10.6583295, -74.691163502, 'pink']]
  axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
    params: {
      address:address[0]+' Barranquilla',
      key: ''}
  })
  .then(function (response) {
    coords.push([response.data.results[0].geometry.location.lat,response.data.results[0].geometry.location.lng, 'blue'])
    setMarkers(coords)
  })
  .catch(function (error) {
    console.log(error);
  })
  
}

// Loop through the results array and place a marker for each
// set of coordinates.
const setMarkers = (coords) => {
  //let coords = [[10.7583295, -74.791163502, 'red'],[10.6583295, -74.791163502, 'yellow'], ,[10.6583295, -74.691163502, 'pink']]
  console.log("setMarkers")
  console.log(coords)
  
  coords.forEach(function (info) {
    let url = "http://maps.google.com/mapfiles/ms/icons/";
    url += info[2] + "-dot.png";
    console.log(info[1], info[0])
    const latLng = new google.maps.LatLng(info[0], info[1]);
    new google.maps.Marker({
      position: latLng,
      map: map,
      icon: {
        url: url
      }
    });
  });
};

function mapView() {
  let toggle = document.querySelector('.map-container');
  toggle.classList.toggle('active')
}
