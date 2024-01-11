import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchProductsAll, fetchProductsOne } from "../redux/products.reducer";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { fetchCategoriesAll } from "../redux/categories.reducer";
import { useForm } from "react-hook-form";
import { IProducts } from "../models/products";
import { Button, Modal, message } from "antd";
import Carousel from "../components/carousel/carousel";

const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { product } = useSelector((state: RootState) => state.products);
  const { category } = useSelector((state: RootState) => state.categories);
  // lấy products
  const fetchProducts = async () => {
    try {
      await dispatch(fetchProductsAll()).unwrap();
    } catch (error) { }
  };
  //lấy categories
  const fetchCategories = async () => {
    try {
      await dispatch(fetchCategoriesAll()).unwrap();
    } catch (error) { }
  };
  console.log(product);
  console.log(category);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  // const navigate = useNavigate();
  const { _id }: any = useParams();
  // const [quantity, setQuantity] = useState(1);
  // const { handleSubmit, register, setValue } = useForm();

  const [products, setproducts] = useState<IProducts>({} as IProducts);
  const fetchProductById = async (_id: string) => {
    const { product } = await dispatch(fetchProductsOne(_id)).unwrap();
    //   console.log(product);

    setproducts(product);
    // console.log(products);
  };
  useEffect(() => {
    fetchProductById(_id);
  }, []);

  // nhấp ảnh nhỏ ra ảnh lớn bên trên, dùng onclick của trong img vừa đổ
  // const disImages = (u) => {
  //   const mainImg = document.getElementById("Img");
  //   mainImg.src = u;
  // };
  console.log(products);

  // // Tăng số lượng sản phẩm
  // useLayoutEffect(() => {
  //   if(quantity<1){
  //     setQuantity(1)
  //   }else if(quantity >= 7){
  //     setQuantity(1)
  //   }
  // })

  // const handlePlus = () => {
  //   setQuantity(quantity + 1)
  // }

  // const handleMinus = () => {
  //   setQuantity(quantity - 1)
  // }

  // useEffect(() => {
  //   setValue("productId", products._id); // Đặt giá trị mặc định cho trường 'id'
  // }, [products._id, setValue]);

  // const onSubmit = async (body: any) => {
  //   try {
  //     await dispatch(fetchAddToCard(body)).unwrap();
  //     message.success({
  //       content: "Bạn đã thêm vào giỏ hàng thành công",
  //       key: "add",
  //     });
  //     console.log("cart", body);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Carousel />

      {/* Featured Start */}
      <div className="container-fluid pt-5">
        <div className="row px-xl-5 pb-3">
          <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
            <div
              className="d-flex align-items-center bg-light mb-4"
              style={{ padding: 30 }}
            >
              <h1 className="fa fa-check text-primary m-0 mr-3" />
              <h5 className="font-weight-semi-bold m-0">Sản phẩm chất lượng</h5>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
            <div
              className="d-flex align-items-center bg-light mb-4"
              style={{ padding: 30 }}
            >
              <h1 className="fa fa-shipping-fast text-primary m-0 mr-2" />
              <h5 className="font-weight-semi-bold m-0">Giao hàng miễn phí</h5>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
            <div
              className="d-flex align-items-center bg-light mb-4"
              style={{ padding: 30 }}
            >
              <h1 className="fas fa-exchange-alt text-primary m-0 mr-3" />
              <h5 className="font-weight-semi-bold m-0">
                Đổi trả hàng trong 14 ngày
              </h5>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
            <div
              className="d-flex align-items-center bg-light mb-4"
              style={{ padding: 30 }}
            >
              <h1 className="fa fa-phone-volume text-primary m-0 mr-3" />
              <h5 className="font-weight-semi-bold m-0">
                Hỗ trợ khách hàng 24/7
              </h5>
            </div>
          </div>
        </div>
      </div>
      {/* Featured End */}

      {/* Categories Start */}
      <div className="container-fluid pt-5">
        <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4">
          <span className="bg-secondary pr-3">Danh mục sản phẩm</span>
        </h2>
        <div className="row px-xl-5 pb-3">
          {category.map((item) => (
            <div className="col-lg-3 col-md-4 col-sm-6 pb-1">
              <a className="text-decoration-none" href="">
                <div className="cat-item d-flex align-items-center mb-4">
                  <div
                    className="overflow-hidden"
                    style={{ width: 100, height: 100 }}
                  >
                    <img
                      className="img-fluid"
                      src={item.img}
                      style={{ height: 106 }}
                      alt=""
                    />
                  </div>
                  <div className="flex-fill pl-3">
                    <h6>{item.name}</h6>
                    <small className="text-body">100 Sản phẩm</small>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
      {/* Categories End */}

      {/* Products Start */}
      <div className="container-fluid pt-5 pb-3">
        <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4">
          <span className="bg-secondary pr-3">Sản phẩm nổi bật</span>
        </h2>
        <div className="row px-xl-5">
          {product.slice(1, 5).map((item) => (
            <div className="col-lg-3 col-md-4 col-sm-6 pb-1">
              <div className="product-item bg-light mb-4">
                <div className="product-img position-relative overflow-hidden">
                  <img className="img-fluid w-100" src={item.img?.[0]} alt="" />
                  <div className="product-action">
                    <a className="btn btn-outline-dark btn-square" href="">
                      <i className="fa fa-shopping-cart" />
                    </a>
                    <a className="btn btn-outline-dark btn-square" href="">
                      <i className="far fa-heart" />
                    </a>
                    <Link
                      className="btn btn-outline-dark btn-square"
                      to={`/detail/${item._id}`}
                    >
                      <i className="fa fa-search" />
                    </Link>
                    {/* <Button
                      onClick={showModal}
                      className="btn btn-outline-dark btn-square"
                    >
                      <i className="fa fa-search" />
                    </Button>
                    <Modal
                      title="Basic Modal"
                      open={isModalOpen}
                      onOk={handleOk}
                      onCancel={handleCancel}
                    >
                      <p>Some contents...</p>
                      <p>Some contents...</p>
                      <p>Some contents...</p>
                    </Modal> */}
                  </div>
                </div>
                <div className="text-center py-4">
                  <Link
                    className="h6 text-decoration-none text-truncate"
                    to={`/detail/${item._id}`}
                  >
                    {item.name}
                  </Link>
                  <div className="d-flex align-items-center justify-content-center mt-2">
                    <h5>{item.price}.000 VNĐ</h5>
                    <h6 className="text-muted ml-2">
                      {/* <del>$123.00</del> */}
                    </h6>
                  </div>
                  <div className="d-flex align-items-center justify-content-center mb-1">
                    <small className="fa fa-star text-primary mr-1" />
                    <small className="fa fa-star text-primary mr-1" />
                    <small className="fa fa-star text-primary mr-1" />
                    <small className="fa fa-star text-primary mr-1" />
                    <small className="fa fa-star text-primary mr-1" />
                    <small>(99)</small>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Products End */}

      {/* Offer Start */}
      <div className="container-fluid pt-5 pb-3">
        <div className="row px-xl-5">
          <div className="col-md-6">
            <div className="product-offer mb-30" style={{ height: 300 }}>
              <img
                className="img-fluid"
                src="../../src/assets/img/offer-1.jpg"
                alt=""
              />
              <div className="offer-text">
                <h6 className="text-white text-uppercase">Tiết kiệm 20%</h6>
                <h3 className="text-white mb-3">Ưu đãi đặc biệt</h3>
                <Link to="/shop" className="btn btn-primary">
                  Mua ngay
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="product-offer mb-30" style={{ height: 300 }}>
              <img
                className="img-fluid"
                src="../../src/assets/img/offer-2.jpg"
                alt=""
              />
              <div className="offer-text">
                <h6 className="text-white text-uppercase">Tiết kiệm 20%</h6>
                <h3 className="text-white mb-3">Ưu đãi đặc biệt</h3>
                <Link to="/shop" className="btn btn-primary">
                  Mua ngay
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Offer End */}

      {/* Vendor Start */}
      <div className="container-fluid py-5">
        <div className="row px-xl-5">
          <div className="col" style={{ marginLeft: "75px" }}>
            <div className="d-flex flex-row" >
              <div className="bg-light p-4">
                <img src="../../src/assets/img/vendor-1.jpg" alt="" />
              </div>
              <div className="bg-light p-4">
                <img src="../../src/assets/img/vendor-2.jpg" alt="" />
              </div>
              <div className="bg-light p-4">
                <img src="../../src/assets/img/vendor-3.jpg" alt="" />
              </div>
              <div className="bg-light p-4">
                <img src="../../src/assets/img/vendor-4.jpg" alt="" />
              </div>
              <div className="bg-light p-4">
                <img src="../../src/assets/img/vendor-5.jpg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Vendor End */}
    </>
  );
};

export default HomePage;
