import { IOrder } from "@/models/IOrder";
import { IProduct } from "@/models/IProduct";
import { IUser } from "@/models/IUser";
import { IPasswordUpdate } from "@/models/IPasswordUpdate";

export interface GlobalState {
    orders:  any[],
    orderDetails:  IOrder,
    products:  any[],
    productDetails: IProduct,
    pages: number;
    pageNumber: number;
    count: number;
    numberOfPages: number;
    users:  IUser [],
    user:  IUser,
    passwordUpdate:  IPasswordUpdate,
}