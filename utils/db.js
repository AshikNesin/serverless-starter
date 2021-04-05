import mongoose from 'mongoose';
let isConnected;
let conn = null;
const uri = process.env.DATABASE_URL;

// Ensure virtual fields are serialised.
mongoose.set('toJSON', {
    virtuals: true,
});

// Ensure virtual fields are serialised.
mongoose.set('toObject', {
    virtuals: true,
});

// avoid deprecation warnings
// https://mongoosejs.com/docs/deprecations.html
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);

mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', _ => console.log('Database connected'));

// Models
require('./../models/User');

export const connectToDatabase = () => {
    if (isConnected) {
        console.log('=> using existing database connection');
        return Promise.resolve();
    }

    console.log('=> using new database connection');
    return mongoose.connect(uri, {
        // Buffering means mongoose will queue up operations if it gets
        // disconnected from MongoDB and send them when it reconnects.
        // With serverless, better to fail fast if not connected.
        bufferCommands: false, // Disable mongoose buffering
        bufferMaxEntries: 0 // and MongoDB driver buffering
    }).then(db => {
        isConnected = db.connections[0].readyState;
    });
};

export default connectToDatabase;
