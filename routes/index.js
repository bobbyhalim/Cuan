const route = require('express').Router()
const { Router } = require('express')
const Controller = require('../controllers/index')

const middle1 = (req, res, next) => {
    // console.log('hello from middle1');
    if (req.session.username) {
        next()
    } else {
        res.redirect('/')
    }
}

const middle2 = (req, res, next) => {
    // console.log('hello from middle1');
    if (req.session.username) {
        res.redirect('/user/home')
    } else {
        next()
    }
}

route.get('/', Controller.homePage)
route.get('/user/register', Controller.registerPage)
route.post('/user/register', Controller.addDataUser)
route.get('/user/login', middle2, Controller.loginPage)
route.post('/user/login', Controller.login)
route.get('/user/home', middle1, Controller.home)
route.get('/user/profile', middle1, Controller.formAddDataProfileUser)
route.post('/user/profile', Controller.addProfileUser)
route.get('/user/logout', Controller.logout)
route.get('/user/home/buy/:id', Controller.Buy)
route.get('/user/home/like/:id', Controller.Like)
route.get('/user/balance/:id', middle1, Controller.formTopUpBalance)
route.post('/user/balance/:id', middle1, Controller.topUpBalance)


module.exports = route