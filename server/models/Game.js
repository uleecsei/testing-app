const {Schema, model, Types} = require('mongoose');


const GameSchema = new Schema({
  created_by: {type: Types.ObjectId, ref: 'User', required: true},
  testId: {type: Types.ObjectId, ref: 'Test', required: true},
  roomId: {type: String, required: true},
  status: {type: String, required: true},
  quiz: {type: Object},
  users: [
    {
      userId: {type: Types.ObjectId, ref: 'User', required: true},
      result:  {type: Object}
    }
  ],
});


module.exports = model('Game', GameSchema);
