import app from "./../src/server.js"
import chai from "chai"
import chaiHttp from "chai-http"
const expect = chai.expect

import Post from "./../src/models/post"
import server from "./../src/server"
import User from "./../src/models/user"

chai.should()
chai.use(chaiHttp)

describe("Posts", function () {
    const agent = chai.request.agent(server)
    const newPost = {
        title: "post title",
        url: "https://www.google.com",
        summary: 'post summary',
        subreddit:"SAMPLESUBREDDIT",
    }
    const user = {
        username: "poststest",
        password: 'testposts'
    }

    before((done) => {
        agent
            .post("/sign-up")
            .set("content-type", "application/x-www-form-urlencoded")
            .send(user)
            .then((res)=>{
                done()
            })
            .catch((err) => {
                done(err)
            })
    })




    it("Should create with valid atributes at POST /posts/new", function(done) {
        Post.estimatedDocumentCount()
            .then(function (initialDocCount) {
                agent
                    .post("/posts/new")
                    .set('content-type', "application/x-www-form-urlencoded")    
                    .send(newPost)
                    .then(function (res) {
                        Post.estimatedDocumentCount()
                            .then(function (newDocCount) {
                                expect(res).to.have.status(200)
                                expect(newDocCount).to.be.equal(initialDocCount + 1)
                                done()
                            })
                            .catch(function (err) {
                                done(err)
                            })
                    })
                    .catch(function (err) {
                        done(err)
                    })          
            })
            .catch(function (err) {
                done(err)
            })
    })
    after(function (done) {
        Post.findOneAndDelete(newPost)
        .then( res => {
            agent.close()
            User.findOneAndDelete({username: user.username})
            .then(res=>{
                done()
            })
            .catch(err=>{
                done(err)
            })
        })
        .catch(err=>{
            done(err)
        })
    })
    
})