const {Sequelize} = require('sequelize');


const db = new Sequelize ('test-db', 'root','',{
    host:"localhost",
    dialect:"mysql"
});

module.exports = db;