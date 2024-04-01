const net = require("net");

// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log("Logs from your program will appear here!");

// Uncomment this block to pass the first stage
const server = net.createServer((socket) => {
    // Handle connection
    console.log("Connection established");
    // socket.write("+PONG\r\n");

    // Handle Client data
    socket.on("data", (data) => {
        console.log("Received data: " + data.toString());
        socket.write("+PONG\r\n");
    });

    // Close connection
    socket.on("end", () => {
        console.log("Connection ended");
    });
});

const PORT = 6379;
server.listen(PORT, () => {
    console.log("Server listening on port:", PORT);
});
