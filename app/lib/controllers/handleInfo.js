const { argv } = require("./../parsers/argumentParser");
const COMMAND_ARGUMENTS = argv();

let replicationInfos = require("../types/replicationInfo");


function nomalizeReplicationInfo(replicationInfos) {
    let response = "";

    Object.entries(replicationInfos).forEach((info) => {
        //console.log('Info:', info);
        let entry = info[0] + ":" + info[1];
        response += "$" + entry.length + "\r\n" + entry + "\r\n";
    });

    return response;
}

function handleInfos(infoTypes) {
    let result = "";

    //console.log('Info types: ', infoTypes);

    infoTypes.forEach(infoType => {
        switch (infoType.toUpperCase()) {
            case "REPLICATION":
                console.log('Command: ', COMMAND_ARGUMENTS);
                replicationInfos.role = COMMAND_ARGUMENTS.replicaof ? "slave" : "master";
                result += nomalizeReplicationInfo(replicationInfos);
                break;
            default:
                result = "-ERR unknown info type '" + infoType + "'\r\n";
                break;
        }
    })

    //console.log('Result: ', result);

    return result;
}

module.exports = handleInfos