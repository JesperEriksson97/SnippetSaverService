'use strict'

const logoutController = {}

logoutController.logout = (req, res) => {
     req.session.destroy()
     res.redirect('http://localhost:8000/')
}

module.exports = logoutController