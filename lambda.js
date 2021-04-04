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
exports.handler = serverless(app);
