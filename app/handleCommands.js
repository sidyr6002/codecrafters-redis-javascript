function handleCommands(commandParts) {
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
        default:
            return "-ERR unknown command '" + command + "'\r\n";
    }
}

module.exports = handleCommands;