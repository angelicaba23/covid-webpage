let map;
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 8,
    center: new google.maps.LatLng(10.9583295, -74.791163502),
  });

  getAddress()
  
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
    addresstoCoords(addresshome); 
}

const addresstoCoords = (address) => {
  console.log("addresstoCo")
  console.log(address);
}

// Loop through the results array and place a marker for each
// set of coordinates.

const setMarkers = (results) => {
    const coords = patient[i].coordinates;
    const latLng = new google.maps.LatLng(coords[1], coords[0]);
    console.log(latLng);
    new google.maps.Marker({
      position: latLng,
      map: map,
  });
};

function mapView() {
  let toggle = document.querySelector('.map-container');
  toggle.classList.toggle('active')
}
