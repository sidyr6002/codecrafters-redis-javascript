function parseCommand(buffer) {
    const commandParts = buffer.toString().trim().split('\r\n');
    console.log('Command parts: ', commandParts);
    const command = commandParts[2].toUpperCase();
    const message = commandParts.length > 3 ? commandParts[4] : null;

    return [command, message];
}

module.exports = {parseCommand}