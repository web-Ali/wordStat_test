import * as axios from "axios";

const instance = axios.create({
    baseURL: 'http://tmgwebtest.azurewebsites.net/api/',
    headers: {
        'TMG-Api-Key': '0J/RgNC40LLQtdGC0LjQutC4IQ=='
    }
});


export const getList = (id) => {
    return instance.get(`textstrings/` + id)
        .then(response => {
            return response;
        });
}
