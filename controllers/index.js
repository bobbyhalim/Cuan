const {User, Profile, Company, Investment, Transaction} = require('../models')
const { comparePassword } = require('../helpers/bcrypt')

class Controller {

    static homePage(req, res){
        res.render('welcomePage')
    }

    static registerPage(req, res){
        res.render('formRegister')
    }

    static addDataUser(req, res){
        let dataUser = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        }
        // console.log(dataUser);

        User.create(dataUser)
        .then((user) => {
            let {username} = user
            let info = `${username} berhasil register, silahkan coba login`
            res.redirect('/user/login/?info=' + info)
        })
        .catch((err) => {
            res.send(err)
        });
    }

    static loginPage(req, res){
        let error = req.query.err || null
        let info = req.query.info || null  
        res.render('formLogin',{error, info})
    }

    static login(req, res){
        User.findOne({
            where: {
                username: req.body.username
            }
        })
        .then((user) => {
            if(user && comparePassword(req.body.password, user.password)) {
                // console.log(user);
                req.session.userid = user.id
                req.session.username = user.username
                res.redirect('/user/home')
                // res.render('userHome',{user})
                // res.send('berhasil login')
            } else {
                throw new Error ('username/password tidak sesuai')
            }
        })
        .catch((err) => {
            res.redirect('/user/login?err=' + err.message )
        });
    }

    static logout(req, res){
        req.session.destroy(err => {
            if (err) res.send(err)
            res.redirect('/user/login')
        })
    }

    static userHome(req, res){
        // User.findOne()
        Investment.findAll({
            include: {
                model: Company
            }
        })
        .then((investments) => {
            res.render('investment',{name: req.session.username, investments, info: req.query.info || ""})
            // console.log(userProfile);
        })
        .catch((err) => {
            res.send(err)
        });
        
        // console.log(req.session.userid);
    }

    static formAddDataProfileUser(req, res){
        res.render('addUserProfile',{name: req.session.username})
        console.log(req.session.userid);
    }

    static addProfileUser(req, res){
        let formatData = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            dateOfBirth: req.body.dateOfBirth,
            email: req.body.email,
            noHandphone: req.body.noHandphone,
            accountBalance: 0,
            "UserId": req.session.userid
        }
        console.log(formatData);

        UserProfile.create(formatData)
        .then((userProfile) => {
            res.redirect('/user/home')
        })
        .catch((err) => {
            res.send(err)
        })
    }

    static showAllInvestment(req, res){
        Investment.findAll({
            include:[Company]
        })
        .then((result) => {
            res.render('InvestmentList', {investments: result, info: req.query.info || ""})
            //res.send(result)
        }).catch((err) => {
            res.send(err)
        });
    }
    static formUpdateDataUser(req, res){
        UserProfile.findByPk(req.params.id)
        .then((userProfile) => {
            res.render('formEditDataProfile',{name: req.session.username, userProfile})
        })
        .catch((err) => {
            res.send(err)
        })
    }

    static updateDataUser(req, res){
        UserProfile.update({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            dateOfBirth: req.body.dateOfBirth,
            email: req.body.email,
            noHandphone: req.body.noHandphone,
            // accountBalance: 0,
            // "UserId": req.session.userid
        }, {
            where: {id: +req.params.id}
        })
        .then(() => {
            res.redirect('/user/home/?info=Update Successfully')
        })
        .catch((err) => {
            res.send(err)
        })
    }

    static formTopUpBalance(req, res){
        UserProfile.findByPk(req.params.id)
        .then((userProfile) => {
            res.render('formTopUpBalance',{name: req.session.username, userProfile})
        })
        .catch((err) => {
            res.send(err)
        })
    }

    static topUpBalance(req, res){
        UserProfile.findByPk(req.params.id)
        .then((userProfile) => {
            let dataTopUp = (+userProfile.accountBalance) + (+req.body.accountBalance)
            return UserProfile.update({
                accountBalance: dataTopUp
                // accountBalance: 0,
                // "UserId": req.session.userid
            }, {
                where: {id: +req.params.id}
            })
            .then(() => {
                // console.log(dataTopUp);
                res.redirect('/user/home/?info=Top Up Successfully')
            })
        })
        .catch((err) => {
            res.send(err)
        })
        
    }

}
module.exports = Controller