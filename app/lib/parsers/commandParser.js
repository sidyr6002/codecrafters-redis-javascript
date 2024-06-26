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

            if (payload.length > 5 && payload[5].toUpperCase() === "PX") {
                const expiry = payload[7];
                return [command, setKey, value, payload[5], expiry];
            }
             
            return [command, setKey, value];
        case "GET":
            const getKey = payload[1];
            return [command, getKey];
        case "INFO":
            const infoTypes = payload.filter(element => {
                return element[0] !== "$";
            });
            return [command, ...infoTypes];
        case "REPLCONF":
            const replicaofInfo = payload.filter(element => {
                return element[0] !== "$";
            })

            return [command, ...replicaofInfo];
        case "PSYNC":
            const psyncInfo = payload.filter(element => {
                return element.includes("$");
            })

            return [command, ...psyncInfo];
        default:
            return [command];
    }
}

module.exports = {parseCommand}