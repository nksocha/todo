var path = require('path'),    
rootPath = path.normalize(__dirname ),    
env = process.env.NODE_ENV || 'development';

var config = {  
development: {    
            root: rootPath,    
            app: {      name: ' Exam'    },    
            port: 5000,  
            
            
 },  
 production: {    
              root: rootPath,    
              app: {      name: ' Exam'    },    
               port: 80,  },
               
               
  };

module.exports = config[env];