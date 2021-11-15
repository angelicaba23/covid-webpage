const map = L.map('map-template').setView([10.96854, -74.78132], 13)
const tileURL = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
var fetchurl = location.hostname;
L.tileLayer(tileURL).addTo(map)
let markeri = null
let markerf = null
let markersli = null
let popupMarker = null
let polyline = null
/*
var button = document.getElementById('button-trace');
*/
var button1 = document.getElementById('zoom');
var droplicence = document.getElementById('licence-id');
var dateInit = document.getElementById("datetime-1");
var dateFinal = document.getElementById("datetime-2");
 slideValue = document.querySelector("span");
 inputSlider = document.getElementById("sliderinput");
var licenses = [];
var polylines = [];

let ifslider = '0';


var markersi = L.markerClusterGroup({
	spiderfyOnMaxZoom: true,
	showCoverageOnHover: false,
	zoomToBoundsOnClick: false
});

var markersf = L.markerClusterGroup({
	spiderfyOnMaxZoom: true,
	showCoverageOnHover: false,
	zoomToBoundsOnClick: false
});

var markerss = L.markerClusterGroup({
	spiderfyOnMaxZoom: true,
	showCoverageOnHover: false,
	zoomToBoundsOnClick: false
});

function correctFormatWithoutT(letra) {
    var formatTime = 0;
    var dateTime = "";
    for (i = 0; i < letra.length; i++) {
        if (formatTime == 2) {
            break;
        } else {
            if (letra.charAt(i) == ":") {
                formatTime = formatTime + 1;
                dateTime += letra.charAt(i);
            } else if (letra.charAt(i) == "T") {
                dateTime += " ";
            } else {
                dateTime += letra.charAt(i);
            }
        }

    }
    return dateTime;
}


map.on('popupopen', async function () {
    licence = document.getElementById("licence-id");
    license = licence.options[licence.selectedIndex].text;

    var popup = polyline.getPopup();
    coordinates = [popup.getLatLng().lng.toFixed(4), popup.getLatLng().lat.toFixed(4),license]
    
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(coordinates)
    }
    //console.log(coordinates)
    const response = await fetch('/timestamp', options);
    const dates = await response.json();
    await popup.setContent(dates[dates.length - 1][3]+ '</br>' +'# de veces que pasó por aquí: ' + dates.length + '</br>' + 'Ultima vez: ' + dates[dates.length - 1][2], { maxWidth: "2px" });

    infoTimePos = dates;
    document.getElementById("allDataDiv").innerHTML = "";
     /*
    infoTimePos.forEach(function (onelatlngs) {
        let tag = document.createElement("p");
        let text = document.createTextNode("Fecha y hora: " + onelatlngs[2]);
        tag.appendChild(text);
        let tag2 = document.createElement("br");
        tag.appendChild(tag2);
        text = document.createTextNode("Latitud: " + onelatlngs[0] + " - Longitud: " + onelatlngs[1]);
        tag.appendChild(text);
        var element = document.getElementById("allDataDiv");
        element.appendChild(tag);
    })
    */
});


async function getHistory() {
    licence = document.getElementById("licence-id");
    license = licence.options[licence.selectedIndex].text;

    dateInit_1 = document.getElementById("datetime-1");
    dateFinal_1 = document.getElementById("datetime-2");

    dateInit = correctFormatWithoutT(dateInit_1.value)
    dateFinal = correctFormatWithoutT(dateFinal_1.value)

    const data = [dateInit, dateFinal, license];

    if (dateInit_1.value == "" || dateFinal_1.value == "") {

        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Por favor ingresar fechas'
        })

    } else if (dateInit_1.value > dateFinal_1.value) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'La fecha inicial es mayor a la fecha final, por favor corrija las fechas. '
        })

        if (polylines) {
            polylines.forEach(function (item) {
                map.removeLayer(item)
            });
        }
        if (markersi) {
            markersi.clearLayers();
            markersf.clearLayers();
        }

    } else {

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
        const response = await fetch('/dates', options);
        const dates = await response.json();
        //console.log(dates)
        latlngs = dates.latlon;
        if (Object.keys(latlngs).length === 0) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No se encontraron registros'
            })
        }
        else {
            if (polylines) {
                polylines.forEach(function (item) {
                    map.removeLayer(item)
                });
            }
            if (markersi) {
                markersi.clearLayers();
                markersf.clearLayers();
            }
            

            licenses = Object.keys(latlngs)
            if (licenses.length ==1){
                ifslider = latlngs[licenses]['Location'].length;
            }
            //console.log(latlngs);
            licenses.forEach(e => {console.log(latlngs[e]['Location'][0])
                markeri = L.marker(latlngs[e]['Location'][0]).bindPopup('Placa: ' + e +'<br/>' + 'Posición inicial: ' + latlngs[e]['Location'][0])
                markerf = L.marker(latlngs[e]['Location'][latlngs[e]['Location'].length - 1]).bindPopup('Placa: ' + e +'<br/>' + 'Posición final: ' + latlngs[e]['Location'][latlngs[e]['Location'].length - 1])
                polyline = L.polyline(latlngs[e]['Location'], { color: latlngs[e]['Color'], smoothFactor: 0.5 }).bindPopup()
                polylines.push(polyline);
                polyline.addTo(map)
                markersi.addLayer(markeri);
                map.addLayer(markersi);
                markersf.addLayer(markerf);
                map.addLayer(markersf);
                //console.log(latlngs[e])
                vectorPoly = latlngs[e]['Location'];
                vectorDate = latlngs[e]['Date'];
                vectorRPM = latlngs[e]['RPM'];
            });

            document.getElementById("sliderValue").innerHTML = "";
            document.getElementById("value left").innerHTML = "";
            document.getElementById("value right").innerHTML = "";
            document.getElementById("sliderinput").type = "hidden";
            document.getElementById("sliderInfo").innerHTML = "";
            if (document.getElementById("licence-id").value != 0){
                //document.getElementById("sliderintput").remove();
                getSliders();
            }
        }
    }
}

