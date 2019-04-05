'use strict';

const winston = require('winston');
winston.emitErrs = true;

require('winston-daily-rotate-file');

var log = function (loggerConfig, logType, id, content) {

    const logger = require("./log")

    switch (logType) {
        case 'error':
            logger.logError(id, content, loggerConfig);
            break;
        case 'infoRequest':
            logger.logInfoRequest(id, content, loggerConfig);
            break;
        case 'infoResponse':
            logger.logInfoResponse(id, content, loggerConfig);
            break;
        case 'write':
            logger.logWrite(id, content, loggerConfig);
            break;

        default:
            logger.logWrite(id, content);
            break;
    }
}


var configLogFolder = function (path, logType, id, content) {

    const fs = require('fs');

    fs.existsSync(path) || fs.mkdirSync(path)


    const loggerConfig = new winston.Logger({
        transports: [

            new (winston.transports.DailyRotateFile)(
                {
                    filename: path + 'log',
                    prepend: true,
                    level: 'info'
                }
            ),
            new winston.transports.Console(
                {
                    level: 'debug',
                    handleExceptions: true,
                    json: false,
                    colorize: true
                }
            )
        ],
        exitOnError: false
    });

    log(loggerConfig, logType, id, content);
}


module.exports = {

    logPathRequest: function (path, id, content) {
        const logType = "infoRequest";
        configLogFolder(path, logType, id, content)
    },

    logPathResponse: function (path, id, content) {
        const logType = "infoResponse";
        configLogFolder(path, logType, id, content)
    },

    logPathError: function (path, id, content) {
        const logType = "error";
        configLogFolder(path, logType, id, content)
    },

    logPathWrite: function (path, id, content) {
        const logType = "write";
        configLogFolder(path, logType, id, content)
    }
}





