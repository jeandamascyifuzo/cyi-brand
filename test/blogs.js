const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');


const should = chai.should();

chai.use(chaiHttp);
chai.should();


//Blog API testing'
//Get all the blogs


describe('1) Get all the blogs', function () {
    // this.timeout(577);
    it("it should Get all the blogs", function(done) {
        this.timeout(500);
        setTimeout(done, 300);
        chai.request(app)
        .get("/api/v1/blogs")
        .end((err, res) =>{
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eq(4);
            done();
        })
    });
    it("Internal Server Error", function(done) {
        this.timeout(500);
        setTimeout(done, 300);
        chai.request(app)
        .get("/api/v1/blogs/blog")
        .end((err, res) =>{
            res.should.have.status(500);
           
        });
    });
    it("Blog  not found", function(done) {
        this.timeout(500);
        setTimeout(done, 300);
        chai.request(app)
        .get("/api/v1/blog")
        .end((err, res) =>{
            res.should.have.status(404);
           
        })
    });
});

//Get blog by Id

describe(' Get blog by Id', function () {
    it("it should Get blog by it's Id", function(done) {
        this.timeout(500);
        setTimeout(done, 300);
        const blogId = "61dff76b8a9f8853e96b6069"
        chai.request(app)
        .get("/api/v1/blogs/" + blogId)
        .end((err, res) =>{
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('id');
            res.body.should.have.property('title');
            res.body.should.have.property('subtitle');
            res.body.should.have.property('content');
            res.body.should.have.property('author');
            res.body.should.have.property('id').eq("61dff76b8a9f8853e96b6069");

            done();
        })
    });
    it("Internal Server Error", function(done) {
        this.timeout(500);
        setTimeout(done, 300);
        chai.request(app)
        .get("/api/v1/blogs/" + "11")
        .end((err, res) =>{
            res.should.have.status(500);
           
        });
    });
    it("Blog  not found", function(done) {
        this.timeout(500);
        setTimeout(done, 300);
        const blogId = "61dff76b8a9f8853e96b6069"
        chai.request(app)
        .get("/api/v1/blogs/" + blogId + "12")
        .end((err, res) =>{
            res.should.have.status(500);
           
        })
    });
});

//create blog
// describe('10) create a blog', () => {
//     it('it should create a blog', (done) => {
//       chai.request(app)
//       .get('/api/v1/blogs')
//       .end((err, res) => {
//             res.should.have.status(200);
//         done();
//       });
//     }) 
// it('create.', (done) => {
//     const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWU3YmFiYTUyMWIwZjFlMTllM2NlOGMiLCJpYXQiOjE2NDI1OTEwNDZ9.RzP_BkiXT08LCwbFxKtt6O2sKAwjLaZw5WwuGWImP2U"
//     chai.request(app).post('/api/v1/blogs')
//       .set({ 'token': token, Accept: 'application/json' })
//       .send({
//         "title": "Willy shema",
//         "subtitle": "willy@gmail.com",
//         "content": "",
//         "author": "this blog post is essential"
//       })
//       .then((res) => {
//         const body = res.body;
//         expect(body).to.contain.property('data');
//         done();
//       })
//       .catch((err) => done(err))
//   })

// })

//user

describe('1) create a user', function () {
    // this.timeout(577);
    it("it should create a user", function(done) {
        this.timeout(500);
        setTimeout(done, 300);
        chai.request(app)
        .post("/api/v1/user/signup")
        .end((err, res) =>{
            res.should.have.status(404);
        
        })
    });
    it("Internal Server Error", function(done) {
        this.timeout(500);
        setTimeout(done, 300);
        chai.request(app)
        .post("/api/v1/user/signups")
        .end((err, res) =>{
            res.should.have.status(404);
           
        });
    });
    it("user exist", function(done) {
        this.timeout(500);
        setTimeout(done, 300);
        chai.request(app)
        .post("/api/v1/user/signup/ss")
        .end((err, res) =>{
            res.should.have.status(404);
           
        })
    });
});

//message
describe('1) send message', function () {
    // this.timeout(577);
    it("it should send ur email", function(done) {
        this.timeout(500);
        setTimeout(done, 300);
        chai.request(app)
        .post("/api/v1/contact")
        .end((err, res) =>{
            res.should.have.status(404);
        
        })
    });
    it("Internal Server Error", function(done) {
        this.timeout(500);
        setTimeout(done, 300);
        chai.request(app)
        .post("/api/v1/contacts")
        .end((err, res) =>{
            res.should.have.status(404);
           
        });
    });
    it("user exist", function(done) {
        this.timeout(500);
        setTimeout(done, 300);
        chai.request(app)
        .post("/api/v1/contact/signup")
        .end((err, res) =>{
            res.should.have.status(404);
           
        })
    });
});

//comment

//message
describe('1) send comment', function () {
    // this.timeout(577);
    it("it should send comment", function(done) {
        this.timeout(500);
        setTimeout(done, 300);
        chai.request(app)
        .get("/api/v1/comment")
        .end((err, res) =>{
            res.should.have.status(404);
        
        })
    });
    it("not logged in", function(done) {
        this.timeout(500);
        setTimeout(done, 300);
        chai.request(app)
        .get("/api/v1/comment/comments")
        .end((err, res) =>{
            res.should.have.status(401);
           
        })
    });
    
    it("Internal Server Error", function(done) {
        this.timeout(500);
        setTimeout(done, 300);
        chai.request(app)
        .get("/api/v1/comments")
        .end((err, res) =>{
            res.should.have.status(404);
           
        });
    });
    
});
