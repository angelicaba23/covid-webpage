const pool = require('../accedeDB');
const { database } = require('./keys');

const deathsRegistered = async (req, res) => {
    try {
        const response = await pool.query(`SELECT c.dateexam, count(c.idcase) as registered
                                           FROM covid.cases as c
                                           group by c.dateexam`);
        console.log(response);
        res.json(
            response)
    } catch (e) {
        console.error(e);
    }
};

module.exports = {
    deathsRegistered
}