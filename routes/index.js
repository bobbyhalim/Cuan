const route = require('express').Router()
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
route.get('/user/home', middle1, Controller.userHome)
route.post('/user/login', Controller.login)
route.get('/user/profile', middle1, Controller.formAddDataProfileUser)
route.post('/user/profile', Controller.addProfileUser)
route.get('/user/profile/:id', middle1, Controller.formUpdateDataUser)
route.post('/user/profile/:id', Controller.updateDataUser)
route.get('/user/balance/:id', middle1, Controller.formTopUpBalance)
route.post('/user/balance/:id', middle1, Controller.topUpBalance)
route.get('/user/logout', Controller.logout)

module.exports = route