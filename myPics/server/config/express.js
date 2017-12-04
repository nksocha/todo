var express = require('express');

module.exports = function (app, config) {
    
  app.use(function (req, res, next) {
    console.log('Request from ' + req.connection.remoteAddress);
    next();
  });  
  console.log(config)
  app.use(express.static(config.root + '/public'));
console.log('Run')

  // This looks at the request and if it is not availible this will act.
    app.use(function (req, res) {
      res.type('text/plan');
      res.status(404);
      res.send('404 Not Found');
    });
  
    //This will work when the server is not working correctly
    app.use(function (err, req, res, next) {
      console.error(err.stack);
      res.type('text/plan');
      res.status(500);
      res.send('500 Server Error');
    });
     
  };
  
  
  