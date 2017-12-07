var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var TodoSchema = new Schema({
    userid: { type: Schema.Types.ObjectId, required: true },
    todo: { type: String, requred: true },
    description: { type: String },
    dateCreated: { type: Date, default: Date.now },
    dateDue: { type: Date, default: Date.now },
    completed: { type: Boolean, default: false },
    file: { fileName: String, originalName: String },
    priority: { type: String, required: ['Low', 'Medium', 'High', 'Critical'] }
});

module.exports = Mongoose.model('Todo', TodoSchema);
