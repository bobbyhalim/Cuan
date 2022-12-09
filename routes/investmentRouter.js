const express = require('express')
const investmentRouter = express.Router()
const ControllerInvestment = require('../controllers/controllerInvestment')

//*Menampilkan semua postingan di beranda,terdapat 2 tombol navbar yaitu myprofile,post picture dan logout
investmentRouter.get('/' , ControllerInvestment.home)
investmentRouter.get('/:id/add', ControllerInvestment.formPosting)
investmentRouter.post('/:id/add', ControllerInvestment.addPosting)

//*Menambahkan jumlah vote dari sebuah posting,property vote dari model posting ditambahkan value nya
investmentRouter.get('/:id/like' , ControllerInvestment.Like)
investmentRouter.get('/:id/Delete', ControllerInvestment.Delete)


module.exports = investmentRouter;