let isDevelopment = (process.env.NODE_ENV === 'development');
let database= 'mongodb://localhost:27017/mahta';

function log (message) {
    if (isDevelopment)
        console.log(message);
}

module.exports = {
    isDevelopment: isDevelopment,
    database,
    log
};