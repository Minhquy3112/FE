import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { useEffect, useState } from "react";
import { fetchBillAll, fetchUserBill } from "../redux/bill.reducer";
import { fetchUserOne, fetchUsersAll } from "../redux/user.reducer";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getOne } from "../api/user";
import { getOneBill } from "../api/bill";

const ProfilePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [user, setUser] = useState();
  const id = user?._id
  console.log(id);
  
  
  const fetchProductById = async (_id: any) => {
    try {
      const { data } = await getOneBill(_id);
      console.log(data);
    } catch (error) {}
  };
  useEffect(() => {
    if (id) {
      fetchProductById(id);
    }
  }, []);

  const fetchUsers = async () => {
    try {
      await getOne().then(({ data }) => setUser(data.user));
    } catch (error) {}
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      {/* Cart view section */}
      <section id="checkout">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="checkout-area">
                <form action="">
                  <div className="row">
                    <div className="col-md-8">
                      <div className="checkout-left">
                        <div className="panel-group" id="accordion">
                          {/* Coupon section */}
                          <div className="panel panel-default aa-checkout-coupon">
                            <div className="panel-heading">
                              <h4 className="panel-title">
                                <a
                                  data-toggle="collapse"
                                  data-parent="#accordion"
                                  href="#collapseOne"
                                >
                                  <Link  to={`/bills/user/${id}`}>Lịch sử mua hàng</Link>
                                </a>
                              </h4>
                            </div>
                            <div
                              id="collapseOne"
                              className="panel-collapse collapse in"
                            >
                              <div className="container-fluid">
                                <div className="row px-xl-5">
                                  <div className="col-lg-8 table-responsive mb-5">
                                    <table className="table table-light table-borderless table-hover text-center mb-0">
                                      <thead className="thead-dark">
                                        <tr>
                                          <th>
                                            <input
                                              type="checkbox"
                                              name=""
                                              id=""
                                            />
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
                                        {/* {products?.products?.map((item: any) => ( */}
                                        <tr>
                                          <td>
                                            <input
                                              type="checkbox"
                                              name=""
                                              id=""
                                            />
                                          </td>
                                          {/* <td className="align-middle">{item?.productId?.name}</td> */}
                                          <td>
                                            <img
                                              // src={item?.productId?.img?.[0]}
                                              alt=""
                                              style={{ width: 50 }}
                                            />
                                          </td>
                                          {/* <td className="align-middle">{item?.productId?.price}</td> */}
                                          <td className="align-middle">
                                            <div
                                              className="input-group quantity mx-auto"
                                              style={{ width: 100 }}
                                            >
                                              <div className="input-group-btn">
                                                <button
                                                  // onClick={() =>
                                                  //   onHandleDecrease(
                                                  //     item?.productId?._id,
                                                  //     item?.quantity
                                                  //   )
                                                  // }
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
                                                // value={item?.quantity}
                                                // onChange={(event) =>
                                                //   onHandleChangeQuantity(
                                                //     item?.productId?._id,
                                                //     Number(event.target.value)
                                                //   )
                                                // }
                                              />
                                              <div className="input-group-btn">
                                                <button
                                                  // onClick={() =>
                                                  //   onHandleIncrease(
                                                  //     item?.productId?._id,
                                                  //     item?.quantity
                                                  //   )
                                                  // }
                                                  className="btn btn-sm btn-primary btn-plus"
                                                >
                                                  <i className="fa fa-plus" />
                                                </button>
                                              </div>
                                            </div>
                                          </td>
                                          <td className="align-middle">
                                            {/* {item?.productId?.price * item?.quantity} */}
                                          </td>
                                          <td className="align-middle">
                                            <button
                                              // onClick={() =>
                                              //   onHandleDeteleProductCart(item?.productId?._id)
                                              // }
                                              className="btn btn-sm btn-danger"
                                            >
                                              <i className="fa fa-times" />
                                            </button>
                                          </td>
                                        </tr>
                                        {/* ))} */}
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* Login section */}
                          {/* Billing Details */}
                          {/* Shipping Address */}
                          <div className="panel panel-default aa-checkout-billaddress">
                            <div className="panel-heading">
                              <h4 className="panel-title">
                                <a
                                  data-toggle="collapse"
                                  data-parent="#accordion"
                                  href="#collapseFour"
                                >
                                  Cập nhật người dùng
                                </a>
                              </h4>
                            </div>
                            <div
                              id="collapseFour"
                              className="panel-collapse collapse"
                            >
                              <div className="panel-body">
                                <div className="row">
                                  <div className="col-md-6">
                                    <div className="aa-checkout-single-bill">
                                      <input
                                        type="text"
                                        placeholder="First Name*"
                                      />
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <div className="aa-checkout-single-bill">
                                      <input
                                        type="text"
                                        placeholder="Last Name*"
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-md-12">
                                    <div className="aa-checkout-single-bill">
                                      <input
                                        type="text"
                                        placeholder="Company name"
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-md-6">
                                    <div className="aa-checkout-single-bill">
                                      <input
                                        type="email"
                                        placeholder="Email Address*"
                                      />
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <div className="aa-checkout-single-bill">
                                      <input type="tel" placeholder="Phone*" />
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-md-12">
                                    <div className="aa-checkout-single-bill">
                                      <textarea
                                        cols={8}
                                        rows={3}
                                        defaultValue={"Address*"}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-md-12">
                                    <div className="aa-checkout-single-bill">
                                      <select>
                                        <option value={0}>
                                          Select Your Country
                                        </option>
                                        <option value={1}>Australia</option>
                                        <option value={2}>Afganistan</option>
                                        <option value={3}>Bangladesh</option>
                                        <option value={4}>Belgium</option>
                                        <option value={5}>Brazil</option>
                                        <option value={6}>Canada</option>
                                        <option value={7}>China</option>
                                        <option value={8}>Denmark</option>
                                        <option value={9}>Egypt</option>
                                        <option value={10}>India</option>
                                        <option value={11}>Iran</option>
                                        <option value={12}>Israel</option>
                                        <option value={13}>Mexico</option>
                                        <option value={14}>UAE</option>
                                        <option value={15}>UK</option>
                                        <option value={16}>USA</option>
                                      </select>
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-md-6">
                                    <div className="aa-checkout-single-bill">
                                      <input
                                        type="text"
                                        placeholder="Appartment, Suite etc."
                                      />
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <div className="aa-checkout-single-bill">
                                      <input
                                        type="text"
                                        placeholder="City / Town*"
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-md-6">
                                    <div className="aa-checkout-single-bill">
                                      <input
                                        type="text"
                                        placeholder="District*"
                                      />
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <div className="aa-checkout-single-bill">
                                      <input
                                        type="text"
                                        placeholder="Postcode / ZIP*"
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-md-12">
                                    <div className="aa-checkout-single-bill">
                                      <textarea
                                        cols={8}
                                        rows={3}
                                        defaultValue={"Special Notes"}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* / Cart view section */}
    </>
  );
};

export default ProfilePage;
