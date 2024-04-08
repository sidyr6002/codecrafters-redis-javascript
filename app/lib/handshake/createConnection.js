const net = require("net");

const conf = [
    "*3\r\n$8\r\nREPLCONF\r\n$14\r\nlistening-port\r\n$4\r\n6380\r\n",
    "*3\r\n$8\r\nREPLCONF\r\n$4\r\ncapa\r\n$6\r\npsync2\r\n",
];

const createConnection = (host, port) => {
    const socket = new net.Socket();
    socket.connect(port, host);

    socket.on("connect", () => {
        socket.write("*1\r\n$4\r\nping\r\n");
    });

    socket.on("data", () => {
        conf.forEach((c) => {
            socket.write(c);
        })
    })

    socket.on("error", (err) => {
        console.log("Client error: ", err);
    })
};


module.exports = { createConnection };
