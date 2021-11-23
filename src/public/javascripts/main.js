async function showGraph() {
    response = await fetch('/getgraph');
    dataDeathAndRegis = await response.json();
    //console.log(dataDeathAndRegis);
    i=0;
    dataDeathAndRegis.dates.forEach(d => {
        dataDeathAndRegis.dates[i] = d.slice(0,10);
        i++
    });
    //console.log(dataDeathAndRegis.dates);

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

async function showPie() {
    response = await fetch('/getpie');
    data = await response.json();
    console.log(data);

    index = [];
    var totalCases = 0;
    data.responseTotal.forEach(function (value, i){
        if (value.state == 'Death' || value.state == 'Cured'){
            index.push(i);
        }
        totalCases = totalCases + value.total;
    });
    console.log(index);
    totalInfected = totalCases - data.responseTotal[index[0]].total - data.responseTotal[index[1]].total 
    dataLabels = ['Infected'];
    dataData = [totalInfected];
    dataBGColor = ['#B1D4F2'];
    index.forEach(i =>{
        dataLabels.push(data.responseTotal[i].state);
        dataData.push(data.responseTotal[i].total);
        dataBGColor.push(data.responseTotal[i].color);
    })

    const data1 = {
        labels: dataLabels,
        datasets: [{
          data: dataData, 
          backgroundColor: dataBGColor,
          hoverOffset: 4
        }]
    };

    const config1 = {
        type: 'pie',
        data: data1,
      };
      
    const myChart1 = new Chart(
    document.getElementById('myPie1'),
    config1
    );

    index = [];
    data.responseTotal.forEach(function (value, i){
        if (value.state == 'In Hospital Treatment' || value.state == 'In Home Treatment' || value.state == 'Death' || value.state == 'In ICU'){
            index.push(i);
        }
    });
    console.log();
    dataLabels = [];
    dataData = [];
    dataBGColor = [];
    index.forEach(i =>{
        dataLabels.push(data.responseTotal[i].state);
        dataData.push(data.responseTotal[i].total);
        dataBGColor.push(data.responseTotal[i].color);
    })

    const data2 = {
        labels: dataLabels,
        datasets: [{
          data: dataData, 
          backgroundColor: dataBGColor,
          hoverOffset: 4
        }]
    };

    const config2 = {
        type: 'pie',
        data: data2,
      };
      
    const myChart2 = new Chart(
    document.getElementById('myPie2'),
    config2
    );


    const data3 = {
        labels: [
            data.responsePosNeg[0].state,
            data.responsePosNeg[1].state
        ],
        datasets: [{
          data: [
              data.responsePosNeg[0].total,
              data.responsePosNeg[1].total
          ], 
          backgroundColor: [
            '#cf7c88',
            '#e3dbf2'
          ],
          hoverOffset: 4
        }]
    };

    const config3 = {
        type: 'pie',
        data: data3,
      };

    const myChart3 = new Chart(
    document.getElementById('myPie3'),
    config3
    );
}

showGraph();
showPie();