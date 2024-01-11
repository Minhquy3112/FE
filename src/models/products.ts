import { ICategory } from "./category"
import { IMaterial } from "./material"
import { IOrigin } from "./origin"

export interface IProducts{
    _id:string,
    name:string,
    img:string,
    price:number,
    description:string
    height:number,
    weight:number,
    originId:IOrigin,
    materialId:IMaterial,
    categoryId:ICategory
}







