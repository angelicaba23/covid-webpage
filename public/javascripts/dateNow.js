function mostrar_fecha(){
    var fecha = new Date();
    var month = fecha.getUTCMonth()+1;
    var day = fecha.getUTCDate();
    var year = fecha.getFullYear();
    dateNowInit = year+"-"+month+"-"+day+"T"+"00:00" ;
    dateNowFinal = year+"-"+month+"-"+day+"T"+"23:59" ;
    
    document.getElementById("datetime-1").value = dateNowInit;
    document.getElementById("datetime-2").value = dateNowFinal;
    
    console.log('fecha ok'+dateNowInit+dateNowFinal)
    return ([dateNowInit,dateNowFinal])
}


dateNow = mostrar_fecha();

