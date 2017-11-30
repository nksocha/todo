var express = require('express'),
    router = express.Router(),
    logger = require('../../config/logger'),
    mongoose = require('mongoose'),
    Todo = mongoose.model('Todo'),
    passportService = require('../../config/passport'),
    passport = require ('passport')
    multer = require('multer'),
    mkdirp = require('mkdirp');
    

var requireLogin = passport.authenticate('local', { session: false });
var requireAuth = passport.authenticate('jwt', { session: false });

module.exports = function (app, config) {
app.use('/api', router);

router.route('/todos').get(requireAuth,function(req, res, next){
    logger.log('Get all todos', 'verbose');
    
    var query = todo.find()
        .sort(req.query.order)
        .exec()
        .then(result => {
                if(result && result.length) {
                res.status(200).json(result);
            } else {
                res.status(404).json({message: 'No todos'}); 
            }
    })
    .catch(err => {
        return next(err);
    });
})

router.route('/todos/todo').get(requireAuth,function(req, res, next){
    logger.log('Get todo' + req.params.Todo, 'verbose');
     
     Todo.findById(req.params.Todo)
                .then(Todo => {
                    if(Todo){
                        res.status(200).json(Todo);
                    } else {
                        res.status(404).json({message: "No todo found"});
                    }
                })
                .catch(error => {
                    return next(error);
                });
        }); 
    
router.route('/todos').post(requireAuth,function(req, res, next){
    logger.log('Create todo', 'verbose');
  
    var todo = new Todo(req.body);
        todo.save()
            .then(result => {
                res.status(201).json(result);
            })
        .catch( err => {
            return next(err);
        });
  })

router.route('/todos/todo').put(requireAuth,function(req, res, next){
    logger.log('Update todo', 'verbose');
    
    Todo.findOneAndUpdate({_id: req.params.todo}, 		
        req.body, {new:true, multi:false})
            .then(Todo => {
                res.status(200).json(todo);
            })
            .catch(error => {
                return next(error);
            });
    });


router.route('/todos/todo').delete(requireAuth,function(req, res, next){
    logger.log('Delete todo', 'verbose');
    
    Todo.remove({ _id: req.params.todo })
            .then(Todo => {
                res.status(200).json({msg: "todo Deleted"});
            })
            .catch(error => {
                return next(error);
            });
    });
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {      
              var path = config.uploads + req.params.userId + "/";
            mkdirp(path, function(err) {
                if(err){
                    res.status(500).json(err);
                } else {
                    cb(null, path);
                }
            });
        },
        filename: function (req, file, cb) {
            let fileName = file.originalname.split('.');   
            cb(null, fileName[0] + new Date().getTime() + "." + fileName[fileName.length - 1]);
        }
      });

      var upload = multer({ storage: storage });
        
      router.post('/todos/upload/:userId/:todoId', upload.any(), function(req, res, next){
            logger.log('Upload file for todo ' + req.params.todoId + ' and ' + req.params.userId, 'verbose');
            
            Todo.findById(req.params.todoId, function(err, todo){
                if(err){ 
                    return next(err);
                } else {     
                    if(req.files){
                        todo.file = {
                            filename : req.files[0].filename,
                            originalName : req.files[0].originalname,
                            dateUploaded : new Date()
                        };
                    }           
                    todo.save()
                        .then(todo => {
                            res.status(200).json(todo);
                        })
                        .catch(error => {
                            return next(error);
                        });
                }
            });
        });
};


    
