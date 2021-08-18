'use strict';
const mockDBCalls = require('../database/index.js');

const getListOfAgesOfUsersWithHandler = async (request, response) => {
    try {
        const itemToLookup = (request && request.query && request.query.item) || '';
        const data = await mockDBCalls.getListOfAgesOfUsersWith(itemToLookup);
        if (!data.length) {
            throw new Error()
        }
        return response.status(200).send(JSON.stringify(data));
    } catch (error) {
        return response.status(404).send(JSON.stringify({errorCode: 404, error: 'Not Found'}));
    }
};

const getAllItems = async (request, response) => {
    try {
        const data = await mockDBCalls.getAllItems();
        return response.status(200).send(JSON.stringify(data));
    } catch(error){
        return response.status(404).send(JSON.stringify({errorCode: 404, error: 'Not Found'}));
    }
}

module.exports = (app) => {
    app.get('/users/age', getListOfAgesOfUsersWithHandler);
    app.get('/users/allItems', getAllItems);
};
