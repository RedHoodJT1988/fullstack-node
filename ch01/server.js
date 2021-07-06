// import statements
const http = require('http');
const querystring = require('querystring');

// set the port variable to use the built in env port or default to 1666
const port = process.env.PORT || 1666;

// plain text response
function respondText (req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('hi');
}

// json response using ES6 arrow function syntax
const respondJson = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ text: 'Riddle me this Batman.', luckyNumbers: [42, 3, 27, 13]}));
}

// not found error response
const respondNotFound = (req, res) => {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
}

// print out a query param
const respondEcho = (req, res) => {
    const { input = '' } = querystring.parse(
        req.url
            .split('?')
            .slice(1)
            .join('')
    )

    res.setHeader('Content-Type', 'application/json')
    res.end(
        JSON.stringify({
            normal: input,
            shouty: input.toUpperCase(),
            characterCount: input.length,
            backwards: input
                .split('')
                .reverse()
                .join('')
        })
    )
}

// create the server and respond with a message
const server = http.createServer(function (req, res) {
    if (req.url === '/') return respondText(req, res);
    if (req.url === '/json') return respondJson(req, res);
    if (req.url.match(/^\/echo/)) return respondEcho(req, res);

    respondNotFound(req, res);
});

// set the server to listen on the given port
server.listen(port);
console.log(`Server listening on port ${port}...`);