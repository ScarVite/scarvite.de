const { Sequelize, DataTypes } = require('sequelize');
const conf = require('../../../auth.json');

const sequelize = new Sequelize(conf.db.database, conf.db.user, conf.db.password, {
    host: conf.db.host,
    dialect: conf.db.dialect
});

try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }