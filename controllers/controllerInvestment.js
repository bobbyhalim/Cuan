let {Investment} = require('../models')

class ControllerInvestments {
    static home (req, res) {
        Investment.findAll()
            .then((investments) => {
                res.render('investment', {investments})
            })
            .catch((err) => {
                res.send(err)
            })
    }

    static formPosting (req, res) {

    }

    static addPosting (req, res) {

    }

    static Like (req, res) {

    }

    static Delete (req, res) {

    }
}

module.exports = ControllerInvestments