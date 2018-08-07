const {ObjectID} = require('mongodb');
const { User} = require('./../../models/user');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const user = [{
    _id: userOneId,
    name: 'akanksha',
    message: 'Hi, otp is 1233456',
    phoneNumber: '+919742286152'
},
{
    _id: userTwoId,
    name: 'apoorva',
    message: 'Hi, otp is 1233456',
    phoneNumber: '+918349767152'
}];


const todos = [{
    _id: new ObjectID(),
    text: 'First test todo'
}, {
    _id: new ObjectID(),
    text: 'Second test todo',
    completed: true,
    completedAt: 333
}];

const populateTodos = (done) => {
    User.remove({}).then(() => {        
       return User.insertMany(user);
    }).then(() => done());
};


const populateUsers= (done) => {
    User.remove({}).then(() => {     
        var userOne = new User(user[0]).save(); 
        var userTwo = new User(user[1]).save();
        Promise.all([userOne, userTwo]).then(() => {

        });
    }).then(() => done());
};

module.exports = {todos, populateTodos, populateUsers}