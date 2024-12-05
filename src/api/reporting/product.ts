import { IProduct } from "@/models/IProduct";
import api from "../api";

import { AxiosResponse, AxiosError } from "axios";

const URLS = {
    products: "products/"
}

export const loadProducts = () => {
    return new Promise((resolve, reject) => {
        api.get(URLS.products)
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

export const saveNewProduct = (newProductRecord: Partial<IProduct>) => {
    return new Promise((resolve, reject) =>  {
        api.post(URLS.products, {
            product_name: newProductRecord.productName,
            unit_price: newProductRecord.unitPrice,
            units_in_stock: newProductRecord.unitsInStock,
            units_on_order: newProductRecord.unitsOnOrder,
            category: newProductRecord.supplierId,
            supplier: newProductRecord.categoryId
        })
        .then((response: AxiosResponse) => {
            if(response.status === 201) {
                resolve(response.data);
            } else {
                reject();
            }
        })
        .catch((error: AxiosError) => {
            console.log('error in create new product ===> ', error);
        })
    });
}

export const editProduct = (id: string, editedProduct: Partial<IProduct>) => {
    return new Promise((resolve, reject) =>  {
        console.log('call api edit product => ', editedProduct.categoryId)
        api.patch(
            URLS.products + id + "/",
        {
            product_name: editedProduct.productName,
            unit_price: editedProduct.unitPrice,
            units_in_stock: editedProduct.unitsInStock,
            units_on_order: editedProduct.unitsOnOrder,
            category: editedProduct.supplier!.id,
            supplier: editedProduct.category!.id
        })
        .then((response: AxiosResponse) => {
            if(response.status === 200) {
                resolve(response.data);
            } else {
                reject();
            }
        })
        .catch((error: AxiosError) => {
            console.log('error in update product ===> ', error);
        })
    });
}

export const deleteProduct = (id: string) => {
    return new Promise((resolve, reject) =>  {
        api.delete(URLS.products + id + "/")
        .then((response: AxiosResponse) => {
            if(response.status === 204) {
                resolve(response.data)
            } else {
                reject()
            }
        })
        .catch((error: AxiosError) => {
            console.log('error in delete product ===> ', error)
            reject(error)
        })
    });
}

export const getProductDetails = (productId: string) => {

    return new Promise((resolve, reject) => {
      api
        .get(URLS.products + productId + "/") //, {}
        .then((response: AxiosResponse) => {
  
          if (response.status === 200) {
            resolve(response.data);
          } else {
            reject();
          }
        })
        .catch((error: AxiosError) => {
          console.log("caught error in product details >> ", error);
        });
    });
  };