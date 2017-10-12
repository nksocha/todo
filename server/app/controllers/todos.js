
var express = require('express'),
router = express.Router(),
logger = require('../../config/logger'),
mongoose = require('mongoose')
todo = mongoose.model('todo')
;


module.exports = function (app, config) {
app.use('/api', router);

router.route('/users').get(function(req, res, next){
    logger.log('Get all users', 'verbose');
    
    var query = todo.find()
        .sort(req.query.order)
        .exec()
        .then(result => {
                if(result && result.length) {
                res.status(200).json(result);
            } else {
                res.status(404).json({message: 'No users'});
            }
    })
    .catch(err => {
        return next(err);
    });
})

router.route('/users/userId').get(function(req, res, next){
    logger.log('Get todo' + req.params.userId, 'verbose');
     
     User.findById(req.params.userId)
                .then(todo => {
                    if(todo){
                        res.status(200).json(todo);
                    } else {
                        res.status(404).json({message: "No todo found"});
                    }
                })
                .catch(error => {
                    return next(error);
                });
        }); 
    
router.route('/users').post(function(req, res, next){
    logger.log('Create todo', 'verbose');
  
    var todo = new todo(req.body);
        todo.save()
            .then(result => {
                res.status(201).json(result);
            })
        .catch( err => {
            return next(err);
        });
  })

router.route('/users/:userId').put(function(req, res, next){
    logger.log('Update todo', 'verbose');
    
    todo.findOneAndUpdate({_id: req.params.userId}, 		
        req.body, {new:true, multi:false})
            .then(todo => {
                res.status(200).json(todo);
            })
            .catch(error => {
                return next(error);
            });
    });


router.route('/users/:userId').delete(function(req, res, next){
    logger.log('Delete todo', 'verbose');
    
    todo.remove({ _id: req.params.userId })
            .then(todo => {
                res.status(200).json({msg: "todo Deleted"});
            })
            .catch(error => {
                return next(error);
            });
    });
};
