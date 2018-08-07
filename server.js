const sendMessageApi = require('./sendMessage/sendMessage');
const express = require('express');
require('./config/config');
var bodyParser = require('body-parser');
const {User} = require('./models/user');
const cors = require('cors');

var app = express();
app.use(cors());
app.use(bodyParser.json());
app.post('/numbers', (req, res) => {
        const number = req.body.phoneNumber;
        const name = req.body.name;
        const message = req.body.message;
        sendMessageApi.sendMessage(number, name, message, (res1) => {
            if(res1.status ==400) {
            res.send('Please verify your contact number');
            }
            else {
                var user = new User(res1);
                user.save().then(() => {
                    console.log(res1);
                })
            res.send(res1);
            }
        });
});

app.get('/getInfo', (req, res) => {
    User.find().then((user) => {
        user.reverse();
        res.send({user});
    }, (error) => {
        res.status(400).send(error);
    })
})

app.listen(3003);

