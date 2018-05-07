var reports = require('../database/reports'),
  getNextId = require('./getNextId'),
  url = require('url');

var nextId = getNextId(reports);

exports.getReports = function(req, res) {
  res.send(reports);
}

exports.getReport = function(req, res) {
  var report = reports.find(report => report.id === +req.params.reportId);
  res.send(report);
}
/*
exports.searchSpecies = function(req, res) {
	var term = req.query.search.toLowerCase();
  var results = [];
  reports.forEach(report => {
    var matchingSpecies = report.species.filter(species => species.name.toLowerCase().indexOf(term) > -1)
    matchingSpecies = matchingSpecies.map(species => {
      species.reportId = report.id;
      return species;
    })
    results = results.concat(matchingSpecies);
  })
  res.send(results);
}*/

exports.saveReport = function(req, res) {
  var report = req.body;
  
  if (report.id) {
    var index = reports.findIndex(e => e.id === report.id)
    reports[index] = report
  } else {
    report.id = nextId;
    nextId++;
    report.species = [];
    reports.push(report);
  }
  res.send(report);
  res.end(); 
}


