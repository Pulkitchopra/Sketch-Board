const express = require('express');
const socket = require('socket.io');


const app = express();
app.use(express.static('public'));

let port = process.env.PORT || 3000
let server = app.listen(port, () => {
    console.log('Port 3000');
} )


let io = socket(server);

io.on('connection', (socket) => {

    console.log('Socket Connection');





    socket.on('beginPath', (data) => {



        io.sockets.emit('beginPath', data);



    } )



    socket.on('drawStroke', (data) => {

        io.sockets.emit('drawStroke', data);

    } )

} )


