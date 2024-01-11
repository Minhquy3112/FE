import instance from "."
import { IProducts } from "../models/products"
const options = () => {
    return {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
    };
};

export const getAll = ()=>{
    return instance.get("products")
}

export const getOne = (_id:string)=>{
    return instance.get(`products/${_id}`)
}

export const add = (body:any)=>{
    return instance.post("products",body, options())
}

export const remove = (id:any)=>{
    return instance.delete(`products/${id}`, options())
}

export const update = (body:IProducts)=>{
    return instance.put(`products/${body._id}`,body, options())
}
