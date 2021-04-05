const sql = require('../db.js');


const Payment = function(user) {
    this.price = user.price;
}

Payment.get = (req, res) => {
    console.log("[Payment] - get request");
    res(null, null);
    return;
};

module.exports = Payment;