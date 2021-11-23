async function showGraph() {
    response = await fetch('/getgraph');
    dataDeathAndRegis = await response.json();
    //console.log(dataDeathAndRegis);
    i=0;
    dataDeathAndRegis.dates.forEach(d => {
        dataDeathAndRegis.dates[i] = d.slice(0,10);
        i++
    });
    console.log(dataDeathAndRegis.dates);

    const labels = dataDeathAndRegis.dates;
    const data = {
    labels: labels,
    datasets: [{
        label: 'Registered',
        backgroundColor: '#e3dbf2',
        borderColor: '#e3dbf2',
        data: dataDeathAndRegis.numRegistered,
    },
    {
        label: 'Deaths',
        backgroundColor: '#cf7c88',
        borderColor: '#cf7c88',
        data: dataDeathAndRegis.numDeaths,
        }
    ]
    };

    const config = {
    type: 'line',
    data: data,
    options: {
        responsive: true,
    }
    };

    const myChart = new Chart(
    document.getElementById('myChart'),
    config
    );
}

showGraph();