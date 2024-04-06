const handleInfos = require("./handleInfo");
const memory = {}

function handleCommands(commandParts) {
    //console.log('Command parts(handleCommands): ', commandParts);
    const command = commandParts[0].toUpperCase();

    switch (command) {
        case "PING":
            return "+PONG\r\n";
        case "ECHO":
            if (commandParts.length !== 2) {
                return "-ERR wrong number of arguments for 'ECHO' command\r\n";
            }

            const message = commandParts[1];
            return `+${message}\r\n`;
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
            } else
                memory[key] = value;

            return "+OK\r\n";
        case "GET":
            if (commandParts.length !== 2) {
                return "-ERR wrong number of arguments for 'GET' command\r\n";
            }

            const getKey = commandParts[1];
            if (!memory[getKey]) {
                return `$-1\r\n`;
            }

            return `+${memory[getKey]}\r\n`;
        case "INFO":
            if (commandParts.length !== 2) {
                return "-ERR wrong number of arguments for 'INFO' command\r\n";
            }

            const infoTypes = commandParts[1];
            return handleInfos(infoTypes);
        default:
            return "-ERR unknown command '" + command + "'\r\n";
    }
}

module.exports = handleCommands;