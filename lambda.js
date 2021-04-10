require('source-map-support/register')
import { connectToDatabase } from './utils/db'
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
