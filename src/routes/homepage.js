import {Router} from 'express'

const router = Router()

router.get("/home", (req,res) => {
    return res.render("homepage")
})

export default router
