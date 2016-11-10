var supertest = require('supertest');
var should = require('should');

var server = supertest.agent('http://192.81.211.198:3000');

describe('sample unit test', function(){
  
  // #1 should return home page

  it("should return home page", function(done){

    // calling home page api
    server
    .get('/')
    .expect('content-type', /json/)
    .expect(200)
    .end(function(err,res){
      // http status should be 200
      res.status.should.equal(200);
      // error key should be false.
      res.body.error.should.equal(false);
      done();
    });
  });

// Api functionality
  it("should add two numbers", function(done){
  
    //calling ADD api
   server
    .post('/add')
    .send({num1: 10, num2: 20})
    .expect("Content-type", /json/)
    .expect(200)
    .end(function(err,res){
      res.status.should.equal(200);
      res.body.error.should.equal(false);
      res.body.data.should.equal(30);
      done();
    });
  });

  it("should subtract two numbers", function(done){
    server
      .post('/subtract')
      .send({num1:20, num2:10})
      .expect("Content-type", /json/)
      .expect(200)
      .end(function(err,res){
        res.status.should.equal(200);
        res.body.error.should.equal(false);
        res.body.data.should.equal(10);
        done(); 
      });
  });

// Error routing for server 
  it("should return a 404 if no page found", function(done){
    server
    .get('/falseRoute')
    .expect(404)
    .end(function(err,res){
      res.status.should.equal(400);
      done();
    });
  });

});
