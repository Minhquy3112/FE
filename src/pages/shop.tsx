import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../store";
import { fetchProductsAll, fetchProductsOne } from "../redux/products.reducer";
import { useEffect, useState } from "react";
import { fetchCategoriesAll } from "../redux/categories.reducer";
import { message } from "antd";
import { useForm } from "react-hook-form";
import { IProducts } from "../models/products";
import { fetchMaterialAll } from "../redux/material.reducer";

const ShopPage = () => {
  const { _id }: any = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { product } = useSelector((state: RootState) => state.products);
  const { category } = useSelector((state: RootState) => state.categories);
  const { material } = useSelector((state: RootState) => state.material);
  const { handleSubmit, register, setValue } = useForm();

  const [products, setproducts] = useState<IProducts>({} as IProducts);
  const fetchProductById = async (_id: string) => {
    const { product } = await dispatch(fetchProductsOne(_id)).unwrap();
    //   console.log(product);

    setproducts(product);
    // console.log(products);
  };

  const fetchProducts = async () => {
    try {
      await dispatch(fetchProductsAll()).unwrap();
    } catch (error) {}
  };

  //lấy categories
  const fetchCategories = async () => {
    try {
      await dispatch(fetchCategoriesAll()).unwrap();
    } catch (error) {}
  };

  //lấy material
  const fetchMaterial = async () => {
    try {
      await dispatch(fetchMaterialAll()).unwrap();
    } catch (error) {}
  };
  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchMaterial()
    fetchProductById(_id);
  }, []);

  // ADD TO CART

  useEffect(() => {
    setValue("productId", products._id); // Đặt giá trị mặc định cho trường 'id'
  }, [products._id, setValue]);
  const accessToken = localStorage.getItem("accessToken");

  const onSubmit = async (body: any) => {
    try {
      if (accessToken) {
        await dispatch(fetchAddToCard(body)).unwrap();
        message.success({
          content: "Bạn đã thêm vào giỏ hàng thành công",
          key: "add",
        });
      } else {
        message.warning("Bạn phải đăng Nhập !!");
      }
    } catch (error) {
      console.log(error);
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
                Của hàng
              </a>
              <span className="breadcrumb-item active">Danh sách sản phẩm</span>
            </nav>
          </div>
        </div>
      </div>
      {/* Breadcrumb End */}

      {/* Shop Start */}
      <div className="container-fluid">
        <div className="row px-xl-5">
          {/* Shop Sidebar Start */}
          <div className="col-lg-3 col-md-4">
            {/* Price Start */}
            <h5 className="section-title position-relative text-uppercase mb-3">
              <span className="bg-secondary pr-3">Lọc theo danh mục</span>
            </h5>
            <div className="bg-light p-4 mb-30">
              <form>
                <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="price-all"
                  />
                  <label className="custom-control-label" htmlFor="price-all">
                    Tất cả danh mục
                  </label>
                  <span className="badge border font-weight-normal">1000</span>
                </div>
                {category.map((item: any) => (
                  <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="price-all"
                    />
                    <label className="custom-control-label" htmlFor="price-1">
                      {item.name}
                    </label>
                    <span className="badge border font-weight-normal">150</span>
                  </div>
                ))}
              </form>
            </div>
            {/* Price End */}

            {/* Size Start */}
            <h5 className="section-title position-relative text-uppercase mb-3">
              <span className="bg-secondary pr-3">Lọc theo xuất xứ</span>
            </h5>
            <div className="bg-light p-4 mb-30">
              <form>
                <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="size-all"
                  />
                  <label className="custom-control-label" htmlFor="size-all">
                    Tất cả xuất xứ
                  </label>
                  <span className="badge border font-weight-normal">1000</span>
                </div>
                {material.map((item: any) => (
                  <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="price-all"
                    />
                    <label className="custom-control-label" htmlFor="price-1">
                      {item.name}
                    </label>
                    <span className="badge border font-weight-normal">150</span>
                  </div>
                ))}
              </form>
            </div>
            {/* Size End */}
          </div>
          {/* Shop Sidebar End */}

          {/* Shop Product Start */}
          <div className="col-lg-9 col-md-8">
            <div className="row pb-3">
              {product.slice(0, 6).map((item, index) => (
                <div key={index} className="col-lg-4 col-md-6 col-sm-6 pb-1">
                  <div className="product-item bg-light mb-4">
                    <div className="product-img position-relative overflow-hidden">
                      <img
                        className="img-fluid w-100"
                        src={item.img?.[0]}
                        alt=""
                      />
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
              <div className="col-12">
                <nav>
                  <ul className="pagination justify-content-center">
                    <li className="page-item disabled">
                      <a className="page-link" href="#">
                        Previous
                      </a>
                    </li>
                    <li className="page-item active">
                      <a className="page-link" href="#">
                        1
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        2
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        3
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        Next
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
          {/* Shop Product End */}
        </div>
      </div>
      {/* Shop End */}
    </>
  );
};

export default ShopPage;
