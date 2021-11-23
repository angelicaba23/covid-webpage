const pool = require('../accesDB');
const { database } = require('./keys');
var moment = require('moment'); // require
moment().format();
var twix = require('twix'); // require


const getGraph = async (req, res, next) => {
    try {
        let dates = [];
        let datesR = [];
        let datesD = [];
        const responseRegistered = await pool.query(`SELECT c.dateexam, count(c.idcase) as registered
                                                    FROM covid.cases as c
                                                    group by c.dateexam`);
        responseRegistered.forEach(dateInfo => {
            newDate = new Date(dateInfo.dateexam);
            dates.push(newDate);
            datesR.push(String(newDate));
        });
        const responseDeaths = await pool.query(`SELECT s.datestate, count(s.idcase) as deaths
                                                 FROM covid.statepatient as s
                                                 where s.state = 5
                                                 group by s.datestate`);
        responseDeaths.forEach(dateInfo => {
            newDate = new Date(dateInfo.datestate)
            dates.push(newDate);
            datesD.push(String(newDate));
        });
        var startDate = new Date(Math.min.apply(null, dates));
        var endDate = new Date(Math.max.apply(null, dates));
        //console.log('from: ', startDate, ' to: ', endDate)
        var itr = moment.twix(new Date(startDate), new Date(endDate)).iterate("days");
        var range = [];
        while (itr.hasNext()) {
            range.push(itr.next().toDate())
        }
        var numDeaths = [];
        var numRegistered = [];
        range.forEach(d => {
            indexR = datesR.indexOf(String(d));
            indexR == '-1' ? numRegistered.push(0) : numRegistered.push(responseRegistered[indexR].registered);
            indexD = datesD.indexOf(String(d));
            indexD == '-1' ? numDeaths.push(0) : numDeaths.push(responseDeaths[indexD].deaths);
        });
        res.json({
            dates: range,
            numRegistered: numRegistered,
            numDeaths: numDeaths
        });
    } catch (e) {
        console.error(e);
    }
};

module.exports = {
    getGraph
}