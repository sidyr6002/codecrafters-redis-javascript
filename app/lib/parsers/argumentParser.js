const process = require("process");

const argv = () => {
    let result = {};

    process.argv.forEach((arg, index) => {
        if (arg === "--port") {
            result.port = process.argv[index + 1];
        }
    });

    return result;
};

module.exports = { argv };
