'use strict';
const mockDBCalls = require('../database/index.js');

const getUsersHandler = async (request, response) => {
    try {
        const data = await mockDBCalls.getUsers();
        return response.status(200).send(JSON.stringify(data));
    } catch {
        return response.status(404).send(JSON.stringify({errorCode: 404, error: 'Not Found'}));
    }
};

module.exports = (app) => {
    app.get('/users', getUsersHandler);
};
