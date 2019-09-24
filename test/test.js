let supertest = require("supertest");
let should = require("should");

var server = supertest.agent("http://localhost:8080");

describe("should get JSON data back from endpoints ", function() {
  it("should get JSON data from /popular endpoint", function(done) {
    server
      .get("/popular")
      .expect("Content-type", /json/)
      .expect(200)
      .end(function(err, res) {
        res.status.should.equal(200);
        done();
      });
  });

  it("should get JSON data from /movie endpoint when searching for a movie", function(done) {
    server
      .get("/movies/spiderman")
      .expect("Content-type", /json/)
      .expect(200)
      .end(function(err, res) {
        res.status.should.equal(200);
        done();
      });
  });
});
