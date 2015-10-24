var assert = require('assert');
var request = require('supertest');


describe('Admin Controller', function() {

  describe('home', function() {
    it('/admin expect 200', function(done) {
      request(sails.hooks.http.app)
        .get('/admin')
        .expect(200)
        .end(function(err, res) {
          // console.log(res.body);
          done(err);
        });
    });
  });

  describe('list', function() {
    it('/admin/user expect 200', function(done) {
      request(sails.hooks.http.app)
        .get('/admin/user')
        .expect(200)
        .end(function(err, res) {
          // console.log(res.body);
          done(err);
        });
    });
  });

  describe('list', function() {
    it('/admin/user/new expect 200', function(done) {
      request(sails.hooks.http.app)
        .get('/admin/user/new')
        .expect(200)
        .end(function(err, res) {
          // console.log(res.body);
          done(err);
        });
    });
  });

});
