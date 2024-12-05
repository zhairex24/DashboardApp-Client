import { ISupplier } from "./ISupplier";
import { ICategory } from "./ICategory";

export interface IProduct {
    id: string;
    productName: string;
    unitPrice: number;
    unitsInStock: number;
    unitsOnOrder: number;
    supplier: ISupplier | null;
    category: ICategory;

    categoryId: string;
    supplierId: string;
}