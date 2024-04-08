const net = require("net");
const {
    parseCommand
} = require("./lib/parsers/commandParser");
const handleCommands = require("./lib/controllers/handleCommands");
const { argv } = require("./lib/parsers/argumentParser");
const { createConnection } = require("./lib/handshake/createConnection");

console.log("Logs from your program will appear here!");

const DEFAULT_PORT = 6379;
const COMMAND_ARGUMENTS = argv();

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

const startServer = () => { 
    const PORT = COMMAND_ARGUMENTS.port ? COMMAND_ARGUMENTS.port : DEFAULT_PORT;
    const replicaof = COMMAND_ARGUMENTS.replicaof;

    server.listen(PORT, () => {
        console.log("Server listening on port:", PORT);
    });

    if (replicaof) {
        createConnection(replicaof[0], replicaof[1]);
    }
}

startServer();
