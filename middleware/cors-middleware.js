const cors = require('cors');
const whitelist = (process.env.CORS_DOMAINS || '').split(",");
export default cors({
    origin(origin, callback) {
        // allow requests with no origin
        if (!origin) return callback(null, true);
        if (!whitelist.includes(origin)) {
            const message = `The CORS policy for this origin doesn't allow access from the particular origin.`;
            return callback(new Error(message), false);
        }
        return callback(null, true);
    },
    credentials: true // https://stackoverflow.com/a/55566262/5012005
})