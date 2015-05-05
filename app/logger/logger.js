var winston = require('winston');

var logger = new winston.Logger ({
    transports: [
        new (winston.transports.Console) ({
            timestamp: function() {
                return new Date().toISOString();
            },
            formatter: function(options) {
                // Return string will be passed to logger.
                return options.timestamp() + ' [' + options.level.toUpperCase() + '] ' + (undefined !== options.message ? options.message : '') +
                    (options.meta && Object.keys(options.meta).length ? '\n\t' + JSON.stringify(options.meta) : '' );
            }
        })
    ]
});

module.exports = logger;

module.exports.stream = {
    write: function(message, encoding) {
        // Write to the log. Remove the last character to avoid double 'new line' characters.
        logger.info(message.slice(0, -1));
    }
};
