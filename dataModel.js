const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now(),
    },
    isFedOnce: {
        type: Boolean,
        default: false,
    },
    isFedTwice: {
        type: Boolean,
        default: false,
    }
    // firstSubmit: {
    //     type: Boolean,
    //     default: false,
    // },
    // secondSubmit: {
    //     type: Boolean,
    //     default: false,
    // }

    
});
module.exports = mongoose.model('record',dataSchema);