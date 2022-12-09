let {User} = require('../models/index')
let {comparePassword} = require('../helpers/bcrypt')

class ControllerRegisterLogin {
    //*Memunculkan halaman Welcome Page yang memiliki 2 tombol yaitu Register dan Login
    static landingPage(req , res){
        res.render('welcomePage')
    }

    //*Memunculkan halaman Register yang berisi form untuk membuat sebuah akun
    static formRegister(req , res){
        res.render('formRegister')
    }

    //!Memasukkan username serta password kedalam database. 
    static registerUser(req , res){
        let {username , email, password} = req.body
        User.create({
            username: username,
            email: email,
            password : password
        })
        .then(_ => res.redirect('/'))
        .catch(err => res.send(err))

    }

    //*Memunculkan halaman Login yang berisi form yang nantinya akan disesuaikan apa yang di-input dengan yang berada di database.
    static formLogin(req , res){
        res.render('formLogin')
    }

    //!Mendapatkan input dari form Login yang digunakan untuk verifikasi dengan database,render ke beranda posting (/posting).
    static login(req , res){
        let {username , password} = req.body
        User.findOne({
            where : {
                username : username
            }
        })
        .then(user => {
            if (user && comparePassword(password , user.password)) {
                req.session.user = user.userName
                req.session.userid = user.id 
                // console.log(req.session , 'ini sesudah')
                //res.render('Home' , {user.id})
                res.redirect(`/investment`)
            } else {
                throw new Error ('username / password tidak sesuai')
            }
        })
        .catch(err => res.send(err))
    }

    static logout(req , res){
        delete req.session.user
        res.redirect('/')
    }
}

module.exports = ControllerRegisterLogin