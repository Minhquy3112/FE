import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { IProducts } from "../models/products";
import { Button, Image, Modal, message } from "antd";
import { getOne } from "../api/products";
import Image3D from "../components/image 3D/Image3d";
import { addProductToCart } from "../redux/cart.reducer";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { useForm } from "react-hook-form";
const DetailPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { handleSubmit, register, setValue } = useForm();
  const { id } = useParams();
  const accessToken = localStorage.getItem("accessToken");
  const [product, setProduct] = useState<IProducts>({} as IProducts);

  const fetchProductById = async (_id: any) => {
    try {
      const { data } = await getOne(_id);
      console.log(data);
      setProduct(data.product);
    } catch (error) {}
  };
  useEffect(() => {
    if (id) {
      fetchProductById(id);
    }
  }, []);

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

  // nhấp ảnh nhỏ ra ảnh lớn bên trên, dùng onclick của trong img vừa đổ
  // const disImages = (u) => {
  //   const mainImg = document.getElementById("Img");
  //   mainImg.src = u;
  // };

  // useEffect(() => {
  //   setValue("productId", products._id); // Đặt giá trị mặc định cho trường 'id'
  // }, [products._id, setValue]);

  // const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    setValue("productId", product._id); // Đặt giá trị mặc định cho trường 'id'
  }, [product._id, setValue]);

  const onSubmit = async (body: any) => {
    if (!accessToken) {
      message.success("Mời bạn đăng nhập!");
      navigate("/signin");
    } else {
      await dispatch(addProductToCart(body));
      message.success("Sản phẩm đã được thêm vào giỏ hàng!");
    }
  };

  return (
    <>
      {/* Breadcrumb Start */}
      <div className="container-fluid">
        <div className="row px-xl-5">
          <div className="col-12">
            <nav className="breadcrumb bg-light mb-30">
              <a className="breadcrumb-item text-dark" href="#">
                Trang chủ
              </a>
              <a className="breadcrumb-item text-dark" href="#">
                Cửa hàng
              </a>
              <span className="breadcrumb-item active">Chi tết sản phẩm</span>
            </nav>
          </div>
        </div>
      </div>
      {/* Breadcrumb End */}

      {/* Shop Detail Start */}
      <div className="container-fluid pb-5">
        <div className="row px-xl-5">
          <div className="col-lg-5 mb-30">
            <div
              id="product-carousel"
              className="carousel slide"
              data-ride="carousel"
            >
              <div className="carousel-inner bg-light">
                <div className="carousel-item active">
                  <Image className="w-100 h-100" src={product.img?.[0]} />
                </div>
                <div className="carousel-item ">
                  <Image className="w-100 h-100" src={product.img?.[1]} />
                </div>
                <div className="carousel-item">
                  <Image className="w-100 h-100" src={product.img?.[2]} />
                </div>
                <div className="carousel-item">
                  <Image className="w-100 h-100" src={product.img?.[3]} />
                </div>
              </div>
              <Button
                style={{
                  marginLeft: "190px",
                  marginTop: "24px",
                  border: "none",
                  backgroundColor: "#0e7ccf",
                  color: "#fff",
                }}
                type="primary"
                onClick={showModal}
              >
                Xem ảnh 3D
              </Button>
              <Modal
                title="Ảnh 3D"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
              >
                <p style={{height: "300px"}}>
                  <Image3D />
                </p>
              </Modal>
              <a
                className="carousel-control-prev"
                href="#product-carousel"
                data-slide="prev"
              >
                <i className="fa fa-2x fa-angle-left text-dark" />
              </a>
              <a
                className="carousel-control-next"
                href="#product-carousel"
                data-slide="next"
              >
                <i className="fa fa-2x fa-angle-right text-dark" />
              </a>
            </div>
          </div>
          {/* <input type="hidden" {...register("productId")} /> */}
          <div className="col-lg-7 h-auto mb-30">
            <div className="h-100 bg-light p-30">
              <h3>{product.name}</h3>
              <div className="d-flex mb-3">
                <div className="text-primary mr-2">
                  <small className="fas fa-star" />
                  <small className="fas fa-star" />
                  <small className="fas fa-star" />
                  <small className="fas fa-star-half-alt" />
                  <small className="far fa-star" />
                </div>
                <small className="pt-1">(99 Reviews)</small>
              </div>
              <h3 className="font-weight-semi-bold mb-4">
                {product.price}.000 VNĐ
              </h3>
              <p className="mb-4">
                Volup erat ipsum diam elitr rebum et dolor. Est nonumy elitr
                erat diam stet sit clita ea. Sanc ipsum et, labore clita lorem
                magna duo dolor no sea Nonumy
              </p>
              <div className="d-flex mb-3">
                <strong className="text-dark mr-3">Xuất xứ:</strong>
                <div className="">
                  <label className="" htmlFor="size-1">
                    {product.materialId?.name}
                  </label>
                </div>
              </div>
              <div className="d-flex mb-4">
                <strong className="text-dark mr-3">Chất liệu:</strong>
                <div className="">
                  <label className="" htmlFor="color-1">
                    {product.originId?.name}
                  </label>
                </div>
              </div>
              <div className="d-flex align-items-center mb-4 pt-2">
                <div
                  className="input-group quantity mr-3"
                  style={{ width: 130 }}
                >
                  <div className="input-group-btn">
                    <button className="btn btn-primary btn-minus">
                      <i className="fa fa-minus" />
                    </button>
                  </div>
                  <input
                    type="text"
                    className="form-control bg-secondary border-0 text-center"
                    defaultValue={1}
                  />
                  <div className="input-group-btn">
                    <button className="btn btn-primary btn-plus">
                      <i className="fa fa-plus" />
                    </button>
                  </div>
                </div>
                <button
                  onClick={handleSubmit(onSubmit)}
                  className="btn btn-primary px-3"
                >
                  <i className="fa fa-shopping-cart mr-1" /> Thêm vào giỏ hàng
                </button>
              </div>
              <div className="d-flex pt-2">
                <strong className="text-dark mr-2">Chia sẻ:</strong>
                <div className="d-inline-flex">
                  <a className="text-dark px-2" href="">
                    <i className="fab fa-facebook-f" />
                  </a>
                  <a className="text-dark px-2" href="">
                    <i className="fab fa-twitter" />
                  </a>
                  <a className="text-dark px-2" href="">
                    <i className="fab fa-linkedin-in" />
                  </a>
                  <a className="text-dark px-2" href="">
                    <i className="fab fa-pinterest" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row px-xl-5">
          <div className="col">
            <div className="bg-light p-30">
              <div className="nav nav-tabs mb-4">
                <a
                  className="nav-item nav-link text-dark"
                  data-toggle="tab"
                  href="#tab-pane-2"
                >
                  Thông tin
                </a>
                <a
                  className="nav-item nav-link text-dark"
                  data-toggle="tab"
                  href="#tab-pane-3"
                >
                  Đánh giá (0)
                </a>
              </div>
              <div className="tab-content">
                <div className="tab-pane fade show active" id="tab-pane-2">
                  <h4 className="mb-3">Thông tin chi tiết</h4>
                  <p>{product.description}</p>
                  <div className="row">
                    <div className="col-md-6">
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item px-0">Chiều cao</li>
                        <li className="list-group-item px-0">Cân nặng</li>
                        <li className="list-group-item px-0">Xuất xứ</li>
                        <li className="list-group-item px-0">Chất liệu</li>
                      </ul>
                    </div>
                    <div className="col-md-6">
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item px-0">
                          {product.height} cm
                        </li>
                        <li className="list-group-item px-0">
                          {product.weight} gram
                        </li>
                        <li className="list-group-item px-0">
                          {product.materialId?.name}
                        </li>
                        <li className="list-group-item px-0">
                          {product.originId?.name}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="tab-pane fade" id="tab-pane-3">
                  <div className="row">
                    <div className="col-md-6">
                      <h4 className="mb-4">1 review for "Product Name"</h4>
                      <div className="media mb-4">
                        <img
                          src="../../src/assets/img/user.jpg"
                          alt="Image"
                          className="img-fluid mr-3 mt-1"
                          style={{ width: 45 }}
                        />
                        <div className="media-body">
                          <h6>
                            John Doe
                            <small>
                              {" "}
                              - <i>01 Jan 2045</i>
                            </small>
                          </h6>
                          <div className="text-primary mb-2">
                            <i className="fas fa-star" />
                            <i className="fas fa-star" />
                            <i className="fas fa-star" />
                            <i className="fas fa-star-half-alt" />
                            <i className="far fa-star" />
                          </div>
                          <p>
                            Diam amet duo labore stet elitr ea clita ipsum,
                            tempor labore accusam ipsum et no at. Kasd diam
                            tempor rebum magna dolores sed sed eirmod ipsum.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <h4 className="mb-4">Để lại đánh giá</h4>
                      <small>
                        Email của bạn sẽ không được hiển thị công khai. Các
                        trường bắt buộc được đánh dấu *
                      </small>
                      <div className="d-flex my-3">
                        <p className="mb-0 mr-2">Đánh giá của bạn * :</p>
                        <div className="text-primary">
                          <i className="far fa-star" />
                          <i className="far fa-star" />
                          <i className="far fa-star" />
                          <i className="far fa-star" />
                          <i className="far fa-star" />
                        </div>
                      </div>
                      <form>
                        <div className="form-group">
                          <label htmlFor="message">Đánh giá của bạn *</label>
                          <textarea
                            id="message"
                            cols={30}
                            rows={5}
                            className="form-control"
                            defaultValue={""}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="name">Tên của bạn *</label>
                          <input
                            type="text"
                            className="form-control"
                            id="name"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="email">Email của bạn *</label>
                          <input
                            type="email"
                            className="form-control"
                            id="email"
                          />
                        </div>
                        <div className="form-group mb-0">
                          <input
                            type="submit"
                            defaultValue="Leave Your Review"
                            className="btn btn-primary px-3"
                          />
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Shop Detail End */}

      {/* Products Start */}
      <div className="container-fluid py-5">
        <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4">
          <span className="bg-secondary pr-3">Sản phẩm cùng danh mục</span>
        </h2>
        <div className="row px-xl-5">
          <div className="col">
            <div className="d-flex flex-row mb-3">
              <div className=" me-3 product-item bg-light">
                <div className="product-img position-relative overflow-hidden">
                  <img
                    className="img-fluid w-100"
                    src="../../src/assets/img/product-1.jpg"
                    alt=""
                  />
                  <div className="product-action">
                    <a className="btn btn-outline-dark btn-square" href="">
                      <i className="fa fa-shopping-cart" />
                    </a>
                    <a className="btn btn-outline-dark btn-square" href="">
                      <i className="far fa-heart" />
                    </a>
                    <a className="btn btn-outline-dark btn-square" href="">
                      <i className="fa fa-sync-alt" />
                    </a>
                    <a className="btn btn-outline-dark btn-square" href="">
                      <i className="fa fa-search" />
                    </a>
                  </div>
                </div>
                <div className="text-center py-4">
                  <a className="h6 text-decoration-none text-truncate" href="">
                    Product Name Goes Here
                  </a>
                  <div className="d-flex align-items-center justify-content-center mt-2">
                    <h5>$123.00</h5>
                    <h6 className="text-muted ml-2">
                      <del>$123.00</del>
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
              <div className=" me-3 product-item bg-light">
                <div className="product-img position-relative overflow-hidden">
                  <img
                    className="img-fluid w-100"
                    src="../../src/assets/img/product-2.jpg"
                    alt=""
                  />
                  <div className="product-action">
                    <a className="btn btn-outline-dark btn-square" href="">
                      <i className="fa fa-shopping-cart" />
                    </a>
                    <a className="btn btn-outline-dark btn-square" href="">
                      <i className="far fa-heart" />
                    </a>
                    <a className="btn btn-outline-dark btn-square" href="">
                      <i className="fa fa-sync-alt" />
                    </a>
                    <a className="btn btn-outline-dark btn-square" href="">
                      <i className="fa fa-search" />
                    </a>
                  </div>
                </div>
                <div className="text-center py-4">
                  <a className="h6 text-decoration-none text-truncate" href="">
                    Product Name Goes Here
                  </a>
                  <div className="d-flex align-items-center justify-content-center mt-2">
                    <h5>$123.00</h5>
                    <h6 className="text-muted ml-2">
                      <del>$123.00</del>
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
              <div className=" me-3 product-item bg-light">
                <div className="product-img position-relative overflow-hidden">
                  <img
                    className="img-fluid w-100"
                    src="../../src/assets/img/product-3.jpg"
                    alt=""
                  />
                  <div className="product-action">
                    <a className="btn btn-outline-dark btn-square" href="">
                      <i className="fa fa-shopping-cart" />
                    </a>
                    <a className="btn btn-outline-dark btn-square" href="">
                      <i className="far fa-heart" />
                    </a>
                    <a className="btn btn-outline-dark btn-square" href="">
                      <i className="fa fa-sync-alt" />
                    </a>
                    <a className="btn btn-outline-dark btn-square" href="">
                      <i className="fa fa-search" />
                    </a>
                  </div>
                </div>
                <div className="text-center py-4">
                  <a className="h6 text-decoration-none text-truncate" href="">
                    Product Name Goes Here
                  </a>
                  <div className="d-flex align-items-center justify-content-center mt-2">
                    <h5>$123.00</h5>
                    <h6 className="text-muted ml-2">
                      <del>$123.00</del>
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
              <div className=" me-3 product-item bg-light">
                <div className="product-img position-relative overflow-hidden">
                  <img
                    className="img-fluid w-100"
                    src="../../src/assets/img/product-4.jpg"
                    alt=""
                  />
                  <div className="product-action">
                    <a className="btn btn-outline-dark btn-square" href="">
                      <i className="fa fa-shopping-cart" />
                    </a>
                    <a className="btn btn-outline-dark btn-square" href="">
                      <i className="far fa-heart" />
                    </a>
                    <a className="btn btn-outline-dark btn-square" href="">
                      <i className="fa fa-sync-alt" />
                    </a>
                    <a className="btn btn-outline-dark btn-square" href="">
                      <i className="fa fa-search" />
                    </a>
                  </div>
                </div>
                <div className="text-center py-4">
                  <a className="h6 text-decoration-none text-truncate" href="">
                    Product Name Goes Here
                  </a>
                  <div className="d-flex align-items-center justify-content-center mt-2">
                    <h5>$123.00</h5>
                    <h6 className="text-muted ml-2">
                      <del>$123.00</del>
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
          </div>
        </div>
      </div>
      {/* Products End */}
    </>
  );
};

export default DetailPage;
