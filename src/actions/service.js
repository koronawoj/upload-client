import axios from "axios/index";

export const makeRequest = (method = 'GET', url = '', data = {}, token = '') => {
    return axios({
        method: method,
        url: `http://localhost:3090/${url}`,
        data: data,
        headers: {
            'authorization': token
        }
    });
}
