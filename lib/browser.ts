import 'dotenv/config';
import axios, {AxiosInstance} from "axios";

class Browser {

    private client:AxiosInstance;

    constructor() {
        this.client = axios.create({
            headers: {
                'User-Agent': process.env.USER_AGENT ?? 'Axios Client: 1.1.3',
            }
        });
    }

    async get<T>(url:string) {
        return (await this.client.get(url)).data as T;
    }
}

export default new Browser();