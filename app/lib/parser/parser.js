function parseCommand(buffer) {
    const commandParts = buffer.toString().trim().split('\r\n');
    const command = commandParts[2].toUpperCase();
    const payload = commandParts.length > 3 ? commandParts.slice(3) : null;
    //console.log('Command parts: ', command, payload);

    switch (command) {
        case "PING":
            return [command];
        case "ECHO":
            const message = payload[1];
            return [command, message];
        case "SET":
            const setKey = payload[1];
            const value = payload[3];
            return [command, setKey, value];
        case "GET":
            const getKey = payload[1];
            return [command, getKey];
        default:
            return [command];
    }
}

module.exports = {parseCommand}