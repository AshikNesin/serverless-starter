import mongoose from 'mongoose';
let isConnected;
const uri = process.env.DATABASE_URL;

// Ensure virtual fields are serialised.
mongoose.set('toJSON', {
    virtuals: true,
});

// Ensure virtual fields are serialised.
mongoose.set('toObject', {
    virtuals: true,
});

// https://medium.com/crowdbotics/how-to-build-a-serverless-backend-with-aws-lambda-and-nodejs-e0d1257086b4

export const connectToDatabase = () => {
    if (isConnected) {
        console.log('=> using existing database connection');
        return Promise.resolve();
    }

    console.log('=> using new database connection');
    return mongoose.connect(uri).then(db => {
        isConnected = db.connections[0].readyState;
    });
};

export default connectToDatabase;
