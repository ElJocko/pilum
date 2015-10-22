'use strict';

module.exports = {
    server: {
        port: process.env.PORT || 4001,
        hostname: process.env.HOSTNAME
    },
    database: {
        url: process.env.MONGODB_URL
    },
    app: {
        name: 'Pilum',
        env: process.env.NODE_ENV || 'development'
    }
};
