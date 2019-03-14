const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChannelSchema = new Schema({
    'Rank' : {type: String},
    'Grade': {type: String},
    'Channel name': {type: String},
    'Video Uploads': {type: Number},
    'Subscribers': {type: Number},
    'Video views': {type: Number}
});
module.exports = Channel = mongoose.model('channel', ChannelSchema);