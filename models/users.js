module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('users', {
        username: DataTypes.STRING
    });

    User.associate = function (models) {
        models.User.hasMany(models.Task);
    };

    return User;
};