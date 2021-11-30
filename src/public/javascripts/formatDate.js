function convertUTCDateToLocalDate(date) {
    var newDate = new Date(date.getTime()+date.getTimezoneOffset()*60*1000);

    var offset = date.getTimezoneOffset() / 60;
    var hours = date.getHours();
    var date
    var time

    newDate.setHours(hours);

    y=newDate.getFullYear();
    c=newDate.getDate();
    mo=newDate.getMonth()+1;

    ho=newDate.getHours();
    min=newDate.getMinutes();    
    seg=newDate.getSeconds();
    //console.log("FECHA:" +y+"-"+mo+"-"+c+" "+ho+":"+min+":"+seg)
    
    date1 = y+"-"+mo+"-"+c;
    
    if (String(ho).length == 1){
        console.log('ho',ho);
        ho = '0'+ho;
    }
    if (String(min).length == 1){
        console.log('min',min);
        min = '0'+min;
    }
    if (String(seg).length == 1){
        console.log('seg',seg);
        seg = '0'+seg;
    }
    newDate= y+"-"+mo+"-"+c+" "+ho+":"+min+":"+seg;
    
    time1 = ho+":"+min+":"+seg;  

    obejetoDate = {
        timestamp: newDate,
        date: date1,
        time: time1
    }

    return obejetoDate;    
}