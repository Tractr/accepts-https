const { expect } = require('code');
const Lab = require('lab');
const lab = exports.lab = Lab.script();

lab.test('accepts https', async () => {

    const acceptsHttps = require('../index')();
    const acceptsHttpsResult = await acceptsHttps('google.com');

    expect(acceptsHttpsResult).to.equal(true);
});

lab.test('does not accept https w/ url (connection reset)', async () => {

    const acceptsHttps = require('../index')();
    const acceptsHttpsResult = await acceptsHttps('localhost');

    expect(acceptsHttpsResult).to.equal(false);
});

lab.test('does not accept https w/ url (timeout)', async () => {

    const acceptsHttps = require('../index')();
    // might change at any point in the future
    const acceptsHttpsResult = await acceptsHttps('www.cra-arc.gc.ca');

    expect(acceptsHttpsResult).to.equal(false);
});

lab.test('options.timeout super low number', async () => {

    const acceptsHttps = require('../index')({ timeout: 1 });

    const acceptsHttpsResult = await acceptsHttps('google.com');
    expect(acceptsHttpsResult).to.equal(false);
});

lab.test('options.timeout must be a number', async () => {

    // urls
    let exception;
    try {
        require('../index')({ timeout: '1' });
    }
    catch (err) {
        exception = err;
    }
    expect(exception).to.an.error();
});
