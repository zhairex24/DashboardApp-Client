import api from "../api";

import { AxiosResponse, AxiosError } from "axios";

const URLS = {
    products: "product-filters/"
}

export const loadProducts = () => {
    return new Promise((resolve, reject) => {
        api.get(URLS.products, {})
        .then((response: AxiosResponse) => {
            if(response.status === 200) {
                resolve(response.data);
            } else {
                reject();
            }
        })
        .catch((error: AxiosError) => {
            console.log('error on load products', error);
        });
    });
};