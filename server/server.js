const express = require('express');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

/**
 * require routers
 */
const userRouter = require('./routes/user');

/**
 * handle parsing request body
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Parse Cookie header and populate req.cookies with an object keyed by the cookie names. Optionally you may enable signed cookie support by passing a secret string, which assigns req.secret so it may be used by other middleware.
 *
 */

app.use(cookieParser());

/**
 * define route handlers
 */
app.use('/user', userRouter);

/**
 * catch-all route handler for any requests to an unknown route
 */
app.use('*', (req, res) => {
	return res.sendStatus(404);
});

/**
 * configure express global error handler
 * @see https://expressjs.com/en/guide/error-handling.html#writing-error-handlers
 */
app.use((err, req, res, next) => {
	const defaultErr = {
		log: 'Express error handler caught unknown middleware error',
		status: 400,
		message: { err: 'An error occurred' },
	};
	const errorObj = Object.assign({}, defaultErr, err);
	console.log('errorObj.message --->', errorObj.message);
	console.log('errorObj.status --->', errorObj.status);
	return res.status(errorObj.status).json(errorObj.message);
});

/**
 * start server
 */
app.listen(PORT, () => {
	console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;
