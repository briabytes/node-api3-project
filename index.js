// require your server and launch it
const server = require('./api/server');

server.listen(8888, () => {
    console.log('Server is running on port 8888');
})