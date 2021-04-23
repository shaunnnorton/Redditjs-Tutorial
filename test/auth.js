import chai from "chai"
import chaiHttp from "chai-http"
import server from "../src/server"
const should = chai.should
chai.use(chaiHttp);

// Agent that will keep track of our cookies
const agent = chai.request.agent(server);

import User from "../src/models/user"

describe("Auth", function() {
  it("Should not be able ot login if they have not registired", (done) => {
      agent.post("/login")
      .send({ email: "wrong@wrong.com", password: "nope" })
      .end((err,res) => {
          res.status.should.be.equal(401)
          done()
      })
  })

  it("Should be able to signup",(done)=>{
      User.findOneAndRemove({username:"testone"}, () => {
          agent
          .post("/sign-up")
          .send({ username: "testone", password: "password" })
          .end((err,res)=>{
              if(err) throw err
              res.should.have.status(200)
              agent.should.have.cookie("nToken")
              done()
          })
      })
  })
  after( () => {
      agent.close()
  })
});