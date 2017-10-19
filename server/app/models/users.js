var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var UserSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    status:{type: Boolean, default: true},
    email: {type: String, Required: true, Unique: true},
    password: {type: String, required: true},
    dateRegistered:  {type: Date, Default:Date.now}

});

UserSchema.virtual('fullName')
.get(function () {
    return this.firstName + ' ' + this.lastName;
});


module.exports = Mongoose.model('User', UserSchema);
