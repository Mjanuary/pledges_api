const config = require('config');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(config.get('database'), config.get('user'), config.get('password'), {
    dialect: 'postgres'
});

const models = {
    user: sequelize.import('./users'),
};

Object.keys(models).forEach(modelName => {
    if (models[modelName].associate) {
        models[modelName].associate(models);
    }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models