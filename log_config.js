const winston = require('winston');
winston.emitErrs = true;


const path = require('path');
const fs = require('fs');
require('winston-daily-rotate-file');

const logDirectory = path.join('./logs');

const logger = new winston.Logger({
    transports: [
     
        new (winston.transports.DailyRotateFile)({
            filename: './logs/log',
            prepend: true,
            level: 'info'
          }),
        new winston.transports.Console({
            level: 'debug',
            handleExceptions: true,
            json: false,
            colorize: true
        })
    ],
    exitOnError: false
});

if(fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)){
    module.exports = logger;
}else{
    return new console.error("Não foi possivel criar diretorio de logs!");    
}



