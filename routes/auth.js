import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


const router = express.Router();

const { JWT_SECRET_KEY, ADMIN_KEY } = process.env;
const User = mongoose.model('User')

// Auth
router.post('/signup', async (req, res) => {
    try {
        const { adminKey, password } = req.body;
        let { email } = req.body;
        if (adminKey !== ADMIN_KEY) {
            res.status(400).send({ errorMessage: `Invalid Admin Key` })
        }
        // lowercase their email
        email = email.toLowerCase();

        // hash their password
        const passwordHash = await bcrypt.hash(password, 10);

        // check if there is a user with that email
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400).send({ errorMessage: `User account already exists for email ${email}` })
        }

        // create the user in the database
        const user = await User.create({ ...req.body, passwordHash });
        // create the JWT token for them
        const token = jwt.sign({ userId: user.id }, JWT_SECRET_KEY);
        // We set the jwt as a cookie on the response
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year cookie
        }).send({ authToken: token });
    } catch (error) {
        console.log(error)
    }
})
router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).send({ errorMessage: `Please enter email & password` })
    }
    // 1. check if there is a user with that email
    const user = await User.findOne({ email });
    if (!user) {
        res.status(403).send({ errorMessage: `No such user found for email ${email}` })
    }
    // res.send(user)
    // 2. Check if their password is correct
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
        res.status(403).send({ errorMessage: `Invalid Password!` })
    }
    // 3. generate the JWT Token
    const token = jwt.sign({ userId: user.id }, JWT_SECRET_KEY);
    // 4. Set the cookie with the token
    res.cookie('token', token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 365,
    });
    // 5. Return the user
    res.send({ ...user, authToken: token })
})
router.post('/signout', (req, res) => {
    res.clearCookie('token');
    res.send({ message: 'Goodbye!' })
})

export default router;