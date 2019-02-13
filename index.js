'use strict';

const Net = require('net');
const Performance = require('perf_hooks').performance;

const defaults = {
    timeout: 1000
};

module.exports = (options = {}) => {

    const config = getConfig();

    return (domain) => {

        return new Promise((resolve => {

            const socket = new Net.Socket();
            let opened;
            let closed;
            let status = null;

            socket.on('connect', function () {
                opened = Performance.now();
                status = 'open';
                setTimeout(() => { socket.destroy(); }, 10);
            })

            socket.setTimeout(config.timeout);
            socket.on('timeout', function () {
                status = 'closed';
                socket.destroy();
            })

            socket.on('error', function () {
                /* $lab:coverage:off$ */
                status = 'closed';
                /* $lab:coverage:on$ */
            })

            socket.on('close', function () {
                closed = Performance.now();
                const connectionReset = closed - opened < 10;
                resolve(status === 'open' && !connectionReset);
            })

            socket.connect(443, domain);
        }));
    };

    function getConfig() {

        const config = {};

        if (options.timeout) {
            if (typeof options.timeout !== 'number') {
                throw new Error('options.timeout must be a number');
            }
            config.timeout = options.timeout;
        }
        else {
            config.timeout = defaults.timeout;
        }

        return config;
    }
};
