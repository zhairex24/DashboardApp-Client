import { GlobalState } from "./types"
import { IOrder } from "@/models/IOrder";
import { IProduct } from "@/models/IProduct";
import { IPasswordUpdate } from "@/models/IPasswordUpdate";

const state = (): GlobalState => {
    return {
        orders: [],
        orderDetails: {} as IOrder,
        products: [],
        productDetails: {} as IProduct,
        pages: 0,
        pageNumber: 1,
        count: 0,
        numberOfPages: 0,
        users: [],
        user: null as any,
        passwordUpdate: {} as IPasswordUpdate,
    }
}

export default state;