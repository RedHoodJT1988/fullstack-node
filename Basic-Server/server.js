// import statements
const fs = require('fs');

const express = require('express');

// set the port variable to use the built in env port or default to 1666
const port = process.env.PORT || 1666;

// initialize our app using express
const app = express();

// plain text response
function respondText (req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('hi');
}

// json response using ES6 arrow function syntax
const respondJson = (req, res) => {
    res.json({ text: 'Riddle me this Batman.', luckyNumbers: [42, 3, 27, 13]});
}

// not found error response
const respondNotFound = (req, res) => {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
}

// print out a query param
const respondEcho = (req, res) => {
    const { input = '' } = req.query;

    res.json({
        normal: input,
        shouty: input.toUpperCase(),
        characterCount: input.length,
        backwards: input
            .split('')
            .reverse()
            .join('')
    })
}

const respondStatic = (req, res) => {
    const filename = `${__dirname}/public/${req.params[0]}`;
    fs.createReadStream(filename)
        .on('error', () => respondNotFound(req, res))
        .pipe(res)
}

// add the routes for our API
app.get('/', respondText);
app.get('/json', respondJson);
app.get('/echo', respondEcho);
app.get('/static/*', respondStatic);

// set the server to listen on the given port
app.listen(port, () => console.log(`Server listening on port ${port}`));
