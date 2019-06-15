var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var ParseDashboard = require('parse-dashboard');
var allowInsecureHTTP = true;

var app1 = new ParseServer({
  databaseURI: 'mongodb+srv://nextu:1234@cluster0-8whid.mongodb.net/test?retryWrites=true&w=majority',
  appId: 'Lista1',
  restAPIKey: "restAPIKey",
  fileKey: 'myFileKey',
  masterKey: 'masterKey',
  serverURL: "http://localhost:5000/lista"
});

var pasreDashboardSettings = {
  "apps": [{
    "serverURL": "http://localhost:5000/lista", //Pode substituir a palavra lista pelo nome de seu aplicativo ou projeto.        
    "appId": "Lista1",
    "restAPIKey": "restAPIKey",
    "masterKey": "masterKey",
    "appName": "Lista"
  }],
  "users": [{
    "user": "rodrigo", //Pode substituir pelo seu uaário        
    "pass": "1234",
    "masterKey": "masterKey",
    "apps": [{
      "appId": "Lista1"
    }]
  }]
}

var dashboard = new ParseDashboard(pasreDashboardSettings, allowInsecureHTTP);

var app = express();
app.use('/lista', app1, function (req, res, next) {
  return next();
});

app.use('/dashboard', dashboard);

var httpServer = require('http').createServer(app);
httpServer.listen(5000);