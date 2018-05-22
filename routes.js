var auth = require('./auth'),
  reports = require('./controllers/reportController'),
  users = require('./controllers/userController'),
  birds = require('./controllers/birdController'),
  path = require('path');

var fs = require('fs');


module.exports = function(app) {

  app.post('/api/login', auth.authenticate);
  app.get('/api/currentIdentity', auth.getCurrentIdentity);
  app.put('/api/users/:id', users.updateUser);
  
  app.get('/api/reports', reports.getReports);
  app.get('/api/reports/:reportId', reports.getReport);
  app.post('/api/reports', reports.saveReport);
  // app.get('/api/species/search', reports.searchSpecies);
  app.get('/api/birds', birds.getBirds);
  
  app.post('/api/logout', function(req, res) {
    req.logout();
    res.end();
  });
  
  app.get('/app/*', function(req, res) {
    res.sendStatus(404);
  });
  
  app.get('/node_modules/*', function(req, res) {
    res.sendStatus(404);
  });

  app.get('/reports/*', function(req, res) {
    res.sendFile(path.resolve(__dirname + '/../../index.html'));
  });
  app.get('/user/*', function(req, res) {
    res.sendFile(path.resolve(__dirname + '/../../index.html'));
  });
  app.get('/404', function(req, res) {
    res.sendFile(path.resolve(__dirname + '/../../index.html'));
  });
  
  app.get('*', function(req, res) {
    console.log('404 error', req.path);
    res.sendStatus(404);
  });
}