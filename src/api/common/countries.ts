import api from "../api";

import { AxiosResponse, AxiosError } from "axios";

const URLS = {
    countries: "country-filters/"
}

export const loadCountries = () => {
    return new Promise((resolve, reject) => {
        api.get(URLS.countries, {})
        .then((response: AxiosResponse) => {
            if(response.status === 200) {
                resolve(response.data);
            } else {
                reject();
            }
        })
        .catch((error: AxiosError) => {
            console.log('error on load countries', error);
        });
    });
};