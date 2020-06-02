const {Schema, model, Types} = require('mongoose');


const GameSchema = new Schema({
    created_by: {type: Types.ObjectId, ref: 'User', required: true},
    testId: {type: Types.ObjectId, ref: 'Test', required: true},
    roomNumber: {type: String, required: true},
    users: [
      {
        userId: {type: Types.ObjectId, ref: 'User', required: true},
        result:  {type: Number}
      }
    ],
});


module.exports = model('Game', GameSchema);
