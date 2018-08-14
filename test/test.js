'use strict';



const logger = require('../log');
const fs = require("fs");
const path = require('path');
var expect = require('chai').expect

const now = new Date().toISOString().toLocaleString('pt-br', {timezone: 'Brazil/brt'}).substr(0,10);
const logDirectory = path.join('./logs');
const fileName = '/log.'+now;
const logFullPath = path.join(logDirectory+fileName);

var deleteFolderRecursive = function(path) {
    //fs.unlinkSync(path);    
};

after(function() {
    deleteFolderRecursive(logFullPath);
});

const getLine = (index, splitKey) => {
    const line = new Promise((ok, nok ) => {
        let indexLine = 1;
        fs.readFile(logFullPath, 'utf8', function (err, data) {
            if (err) nok(err);
            if(index == indexLine){
                const _data = data.toString().split(splitKey);
                ok(_data);
            } 
            indexLine++;               
        });
    });

    return line;    
};


describe('#Testar geracao de logs rastreaveis na aplicacao', function() {

    describe('testar a função log Write', function() {

        logger.logWrite("12345","Testando funcao Info Write!",200);      
               
        it('Verificar propriedade log da funcao Write', function() {   
            getLine(1, "info:").then((data)=>{
                const logDate = data[0].trim().substr(0,10);              
                expect(logDate).to.equal(now);
              
            }).catch((err)=>{
                return Promise.reject(new Error(err));        
            });   
        });

        it('Verificar padrao inicial de informacoes da funcao Write', function() {   
            getLine(1, "info:").then((data)=>{

                const expectStartOfLine = "id=12345, type=Info, Date="+now;
                const startOfLine = data[1].trim().substr(0,36);
                expect(startOfLine).to.equal(expectStartOfLine);            
          
            }).catch((err)=>{
                return Promise.reject(new Error(err));       
            }); 
        });

        it('Verificar padrao final de informacoes do Write', function() {            
            getLine(1, "info:").then((data)=>{
                const expectEndOfLine = 'message="Testando funcao Info Write!"';
                const endOfLine = data[1].trim().substr(52,37);  
                expect(endOfLine).to.equal(expectEndOfLine);           
             
            }).catch((err)=>{
                return Promise.reject(new Error(err));       
            }); 
        });

    });   
    
    describe('testar a função log Request', function() {

        logger.logInfoRequest("56789",{data:{app:"traceLog request"}});  

        it('Verificar propriedade log da funcao Request', function() {   
            getLine(2, "info:").then((data)=>{
                const logDate = data[0].trim().substr(0,10);
                expect(logDate).to.equal(now);
             
            }).catch((err)=>{
                return Promise.reject(new Error(err));       
            });   
        })

    });


    describe('testar a função log Response', function() {

        logger.logInfoResponse("123456", {data:{app:"traceLog reponse"}});

        it('Verificar propriedade log da funcao Response', function() {   
            getLine(3, "info:").then((data)=>{
                const logDate = data[0].trim().substr(0,10);
                expect(logDate).to.equal(now);
               
            }).catch((err)=>{
                return Promise.reject(new Error());       
            });    
        })

    });

    

});



    
