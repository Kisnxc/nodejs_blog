const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/my_idol', {
                                
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connect successfully');
    } catch (error) {
        console.log('connection failed');
    }
}

module.exports = {connect};