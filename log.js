
const logger = require("./log_config");

'use strict';

const now = new Date().toISOString().toLocaleString('pt-br', {timezone: 'Brazil/brt'});

module.exports = {

    /**
     * logar dados com erros de aplicacao
     * @param {string} id para rastrear
     * @param {string} message descricao
     */
    logError: function (id, content) {
        logger.error({
              id: id
            , type: 'Error'
            , Date: now
            , message: JSON.stringify(content)
        });
    },
    
   
    /**
     * logar dados de Request da entrada 
     * @param {string} id para rastrear
     * @param {string} content conteudo do request
     */
    logInfoRequest: function (id, content) {
        logger.info({
                id: id
            , type: 'Request'
            , Date: now
            , body: JSON.stringify(content)
        });
    },

    /**
     * logar dados de Response para resposta 
     * @param {string} id para rastrear
     * @param {string} content conteudo do request
     */
    logInfoResponse: function (id, content) {
        logger.info({
                id: id
            , type: 'Response'
            , Date: now
            , body: JSON.stringify(content)
        });
    },

    

    /**
     * logar dados com informacoes importantes para analise de funcionalidades da aplicacao 
     * @param {string} id para rastrear
     * @param {string} message descricao
     */
    logWrite: function (id, content) {
        logger.info({
                   id: id
            ,    type: 'Info'
            ,    Date: now
            , message: JSON.stringify(content)
        });
    }

};