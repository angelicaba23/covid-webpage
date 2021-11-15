
const dgram = require('dgram');
const socket = dgram.createSocket('udp4');

const mysql = require('mysql');
require('dotenv').config()

const connection = mysql.createConnection({
    host: 'database-taxiflow.c3snnsd75urd.us-west-2.rds.amazonaws.com', // HOST NAME
    user: 'taxiflow', // USER NAME
    database: 'taxiflow', // DATABASE NAME
    password: 'taxiflow' // DATABASE PASSWORD
});

connection.connect(function(error){
    if(error){
        throw error;
    }else{
        console.log('DB connected')
    }
});


socket.on('listening', () => {
    console.log(`UDP server listening on port 9000`);
  });

socket.on('message',(message)=>{
    var m = 'message,'+ message;
    console.log(m);
    var infoMsg = m.split(',');
    console.log(infoMsg);

    const lat = infoMsg[1];
    const lon = infoMsg[2];
    const milliseconds = parseInt(infoMsg[3]);
    const dateObject = new Date(milliseconds);
    const strDate = dateObject.toISOString();
    var startTime = new Date(strDate);
    startTime =   new Date( startTime.getTime() + ( startTime.getTimezoneOffset() * 60000 ) );

    const date = strDate.substr(0,10);
    const time = strDate.substr(11,8);
    const timestamp = date + ' ' +time;
    const license_plate = infoMsg[4];
    const rpm = infoMsg[5];

    console.log(strDate);
    console.log(startTime);

    console.log(lat);
    console.log(lon);
    console.log(date);
    console.log(time);
    console.log(timestamp);
    console.log(license_plate);
    console.log(rpm);


    connection.query(`SELECT license_plate, idtaxi FROM taxiflow.taxi
                    WHERE license_plate="${license_plate}"`, function(error, rows){
        if(error){
            throw error;
        }else{
            rows.forEach(rows =>{
                console.log(rows);
                const idtaxi = rows.idtaxi;
                console.log(idtaxi);  
                
                connection.query(`INSERT INTO taxiflow.location (idtaxi, latitude, longitude, date, time, timestamp, rpm) VALUES ("${idtaxi}", "${lat}", "${lon}", "${date}", "${time}", "${timestamp}", "${rpm}")`, function(error, results){
                    if(error){
                        throw error; 
                    }else{
                        console.log("Added :", results);
                        };
                });

                connection.query(`SELECT * FROM taxiflow.location ORDER BY idlocation DESC`, function(error, rows){
                    if(error){
                        throw error;
                    }else{
                            location = rows[0]
                            console.log(location); 
                    };
                });
            });
        };
    });
});

socket.bind(process.env.UDPPORT)

