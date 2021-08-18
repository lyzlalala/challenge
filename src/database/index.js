'use strict';
const _ = require('lodash');
const db = require('./db.js');


// UTILS
//----------------
// This is a mock db call that waits for # milliseconds and returns
const mockDBCall = (dataAccessMethod) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(dataAccessMethod());
        }, 500);
    });
};

// MOCK DB CALLS
//----------------
const getUsers = () => {
    const dataAccessMethod = () => _.map(db.usersById, userInfo => userInfo)
    return mockDBCall(dataAccessMethod);
};

const getNameList = (item) => {
    let nameList = [];
    _.map(db.itemsOfUserByUsername, (itemList, name) => {
        if (itemList.includes(item)) {
            nameList.push(name)
        }
    })
    return nameList
}

const getAgeList = nameList => {
    let ageList = [];
    for (let idx in db.usersById) {
        const { username, age } = db.usersById[idx];
        if (nameList.includes(username)) {
            ageList.push(age)
        }
    }
    return ageList
}
const getListOfAgesOfUsersWith = (item) => {
    const dataAccessMethod = () => {
        const nameList = getNameList(item)
        const ageList = getAgeList(nameList)
        let res = {};
        _.forEach(ageList, age => {
            res[age] = _.get(res, age, 0) + 1;
        })
        return  _.map(_.keys(res), (age) => {
            let ageToFreq = {}
            ageToFreq[age] = res[age]
            return ageToFreq
        });
    }
    return mockDBCall(dataAccessMethod);
}

const getAllItems = () => {
    const getItemsList = _.flow([_.values, _.flatten, _.uniq]);
    const dataAccessMethod = () => { return getItemsList(db.itemsOfUserByUsername)};
    return mockDBCall(dataAccessMethod);
}

module.exports = {
    getUsers,
    getListOfAgesOfUsersWith,
    getAllItems
};
