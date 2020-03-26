const config = require('config');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(config.get('database'), config.get('user'), config.get('password'));

const models = {
    user: sequelize.import('./users'),
};

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models