async function getL() {
    response = await fetch('http://' + fetchurl + '/live');
    coordinates = await response.json();
    currentInfo = coordinates.currentInfo

    var fecha = new Date();
    var month = String(fecha.getUTCMonth()+1);
    var day = String(fecha.getUTCDate());
    var year = fecha.getFullYear();
    if (day.length == 1){
        day = 0+day
    }
    if (month.length == 1){
        month = 0+month
    }
    dateNowFinal = year+"-"+month+"-"+day+"T"+"23:59" ;
    
    month = String(month-2)
    if (month.length == 1){
        month = 0+month
    }
    dateNowInit = year+"-"+month+"-"+day+"T"+"00:00" ;
    
    document.getElementById("datetime-1").value = dateNowInit;
    document.getElementById("datetime-2").value = dateNowFinal;
    

    currentInfo.forEach(function (info) {
        licenses[licenses.length] = info.license_plate;
    });

    document.getElementById("licence-id").innerHTML = "";

    var i = 0;
    let tag = document.createElement("option");
    tag.value = i;
    let text = document.createTextNode("TODO");
    tag.appendChild(text);
    var element = document.getElementById("licence-id");
    element.appendChild(tag);

    licenses.forEach(function (license) {
        i++
        tag = document.createElement("option");
        tag.value = i;
        text = document.createTextNode(license);
        tag.appendChild(text);

        element = document.getElementById("licence-id");
        element.appendChild(tag);
        getHistory();
    })

}

function getSliders() {
    slideValue = document.createElement("span");
    slideValue.textContent = 1;
    element = document.getElementById("sliderValue");
    element.appendChild(slideValue);

    valueLeft = document.getElementById("value left");
    valueLeft.innerText = 1;

    valueRight = document.getElementById("value right");
    valueRight.innerText = ifslider;

    sliderInput = document.getElementById("sliderinput");
    sliderInput.max = ifslider;
    sliderInput.type = "range";
    /*

    if (document.getElementById("sliderinput") == null) {
        tag = document.createElement("input");
        tag.type = "range";
        tag.min = 1;
        tag.max = ifslider;
        tag.id = "sliderinput";
        tag.setAttribute("value", "1");
        tag.setAttribute("steps", "1");
        element = document.getElementById("field slider");
        element.insertBefore(tag, element.childNodes[2]);
    }else{
        sliderInput = document.getElementById("sliderinput");
        sliderInput.max = ifslider;
    }
    */
   
        
    document.getElementsByTagName("head")[0].insertAdjacentHTML(
        "beforeend",
        "<link rel=\"stylesheet\" href=\"/stylesheets/slider.css\" />");

    console.log(ifslider);
}

/*
button.addEventListener('click', function () {
    getHistory();
});
*/
button1.addEventListener('click', function () {
    map.setView([10.9583295,-74.791163502], 12);
});

droplicence.addEventListener("change", function () {
    getHistory();
});
dateInit.addEventListener("change", function () {
    getHistory();
});
dateFinal.addEventListener("change", function () {
    getHistory();
});

getL();

function funSlider() {
    value = inputSlider.value;
    slideValue.textContent = value;
    slideValue.style.left = (value/ifslider*100) + "%";
    slideValue.classList.add("show");
    //console.log(value)
    //console.log(slideValue)
    let tag = document.createElement("p");
    text = document.createTextNode(vectorDate[value-1] + " - " + vectorPoly[value-1]+ " - " +vectorRPM[value-1]+ " RPM ");
    tag.appendChild(text);
    var element = document.getElementById("sliderInfo");
    element.appendChild(tag); 

    var taxiIcon = L.icon({
        iconUrl: '/images/taxiicon.png',
        //shadowUrl: 'leaf-shadow.png',
    
        iconSize:     [20, 17], // size of the icon
        //shadowSize:   [50, 64], // size of the shadow
        iconAnchor:   [18, 15], // point of the icon which will correspond to marker's location
        //shadowAnchor: [4, 62],  // the same for the shadow
        //popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    });
    /*
    L.marker([vectorPoly[value-1]], {icon: taxiIcon}).addTo(map);
    */

    markersli = L.marker(vectorPoly[value-1], {icon: taxiIcon, draggable: 'false'}, )
    map.addLayer(markersli);
};

inputSlider.oninput = (()=>{
    document.getElementById("sliderInfo").innerHTML = "";
    if(markersli){
        map.removeLayer(markersli);
    }
    funSlider();
});

inputSlider.onblur = (()=>{
    slideValue.classList.remove("show");
});

