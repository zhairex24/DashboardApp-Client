import axios, {AxiosResponse} from "axios";

export const loadOrders = () => {
    return axios.get('http://localhost:8000/api/orders/')
        .then((response: AxiosResponse) => {
            console.log(response.data);
            return response.data;
        })
}

export const loadProducts = () => {
    return axios.get('http://localhost:8000/api/products/')
        .then((response: AxiosResponse) => {
            console.log(response.data);
            return response.data;
        })
}