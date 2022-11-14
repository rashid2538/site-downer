import { Worker } from "worker_threads";

export class Terminator {

    private workers:Worker[] = [];

    constructor(numberOfThreads:number, url:string, concurrency:number) {
        for(let i = 0; i < numberOfThreads; i++) {
            this.workers.push(new Worker('./lib/worker.js', {
                workerData: {
                    url: url,
                    concurrency: concurrency,
                }
            }));
        }

        this.workers.forEach((worker:Worker, i:number) => {
            worker.on('message', this.log.bind(this, `Worker-${i}-MESSAGE: `));
            worker.on('error', this.error.bind(this, `Worker-${i}-ERROR: `));
            worker.on('exit', this.log.bind(this, `Worker-${i}-EXIT`));
        });
    }

    private log(...args:any[]):void {
        console.log(new Date(), ...args);
    }

    private error(...args:any[]):void {
        console.error(new Date(), ...args);
    }
}
