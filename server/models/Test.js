const {Schema, model, Types} = require('mongoose');


const TestSchema = new Schema({
    created_by: {type: Types.ObjectId, ref: 'User', required: true},
    title: {type: String, required: true},
    topic: {type: String, required: true},
    questions: {type: Array, required: true},
});


module.exports = model('Test', TestSchema);
