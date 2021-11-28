const filterIDcase = document.getElementById('filterIDcase');
const filterName = document.getElementById('filterName');
const filterID = document.getElementById('filterID');


//document.getElementById("numPos").innerHTML = "";
//document.getElementById("numNeg").innerHTML = "";

async function filterPatients(idcase, name, id) {
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
    
    let div = document.getElementById("tbody");
    div.innerHTML = "";
    dates.forEach(patient => {
        div.innerHTML += "<tr>"+
                            "<td>"+patient.idcase+"</td>"+
                            "<td>"+patient.name+" "+patient.lastname+"</td>"+

                            "<td>"+
                            '<button class="patientState" style="background:'+patient.color+'";>'+
                            '<a href="/links/intern/'+patient.idcase+'"class="patientState">'+patient.state+'</a>'+
                            "</button>"+
                            "</td>"+
                            "<td>"+patient.addresshome+"</td>"+
                            "<td>"+patient.covidresult+"</td>"+
                            "<td>"+patient.datestate+"</td>"+
                         "</tr>"
    });
}

filterIDcase.addEventListener('change',  function () {
    filterPatients(filterIDcase.value, filterName.value, filterID.value);
});

filterName.addEventListener('change',  function () {
    filterPatients(filterIDcase.value, filterName.value, filterID.value);
});

filterID.addEventListener('change',  function () {
    filterPatients(filterIDcase.value, filterName.value, filterID.value);
});