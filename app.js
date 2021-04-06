import express from 'express';
import bodyParser from 'body-parser';

import corsMiddleware from './middleware/cors-middleware';
import cookiesMiddleware from './middleware/cookies-middleware';
import authMiddleware from './middleware/auth-middleware';

import routes from './routes/index';


const app = express()
app.use(corsMiddleware);
app.use(cookiesMiddleware);
app.use(authMiddleware);
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// After allllll that above middleware, we finally handle our own routes!
app.use('/', routes);


// Export your express server so you can import it in the lambda function.
export default app;