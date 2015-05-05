var dbHostHame = process.env.DB_HOSTNAME || 'localhost';
var dbUrl = 'mongodb://' + dbHostHame + '/pilum';

module.exports = {
    port: process.env.PORT || 3005,
    dbUrl: dbUrl,
    app: {
        name: 'Pilum'
    },
    // The secret should be set to a non-guessable string that
    // is used to compute a session hash & jwt
    jwtSecret: '/yZWqJ+5I1b7s7Rm4QOT/EmN83fLQOnRV6YOYiXjUOlORW9wsub+l5Rkp3sy1zqoshASbm6uY4AvVCdKT/2H/Q=='
};