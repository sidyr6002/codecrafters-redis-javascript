function sendRDBFile(socket) {
    const base64 =
        "UkVESVMwMDEx+glyZWRpcy12ZXIFNy4yLjD6CnJlZGlzLWJpdHPAQPoFY3RpbWXCbQi8ZfoIdXNlZC1tZW3CsMQQAPoIYW9mLWJhc2XAAP/wbjv+wP9aog==";
    const rdbBuffer = Buffer.from(base64, "base64");
    const rdbHead = Buffer.from(`$${rdbBuffer.length}\r\n`);

    socket.write(Buffer.concat([rdbHead, rdbBuffer]));
}

module.exports = sendRDBFile