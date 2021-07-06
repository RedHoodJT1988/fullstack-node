// import statements
const http = require('http');

// set the port variable to use the built in env port or default to 1666
const port = process.env.PORT || 1666;

// create the server and respond with a message
const server = http.createServer(function (req, res) {
    res.end('hi');
});

// set the server to listen on the given port
server.listen(port);
console.log(`Server listening on port ${port}...`);