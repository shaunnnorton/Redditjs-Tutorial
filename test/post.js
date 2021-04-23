import app from "./../src/server.js"
import chai from "chai"
import chaiHttp from "chai-http"
const expect = chai.expect

import Post from "./../src/models/post"
import server from "./../src/server"

chai.should()
chai.use(chaiHttp)

describe("Posts", function () {
    const agent = chai.request.agent(server)
    const newPost = {
        title: "post title",
        url: "https://www.google.com",
        summary: 'post summary',
        subreddit:"SAMPLESUBREDDIT",
        author:"dddddddddddd"
    }
    it("Should create with valid atributs at POST /posts/new", function(done) {
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
    after(function () {
        Post.findOneAndDelete(newPost, function(err) {
            if(err) console.log(err)
            console.log("Successful Deleation")
        })
        agent.close()
    })
    
})