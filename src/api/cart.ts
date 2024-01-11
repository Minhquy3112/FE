import instance from "."
import { IAddToCart, ICheckOut } from "../models/cart";

const options = () => {
    return {
        headers: {
            Authorization : `Bearer ${localStorage.getItem("accessToken")}`,
        },
    };
};

const getCarts = () => {
  return instance.get(`cart`, options());
};

const getCartUser = () => {
  return instance.get(`cart/user`, options());
};

const addToCart = (dataCart: IAddToCart) => {
  return instance.post(`cart/add`, dataCart, options());
};

const updateProductCart = (dataCart: IAddToCart) => {
  return instance.put(`cart/update`, dataCart, options());
};

const deleteProductCart = (productId: string) => {
  return instance.delete(`cart/delete/${productId}`, options());
};

const deleteCart = () => {
  return instance.delete(`cart/delete-all`, options());
};

const checkOut = (dataCheckOut: ICheckOut) => {
  return instance.post(`cart/checkout`, dataCheckOut, options());
};

export {
  getCarts,
  getCartUser,
  addToCart,
  updateProductCart,
  deleteProductCart,
  deleteCart,
  checkOut,
};
