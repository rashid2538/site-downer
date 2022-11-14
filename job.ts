import 'dotenv/config';
import { Terminator } from "./lib/terminator";

new Terminator(parseInt(process.env.THREAD_COUNT ?? '2'), process.env.URL ?? 'https://www.google.com/', parseInt(process.env.CONCURRENY ?? '500'), process.env.USER_AGENT ?? 'AXIOS Client: 1.1.3');
