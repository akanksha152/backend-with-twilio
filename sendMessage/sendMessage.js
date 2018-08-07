const accountSid = 'AC6e95c009716dfa7b8a4ff4147de89877';
const authToken = '6c4a1dd7e5c2d9bf6b044ce8a0c60be6';
const client = require('twilio')(accountSid, authToken);

const sendMessage = (number, name1, message1, callback) => {
    const message = message1 + 'dfghjkl';
    const phoneNumber = number;
    const name = name1;
    const data = {
        message,
        phoneNumber,
        name,
        timeStamp : new Date().toISOString()
    }
    client.messages
    .create({
       body: message,
       from: '(234) 294-1906',
       to: number
     })
     .then(message => callback(data))
     .catch(err => callback(err))
    .done();
}

module.exports = {
    sendMessage
}