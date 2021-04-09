const dotenv = require('dotenv').config();
const express = require('express');
const cors = require('cors');
const server = express();
const port = process.env.PORT || 8882
const path = require('path');

server.use(cors());
server.use(express.json());
server.use(express.static(path.join(__dirname, 'client/build')));

server.use('/api', (_, res) => {
    res.json({
        data: 'API is connected'
    });
})

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
