import { ICustomer } from "./ICustomer";
import { IProduct } from "./IProduct";

export interface IOrder {
    id: string;
    orderDate: Date;
    requiredDate: string;
    shippedName: string;
    shippedBarangay: string;
    shippedCity: string;
    shippedProvince: string;
    shippedCountry: string;
    shippedPostalCode: string;
    customer: ICustomer;
    product: IProduct;

    customerId: string;
    productId: string;
}