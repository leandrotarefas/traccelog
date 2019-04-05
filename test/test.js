'use strict';


var assert = require('assert');

const logger = require('../log');
const fs = require("fs");
const path = require('path');
var expect = require('chai').expect

const hoje = new Date().toISOString().toLocaleString('pt-br', {timezone: 'Brazil/brt'}).substr(0,10);
const logDirectory = path.join('./logs');
const fileName = '/log.'+hoje;
const logFullPath = path.join(logDirectory+fileName);

var deleteFolderRecursive = function(path) {
    fs.unlinkSync(path);    
};

after(function() {
    deleteFolderRecursive(logFullPath);
});

const getLine = (index, splitKey) => {
    const line = new Promise((ok, nok ) => {

        fs.readFile(logFullPath, 'utf8', function (err, data) {
            if (err) nok(err);
            var linhas = data.split('\n');
            for(let indexLinha = 1; indexLinha< linhas.length; indexLinha++){
                if(indexLinha==index){
                    const _data = linhas[indexLinha - 1].toString().split(splitKey);
                    ok(_data);
                }
            } 
            nok("informacao nao encontrada no arquivo!");              
        });
    });

    return line;    
};

const parte1 = 0;
const parte2 = 1;

const getDataDeLog = (linhaDoLog) => {
    const promise = new Promise((ok, nok ) => {
        const dataDoLog = linhaDoLog[parte1].trim().substr(0,10);
        ok(dataDoLog);  
    });
    return promise;    
};

const getDadosDaLinhaDeLog = (linhaDoLog) => {
    const promise = new Promise((ok, nok ) => {
        const tamanho = linhaDoLog[parte2].length;
        const inicioDaLinha = linhaDoLog[parte2].trim().substr(0,tamanho);
        ok(inicioDaLinha);  
    });
    return promise;    
};

describe('#Testar geracao de logs rastreaveis na aplicacao', function() {

    describe('testar a função log Write', function() {

        logger.logWrite("12345",{data:{app:"tracceLog Write"}});      
               
        it('Verificar propriedade (datetime) da funcao Write', function() {              
            return getLine(1, "info:").then(getDataDeLog).then((dataDoLog)=>{
                expect(hoje).to.equal(dataDoLog);                     
            });              
        });

        it('Verificar padrao inicial de informacoes da funcao Write', function() {  

            const valorInicialEsperado = "id=12345, type=Info, Date="+hoje;

            return getLine(1, "info:").then(getDadosDaLinhaDeLog).then((linha)=>{  
                const valorLinha = linha.substr(0,valorInicialEsperado.length);              
                expect(valorInicialEsperado).to.equal(valorLinha);  
            }); 
        });

        it('Verificar padrao final de informacoes do Write', function() {            
            return getLine(1, "info:").then((linhaDoLog)=>{
                const finalEsperado = "tracceLog Write";
                const mensagemLogWrite = linhaDoLog[parte2].split(',')[3].trim().replace("message=","")
                const conteudoBody = JSON.parse(mensagemLogWrite);
                const valorWrite = conteudoBody.data.app; 
                expect(valorWrite).to.equal(finalEsperado);  
            }); 
        });

    });   


    describe('testar a função log Request', function() {

        logger.logInfoRequest("56789",{data:{app:"tracceLog Request"}});  

        it('Verificar propriedade (datetime) da funcao Request', function() {              
            return getLine(2, "info:").then(getDataDeLog).then((dataDoLog)=>{
                expect(dataDoLog).to.equal(hoje);                     
            });              
        });

        it('Verificar padrao inicial de informacoes da funcao Request', function() {  
            const valorInicialEsperado = "id=56789, type=Request, Date="+hoje;
            return getLine(2, "info:").then(getDadosDaLinhaDeLog).then((linha)=>{                
                const valorLinha = linha.substr(0,valorInicialEsperado.length);              
                expect(valorLinha).to.equal(valorInicialEsperado); 
            }); 
        });


        it('Verificar padrao final de informacoes do Request', function() {            
            return getLine(2, "info:").then((linhaDoLog)=>{   
                const finalEsperado = "tracceLog Request";
                const mensagemLogRequest = linhaDoLog[parte2].split(',')[3].trim().replace("body=","")
                const conteudoBody = JSON.parse(mensagemLogRequest);
                const valorRequest = conteudoBody.data.app; 
                expect(valorRequest).to.equal(finalEsperado);  
            }); 
        });

    });


    describe('testar a função log Response', function() {

        logger.logInfoResponse("45678",{data:{app:"tracceLog Response"}});  

        it('Verificar propriedade (datetime) da funcao Response', function() {              
            return getLine(3, "info:").then(getDataDeLog).then((dataDoLog)=>{
                expect(dataDoLog).to.equal(hoje);                     
            });              
        });

        it('Verificar padrao inicial de informacoes da funcao Response', function() {  
            const valorInicialEsperado = "id=45678, type=Response, Date="+hoje;
            return getLine(3, "info:").then(getDadosDaLinhaDeLog).then((linha)=>{                
                const valorLinha = linha.substr(0,valorInicialEsperado.length);              
                expect(valorLinha).to.equal(valorInicialEsperado); 
            }); 
        });


        it('Verificar padrao final de informacoes do Response', function() {            
            return getLine(3, "info:").then((linhaDoLog)=>{   
                const finalEsperado = "tracceLog Response";
                const mensagemLogResponse = linhaDoLog[parte2].split(',')[3].trim().replace("body=","")
                const conteudoBody = JSON.parse(mensagemLogResponse);
                const valorResponse = conteudoBody.data.app; 
                expect(valorResponse).to.equal(finalEsperado);  
            }); 
        });

    });


    describe('testar a função log Error', function() {

        logger.logError("12345",{data:{app:"tracceLog Error"}});      
               
        it('Verificar propriedade (datetime) da funcao Error', function() {              
            return getLine(4, "error:").then(getDataDeLog).then((dataDoLog)=>{
                expect(hoje).to.equal(dataDoLog);                     
            });              
        });

        it('Verificar padrao inicial de informacoes da funcao Error', function() {  

            const valorInicialEsperado = "id=12345, type=Error, Date="+hoje;

            return getLine(4, "error:").then(getDadosDaLinhaDeLog).then((linha)=>{  
                const valorLinha = linha.substr(0,valorInicialEsperado.length);              
                expect(valorLinha).to.equal(valorInicialEsperado);  
            }); 
        });

        it('Verificar padrao final de informacoes do Error', function() {            
            return getLine(4, "error:").then((linhaDoLog)=>{
                const finalEsperado = "tracceLog Error";
                const mensagemLogError = linhaDoLog[parte2].split(',')[3].trim().replace("message=","")
                const conteudoBody = JSON.parse(mensagemLogError);
                const valorError = conteudoBody.data.app; 
                expect(valorError).to.equal(finalEsperado);  
            }); 
        });

    });  


});



    
