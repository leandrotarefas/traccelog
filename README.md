# tracelog
Rastreabilidade de logs através de um {ID} único

## Installation

  `npm install @leandrotarefas/tracelog`

## Usage

    const logger = require('@leandrotarefas/tracelog`);

    logger.logWrite("12345","Testando funcao Info Write!",200);  
    
    output: 2018-08-14T19:40:36.597Z - info:  id=12345, type=Info, Date=2018-08-14T19:40:36.492Z, message="Testando funcao Info Write!"
   
   
   logger.logInfoRequest("56789",{data:{app:"traceLog request"}});  
   
   output: 2018-08-14T19:41:38.811Z - info:  id=56789, type=Request, Date=2018-08-14T19:41:38.716Z
   ,body={"data":{"app":"traceLog request"}}'
      
   logger.logInfoResponse("123456", {data:{app:"traceLog reponse"}});
   
   
   output: 2018-08-14T19:41:38.813Z - info:  id=123456, type=Response, Date=2018-08-14T19:41:38.716Z
   ,body={"data":{"app":"traceLog reponse"}}
   

## Tests

  `npm test`

## Contributing

We need to test this code.

