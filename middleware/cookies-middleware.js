const cookiesMiddleware = (req, res, next) => {
    req.cookies = {};
    const cookieString = req.headers.cookie || '';
    const rawCookies = cookieString.split('; ');
    if (cookieString && rawCookies.length) {
        rawCookies.map(item => {
            const [key, value] = item.split('=');
            if (key && value) {
                req.cookies[key] = value;
            }
        })
    }

    next();
}

export default cookiesMiddleware;