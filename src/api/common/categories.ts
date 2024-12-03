import api from "../api";

import { AxiosResponse, AxiosError } from "axios";

const URLS = {
    categories: "categories/"
}

export const loadCategories = () => {
    return new Promise((resolve, reject) => {
        api.get(URLS.categories)
        .then((response: AxiosResponse) => {
            if(response.status === 200) {
                resolve(response.data);
            } else {
                reject();
            }
        })
        .catch((error: AxiosError) => {
            console.log('error on load categories', error);
        });
    });
};