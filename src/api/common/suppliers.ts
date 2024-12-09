import api from "../api";

import { AxiosResponse, AxiosError } from "axios";

const URLS = {
    suppliers: "suppliers/"
}

export const loadSuppliers = () => {
    return new Promise((resolve, reject) => {
        api.get(URLS.suppliers, {})
        .then((response: AxiosResponse) => {
            if(response.status === 200) {
                console.log('eyy')
                resolve(response.data.results);
            } else {
                reject();
            }
        })
        .catch((error: AxiosError) => {
            console.log('error on load suppliers', error);
        });
    });
};