require('source-map-support/register')

// exports.handler = function (event, context, callback) {
//     console.log(`Hello, Cloudwatch!`);
//     const response = {
//         statusCode: 200,
//         body: 'Hello Lambda!',
//     };
//     return callback(null, response);
// };

import app from './app';
import serverless from 'serverless-http';
// exports.handler = serverless(app);

// or as a promise
const handler = serverless(app);
exports.handler = async (event, context) => {
    // Make sure to add this so you can re-use `conn` between function calls.
    // See https://www.mongodb.com/blog/post/serverless-development-with-nodejs-aws-lambda-mongodb-atlas
    context.callbackWaitsForEmptyEventLoop = false;

    const result = await handler(event, context);
    // and here
    return result;
};
