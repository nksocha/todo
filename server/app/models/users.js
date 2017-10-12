var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var UserSchema = new Schema({
    firstName: {type: string, required: true},
    lastName: {type: string, required: true}
    
});

UserSchema.virtual('fullName')
.get(function () {
    return this.firstName + ' ' + this.lastName;
});


module.exports = Mongoose.model('User', UserSchema);
