const { sequelize, Sequelize} = require('./db');

const User = sequelize.define('user', {
    name: Sequelize.STRING,
    email: Sequelize.STRING
});

module.exports = { User };