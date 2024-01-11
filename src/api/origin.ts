import instance from ".";
import { IOrigin } from "../models/origin";

const options = () => {
  return {
      headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
  };
};

export const getAll = () => {
  return instance.get("origin");
};

export const getOne = (_id: string) => {
  return instance.get(`origin/${_id}`);
};

export const add = (body: IOrigin) => {
  return instance.post("origin", body, options());
};

export const remove = (id: any) => {
  return instance.delete(`origin/${id}`, options());
};

export const update = (body: IOrigin) => {
  return instance.put(`origin/${body._id}`, body, options());
};
