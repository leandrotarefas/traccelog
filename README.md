# traccelog
Rastreabilidade de logs através de um {ID} único

## Installation

  `npm install traccelog`

## Usage

### Salvando o log em um diretorio "Default" .logs/

    const logger = require('traccelog`);

    logger.logWrite("12345","Testando funcao Info Write!");  
    
    output: 2018-08-14T19:40:36.597Z - info:  id=12345, type=Info, Date=2018-08-14T19:40:36.492Z, message="Testando funcao Info Write!"
    
    logger.logInfoRequest("56789",{data:{app:"traceLog request"}});  
   
    output: 2018-08-14T19:41:38.811Z - info:  id=56789, type=Request, Date=2018-08-14T19:41:38.716Z
    ,body={"data":{"app":"traceLog request"}}'
      
    logger.logInfoResponse("123456", {data:{app:"traceLog reponse"}});
     
    output: 2018-08-14T19:41:38.813Z - info:  id=123456, type=Response, Date=2018-08-14T19:41:38.716Z
    ,body={"data":{"app":"traceLog reponse"}}
   

### Salvando o log em um diretorio "Especifico" /data/{xyz...}/ || d:/data/{xyz}/
  
    const path = 'C:/log2/'
    const id = "123456"
    const content = "{teste:'abcde', valor=1.000}"

    loggerPath.logPathError(path, id, content);
    loggerPath.logPathInfoRequest(path, id, content);
    loggerPath.logPathInfoResponse(path, id, content);
    loggerPath.logPathWrite(path, id, content);
    
    A saida é a mesma que a informado no modelo "Default" 
    
   

## Tests

  `npm mocha`

## Contributing

We need to test this code.

## Maintainers

Leandro M Melo - conta.tarefas@gmail.com



