const handleInfos = require("./handleInfo");
const sendRDBFile = require("./handleRDBFile");
let replicaofInfo = require("../types/replicationInfo");

const memory = {};

function handleCommands(socket, commandParts) {
    //console.log('Command parts(handleCommands): ', commandParts);
    const command = commandParts[0].toUpperCase();

    switch (command) {
        case "PING":
            socket.write("+PONG\r\n");
            break;

        case "ECHO":
            if (commandParts.length !== 2) {
                return "-ERR wrong number of arguments for 'ECHO' command\r\n";
            }

            const message = commandParts[1];
            socket.write(`+${message}\r\n`);
            break;

        case "SET":
            if (commandParts.length < 3 || commandParts.length > 5) {
                return "-ERR wrong number of arguments for 'SET' command\r\n";
            }

            const key = commandParts[1];
            const value = commandParts[2];
            if (commandParts.length === 5) {
                const expiry = commandParts[4];
                memory[key] = value;
                setTimeout(() => {
                    delete memory[key];
                }, expiry);
            } else memory[key] = value;

            socket.write("+OK\r\n");
            break;

        case "GET":
            if (commandParts.length !== 2) {
                return "-ERR wrong number of arguments for 'GET' command\r\n";
            }

            const getKey = commandParts[1];
            if (!memory[getKey]) {
                socket.write(`$-1\r\n`);
                break;
            }

            socket.write(`+${memory[getKey]}\r\n`);
            break;

        case "INFO":
            if (commandParts.length !== 2) {
                return "-ERR wrong number of arguments for 'INFO' command\r\n";
            }

            const infoTypes = commandParts.slice(1);
            const infoResponse = handleInfos(infoTypes);
            socket.write(infoResponse);
            break;

        case "REPLCONF":
            if (commandParts.length !== 3 && commandParts.length !== 5) {
                return "-ERR wrong number of arguments for 'REPLCONF' command\r\n";
            }

            socket.write(`+OK\r\n`);
            break;

        case "PSYNC":
            if (commandParts.length !== 3) {
                return "-ERR wrong number of arguments for 'PSYNC' command\r\n";
            }

            socket.write(`+FULLRESYNC ${replicaofInfo.master_replid} 0\r\n`);
            sendRDBFile(socket);
            break;

        default:
            return "-ERR unknown command '" + command + "'\r\n";
    }
}

module.exports = handleCommands;
