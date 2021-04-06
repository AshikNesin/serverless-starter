const cookiesMiddleware = (req, res, next) => {
    req.cookies = {};
    const cookieString = req.headers.cookie || '';
    const rawCookies = req.headers.cookie.split('; ');
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