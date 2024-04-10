const net = require("net");

const commands = {
    PING: "*1\r\n$4\r\nping\r\n",
    REPLCONF_PORT: "*3\r\n$8\r\nREPLCONF\r\n$14\r\nlistening-port\r\n$4\r\n6380\r\n",
    REPLCONF_PSYNC: "*3\r\n$8\r\nREPLCONF\r\n$4\r\ncapa\r\n$6\r\npsync2\r\n",
    PSYNC: "*3\r\n$5\r\nPSYNC\r\n$1\r\n?\r\n$2\r\n-1\r\n"
};

function sendCommand(socket, command) {
    socket.write(commands[command]);
}

const createConnection = (host, port) => {
    const socket = new net.Socket();

    socket.connect(port, host);

    socket.on("connect", () => {
        sendCommand(socket, "PING");
    });

    socket.on("data", (data) => {
        const buffer = data.toString().trim();
        console.log("Data: ", buffer);

        switch (buffer) {
            case "+PONG":
                sendCommand(socket, "REPLCONF_PORT");
                break;
            case "+OK":
                if (!socket.sentReplconfCapa) {
                    socket.sentReplconfCapa = true;
                    sendCommand(socket, "REPLCONF_PSYNC");
                } else {
                    sendCommand(socket, "PSYNC");
                }
                break;
            default:
                console.log("Unhandled response:", buffer);
        }
    });

    socket.on("error", (err) => {
        console.log("Client error: ", err);
        socket.destroy(); // Close the socket on error
    });

    return socket;
};

module.exports = { createConnection };
