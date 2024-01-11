import { useNavigate, useParams } from "react-router-dom";
import { IProducts } from "../../models/products";
import { useEffect, useState } from "react";
import { getOne } from "../../api/products";
import "./3d.css"

const Image3D = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);
  const [product, setProduct] = useState<IProducts>({} as IProducts);

  const fetchProductById = async (_id: any) => {
    try {
      const { data } = await getOne(_id);
      console.log(data);
      setProduct(data.product);
    } catch (error) {}
  };
  console.log(product.materialId?.name);
  useEffect(() => {
    if (id) {
      fetchProductById(id);
    }
  }, []);
  return (
    <>
      <div className="tyloo">
        <span style={{ "--i": 0 }}></span>
        <img
          style={{ height: "300px"}}
          src={product.img?.[1]}
          alt=""
        />
        <span style={{ "--i": 1 }}></span>
        <img
          style={{ height: "300px"}}
          src={product.img?.[2]}
          alt=""
        />
        <span style={{ "--i": 2 }}></span>
        <img
          style={{ height: "300px"}}
          src={product.img?.[3]}
          alt=""
        />
        <span style={{ "--i": 3 }}></span>
        <img
          style={{ height: "300px"}}
          src={product.img?.[4]}
          alt=""
        />
        <span style={{ "--i": 4 }}></span>
        <img
          style={{ height: "300px"}}
          src={product.img?.[1]}
          alt=""
        />
        <span style={{ "--i": 5 }}></span>
        <img
          style={{ height: "300px"}}
          src={product.img?.[0]}
          alt=""
        />
      </div>
    </>
  );
};

export default Image3D;
