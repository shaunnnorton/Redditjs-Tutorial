import {Router} from 'express'

const router = Router()

router.get('/new', (req,res)=>{
    res.render('posts-new')
})

export default router
