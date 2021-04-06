require('source-map-support/register')
import { connectToDatabase } from './utils/db'

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
// or as a promise
const handler = serverless(app);
exports.handler = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;

    await connectToDatabase();
    const result = await handler(event, context);
    // and here
    return result;
};
