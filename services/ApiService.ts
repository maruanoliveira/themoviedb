import axios from 'axios';
import Configurations from '../constants/Configurations';
import Routes from '../constants/Routes';

const api = axios.create({
    baseURL: Routes.baseUrl,
    headers: {
        'Authorization': `Bearer ${Configurations.TMDB_API_TOKEN}`,
        'Content-Type': 'application/json;charset=utf-8',
    }
});

export const get = async (url: string) => {

    const response = await api.get(url);

    if (response.status === 200) {
        return response.data;
    }

    return null;

}
