const {User, Profile, Company, Investment, Transaction} = require('../models')
const { comparePassword } = require('../helpers/bcrypt')
const { Op } = require('sequelize')
const investment = require('../models/investment')

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
        res.render('formLogin', {error, info})
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

    static home(req, res){
        const search = req.query.search

        let options = {
            where: {},
            include: {
                model: Company
            },
            order: [['price', 'ASC']]
        }

        if (search) {
            options.where.name = {
                [Op.iLike]: `%${search}%`
            }
        }
        let data = {}
        Investment.findAll(options)
        .then(investments => {
            data.investments = investments;
            return Investment.notif()
        })
        .then(notif => {
            data.notif = notif[0].dataValues
            res.render('investment', data)
        })
        .catch((err) => {
            res.send(err)
        });
    }

    static formAddDataProfileUser(req, res){
        res.render('formAddProfile', {name: req.session.username})
    }

    static addProfileUser(req, res){
        let formatData = {
            fullName: req.body.fullname,
            dateOfBirth: req.body.dateOfBirth,
            phoneNumber: req.body.phoneNumber,
            "UserId": req.session.userid
        }
        console.log(formatData);

        Profile.create(formatData)
        .then((userProfile) => {
            res.redirect('/user/home')
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

    static Like(req, res) {
        Investment.increment('like', {
            where: { id: req.params.id }
        })
            .then(_ => res.redirect('/user/home'))
            .catch(err => res.send(err))
    }

    static Buy(req, res) {
        Investment.decrement('unitStock', {
            where: { id: req.params.id }
        })
            .then(_ => res.redirect('/user/home'))
            .catch(err => res.send(err))
    }

}
module.exports = Controller