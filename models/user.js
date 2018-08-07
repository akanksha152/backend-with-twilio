const { mongoose }  = require('../db/mongoose');

var User = mongoose.model('ConatctInfo', {
    name: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String
    },
    message: {
        type: String
    },
    timeStamp: {
        type: String
    }
}
);


module.exports = {
    User
}