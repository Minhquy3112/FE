import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { useEffect, useState } from "react";
import { message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { getCartUser } from "../api/cart";
import {
  deleteProductToCart,
  updateProductToCart,
} from "../redux/cart.reducer";
const CartPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [products, setProducts] = useState();
  const fetchData = () => {
    getCartUser().then(({ data }) => setProducts(data.cart));
  };
  useEffect(() => {
    fetchData();
  }, []);

  // Xóa Product trong giỏ hàng
  const onHandleDeteleProductCart = async (productId: string) => {
    await dispatch(deleteProductToCart(productId));
    message.success("Đã xóa thành công!");
    fetchData();
  };

  // Change khi người dùng nhập số lượng vào thẻ input
  const onHandleChangeQuantity = async (
    productId: string,
    quantity: number
  ) => {
    if (!isNaN(quantity)) {
      const productsUpdate = products?.products?.map((product) =>
        product.productId._id === productId ? { ...product, quantity } : product
      );

      setProducts({
        ...products,
        products: productsUpdate,
      });
      await dispatch(
        updateProductToCart({
          quantity,
          productId,
        })
      );
      fetchData();
    }
  };

  // - 1 khi người dùng click trừ
  const onHandleDecrease = async (productId: string, quantity: number) => {
    if (quantity > 1) {
      const productsUpdate = products?.products?.map((product) =>
        product.productId._id === productId
          ? { ...product, quantity: quantity - 1 }
          : product
      );

      setProducts({
        ...products,
        products: productsUpdate,
      });
      await dispatch(
        updateProductToCart({
          quantity: quantity - 1,
          productId,
        })
      );
      fetchData();
    }
  };

  // + 1 khi người dùng click cộng
  const onHandleIncrease = async (productId: string, quantity: number) => {
    const productsUpdate = products?.products?.map((product) =>
      product.productId._id === productId
        ? { ...product, quantity: quantity + 1 }
        : product
    );
    setProducts({
      ...products,
      products: productsUpdate,
    });
    await dispatch(
      updateProductToCart({
        quantity: quantity + 1,
        productId,
      })
    );
    fetchData();
  };

  // THANH TOÁN
  const checkOut = () => {
    const navigate = useNavigate();
    navigate("/checkout");
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
              <span className="breadcrumb-item active">Giỏ hàng</span>
            </nav>
          </div>
        </div>
      </div>
      {/* Breadcrumb End */}
      {/* Cart Start */}
      <div className="container-fluid">
        <div className="row px-xl-5">
          <div className="col-lg-8 table-responsive mb-5">
            <table className="table table-light table-borderless table-hover text-center mb-0">
              <thead className="thead-dark">
                <tr>
                  <th>
                    <input type="checkbox" name="" id="" />
                  </th>
                  <th>Tên sản phẩm</th>
                  <th>Ảnh</th>
                  <th>Giá tiền</th>
                  <th>Số lượng</th>
                  <th>Tổng tiền</th>
                  <th>Xóa</th>
                </tr>
              </thead>
              <tbody className="align-middle">
                {products?.products?.map((item: any) => (
                  <tr>
                    <td>
                      <input type="checkbox" name="" id="" />
                    </td>
                    <td className="align-middle">{item?.productId?.name}</td>
                    <td>
                      <img
                        src={item?.productId?.img?.[0]}
                        alt=""
                        style={{ width: 50 }}
                      />
                    </td>
                    <td className="align-middle">{item?.productId?.price}. 000 VNĐ</td>
                    <td className="align-middle">
                      <div
                        className="input-group quantity mx-auto"
                        style={{ width: 100 }}
                      >
                        <div className="input-group-btn">
                          <button
                            onClick={() =>
                              onHandleDecrease(
                                item?.productId?._id,
                                item?.quantity
                              )
                            }
                            className="btn btn-sm btn-primary btn-minus"
                          >
                            <i className="fa fa-minus" />
                          </button>
                        </div>
                        <input
                          type="number"
                          style={{ textAlign: "center" }}
                          className="form-control form-control-sm bg-secondary border-0 text-center"
                          min={1}
                          value={item?.quantity}
                          onChange={(event) =>
                            onHandleChangeQuantity(
                              item?.productId?._id,
                              Number(event.target.value)
                            )
                          }
                        />
                        <div className="input-group-btn">
                          <button
                            onClick={() =>
                              onHandleIncrease(
                                item?.productId?._id,
                                item?.quantity
                              )
                            }
                            className="btn btn-sm btn-primary btn-plus"
                          >
                            <i className="fa fa-plus" />
                          </button>
                        </div>
                      </div>
                    </td>
                    <td className="align-middle">
                      {item?.productId?.price * item?.quantity}
                    </td>
                    <td className="align-middle">
                      <button
                        onClick={() =>
                          onHandleDeteleProductCart(item?.productId?._id)
                        }
                        className="btn btn-sm btn-danger"
                      >
                        <i className="fa fa-times" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="col-lg-4">
            {/* <form className="mb-30" action="">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control border-0 p-4"
                  placeholder="Mã giảm giá"
                />
                <div className="input-group-append">
                  <button className="btn btn-primary">Áp dụng</button>
                </div>
              </div>
            </form> */}
            <h5 className="section-title position-relative text-uppercase mb-3">
              <span className="bg-secondary pr-3">Tóm tắt giỏ hàng</span>
            </h5>
            <div className="bg-light p-30 mb-5">
              <div className="border-bottom pb-2">
                <div className="d-flex justify-content-between mb-3">
                  <h6>Tổng tiền</h6>
                  <h6>{products?.totalPrice}.000 VNĐ</h6>
                </div>
                <div className="d-flex justify-content-between">
                  <h6 className="font-weight-medium">Vận chuyển</h6>
                  <h6 className="font-weight-medium">{products?.shippingFee}</h6>
                </div>
              </div>
              <div className="pt-2">
                <div className="d-flex justify-content-between mt-2">
                  <h5>Tổng thu</h5>
                  <h5>{products?.totalOrder}</h5>
                </div>
                <Link
                  to="/checkout"
                  className="btn btn-block btn-primary font-weight-bold my-3 py-3"
                >
                  Tiến hành thanh toán
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Cart End */}
    </>
  );
};

export default CartPage;
