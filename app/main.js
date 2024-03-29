const net = require("net");

// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log("Logs from your program will appear here!");

// Uncomment this block to pass the first stage
const server = net.createServer((socket) => {
  // Handle connection
  console.log("Connection established");
  socket.write("+PONG\r\n");
  socket.end(() => {
    console.log("Connection ended");
  });
});

server.listen(6379, () => {
  console.log("Server listening on port 6379");
});
