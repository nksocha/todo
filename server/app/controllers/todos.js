var express = require('express'),
    router = express.Router(),
    logger = require('../../config/logger'),
    mongoose = require('mongoose'),
    Todo = mongoose.model('Todo'),
    passportService = require('../../config/passport'),
    passport = require ('passport')


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
        Todo.save()
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
};
