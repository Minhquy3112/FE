// import IProduct from "./product";

import { IProducts } from "../models/products";

export interface IAddToCart {
  productId: string;
  quantity?: number;
}

export interface ICheckOut {
  shippingAddress: string;
  paymentMethod: string;
  phone: string;
  city: string;
  district: string;
  commune: string;
}

export interface IProductCart {
  productId: IProducts;
  price: number;
  quantity: number;
  _id?: string;
}
