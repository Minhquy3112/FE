import instance from "."
import { IUser } from "../models/user"

const options = () => {
    return {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
    };
  };

export const getAll = ()=>{
    return instance.get("user")
}

export const getOne = ()=>{
    return instance.get(`user/profile`, options())
}

export const add = (body:any)=>{
    return instance.post("user",body)
}

export const remove = (id:any)=>{
    return instance.delete(`user/${id}`)
}

export const update = (body:IUser)=>{
    return instance.put(`user/${body._id}`,body)
}