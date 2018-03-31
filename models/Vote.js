const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VoteSchema = new Schema({
subject : {
    type : String
},
points : {
type : Number
}
});

const Vote = mongoose.model('Vote',VoteSchema);

module.exports = Vote;