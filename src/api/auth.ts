import instance from "."

export const signin = (body:any)=>{
    return instance.post("signin",body)
}

export const signup = (body:any)=>{
    return instance.post("signup",body)
}