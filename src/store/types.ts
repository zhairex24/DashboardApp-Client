import { IOrder } from "@/models/IOrder";
import { IProduct } from "@/models/IProduct";

export interface GlobalState {
    orders:  any[],
    orderDetails:  IOrder,
    products:  any[],
    productDetails: IProduct,
    pages: number;
    pageNumber: number;
    count: number;
    numberOfPages: number;
}