import {Router} from 'express'
import User from "../models/user"

import jwt from "jsonwebtoken"

const router = Router()

router.get('/sign-up', (req,res) => {
    res.render('sign-up')
})

router.post("/sign-up", (req,res) => {
    const user = new User(req.body)

    user
        .save()
        .then(user => {
            var token = jwt.sign({_id: user._id }, process.env.SECRET, {expiresIn: "60 days"})
            res.cookie("nToken", token, {maxAge: 900000, httpOnly: true })
            res.redirect("/")
        })
        .catch(err => {
            console.log(err.message)
            return res.status(400).send({ err: err})
        })
})

router.get("/logout", (req ,res) => {
    res.clearCookie("nToken")
    res.redirect("/")
})

router.get('/login', (req,res) => {
    res.render("login")
})

router.post('/login', (req,res) => {
    const username = req.body.username
    const password = req.body.password
    User.findOne({username}, "username password")
        .then( user => {
            if(!user) {
                return  res.status(401).send({message:"Wrong Username or Password"})
            }
            user.comparePassword(password, (err, isMatch) => {
                if (!isMatch) {
                    return  res.status(401).send({message:"Wrong Username or Password"})
                }
                const token = jwt.sign({ _id: user._id, username: user.username }, process.env.SECRET, {
                    expiresIn: "60 days"
                })
                res.cookie("nToken", token, { maxAge: 900000, httpOnly: true })
                res.redirect("/")
            })  
        })
        .catch(err => {
            console.log(err)
        })
})

export default router