import instance from "."
import {  IMaterial} from "../models/material"

const options = () => {
    return {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
    };
};

export const getAll = ()=>{
    return instance.get("material")
}

export const getOne = (_id:string)=>{
    return instance.get(`material/${_id}`)
}

export const add = (body:IMaterial)=>{
    return instance.post("material",body, options())
}

export const remove = (id:any)=>{
    return instance.delete(`material/${id}`, options())
}

export const update = (body:IMaterial)=>{
    return instance.put(`material/${body._id}`,body, options())
}