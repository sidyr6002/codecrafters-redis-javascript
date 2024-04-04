const net = require("net");
const {
    parseCommand
} = require("./lib/parsers/parser");
const handleCommands = require("./lib/controllers/handleCommands");

console.log("Logs from your program will appear here!");

const server = net.createServer((socket) => {
    console.log("Connection established. Client: " + socket.remoteAddress + ":" + socket.remotePort);

    // Handle data from client
    socket.on("data", (data) => {
        const buffer = data.toString().trim();
        //console.log("Buffer: " + buffer);
        const commandParts = buffer[0] === '*' ? parseCommand(buffer) : buffer.split(' ');
        console.log('Commands: ', commandParts);

        const response = handleCommands(commandParts);
        //console.log('Response: ' + response);
        socket.write(response);
    });

    // Close connection
    socket.on("end", () => {
        console.log("Connection ended");
        socket.end();
    });
});

const PORT = 6379;
server.listen(PORT, () => {
    console.log("Server listening on port:", PORT);
});
