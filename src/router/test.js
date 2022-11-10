const {Router} = require('express')
// const { getAll, creat, getOne, remove, update, search } = require('../controller/rooms')

const router = Router()


router.get('/tests', async function(req, res) {
    try {
        res.json({
            status: 200,
            message: "Get data product successfully"
        })
    } catch(err) {
        return res.status(500).send("Server error")
    }
})
// router.get("/rooms/:slug")

module.exports = router