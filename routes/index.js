const express = require('express')
const router = express.Router()
const routerInvestment = require('./investmentRouter')
const routerAccount = require('./profileRouter')
const ControllerRegisterLogin = require('../controllers/controllerLoginRegister')


const beforeLogin = (req, res, next) => {
    if (req.session.user) {
        next()
    } else {
        res.redirect('/')
    }
}
//TODO Semua rooting menghandle Welcome Page , Register, Login dan Logout
const afterLogin = (req, res, next) => {
    if(req.session.user){
        res.redirect('/investment')
    } else {
        next()
    }
}
    //*Memunculkan halaman Welcome Page yang memiliki 2 tombol yaitu Register dan Login
    router.get('/' , afterLogin , ControllerRegisterLogin.landingPage)

    //*Memunculkan halaman Register yang berisi form untuk membuat sebuah akun
    router.get('/register' , afterLogin , ControllerRegisterLogin.formRegister)

    //!Memasukkan username serta password kedalam database. 
    router.post('/register' ,  ControllerRegisterLogin.registerUser)

    //*Memunculkan halaman Login yang berisi form yang nantinya akan disesuaikan apa yang di-input dengan yang berada di database.
    router.get('/login' , afterLogin , ControllerRegisterLogin.formLogin)

    //!Mendapatkan input dari form Login yang digunakan untuk verifikasi dengan database,render ke beranda posting (/posting).
    router.post('/login'  , ControllerRegisterLogin.login)

    //*Session destroy,redirect ke /
    router.get('/logout' , ControllerRegisterLogin.logout)

router.use('/investment' , beforeLogin , investmentRouter)
router.use('/profile' , beforeLogin , profileRouter)

module.exports = router