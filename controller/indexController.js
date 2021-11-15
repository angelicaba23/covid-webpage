const getIndex = function (req, res, next) {
    res.render('index', { title: 'TaxiFlow' });
};
const getHistory = function (req, res, next) {
    res.render('historial', { title: 'Historial' });
};

module.exports = {
    getIndex,
    getHistory
}