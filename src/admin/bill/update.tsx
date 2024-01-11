import { message } from "antd";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  fetchBillById,
  fetchBillUpdate,
  fetchUserBill,
} from "../../redux/bill.reducer";
import { IBill } from "../../models/bill";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";

const UpdateBill = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IBill>({
    defaultValues: async () => {
      if (id) {
        return await fetchUpdateStatus(id);
      }
    },
  });
  const onSubmit = async (body: any) => {
    try {
      await dispatch(fetchBillUpdate(body)).unwrap();
      message.success({
        content: "Cập nhật trạng thái đơn hàng thành công",
        key: "update",
      });
      navigate("/admin/listBill");
    } catch (error) {
      /* empty */
    }
  };

  const fetchUpdateStatus = async (id: string) => {
    const data = await dispatch(fetchBillById(id)).unwrap();
    return data.bill;
  };

  useEffect(() => {
    if (id) {
      fetchUpdateStatus(id);
    }
  }, []);

  return (
    <>
      <main role="main" className="main-content">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-12">
              <div className="row">
                <div className="col-md-12">
                  <div className="card shadow mb-4">
                    <div className="card-header">
                      <strong className="card-title">Create Products</strong>
                    </div>
                    <div className="card-body">
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-row">
                          <div className="form-group col-md-6">
                            <label htmlFor="inputEmail4">Tên khác hàng</label>
                            <input
                              type="text"
                              className="form-control"
                              id="inputEmail5"
                              {...register("userId.name")}
                              readOnly
                            />
                          </div>
                          <div className="form-group col-md-6">
                            <label htmlFor="inputPassword4">
                              Số điện thoại
                            </label>
                            <input
                              type="tel"
                              className="form-control"
                              id="inputPassword5"
                              min="0"
                              {...register("phone")}
                              readOnly
                            />
                          </div>
                        </div>
                        <div className="" style={{ marginBottom: "12px" }}>
                          <div className="">
                            <label htmlFor="inputAddress2">
                              Địa chỉ nhận hàng
                            </label>
                            <textarea
                              className="form-control"
                              id="inputAddress6"
                              placeholder="Description"
                              {...register("shippingAddress")}
                              readOnly
                            />
                          </div>
                        </div>
                        <div className="form-row">
                          <div className="form-group col-md-6">
                            <label htmlFor="inputEmail4">Tổng tiền</label>
                            <input
                              type="number"
                              className="form-control"
                              id="inputEmail5"
                              min="0"
                              {...register("totalOrder")}
                              readOnly
                            />
                          </div>
                          <div className="form-group col-md-6">
                            <label htmlFor="inputPassword4">Trạng thái</label>
                            <select
                              id="inputState5"
                              className="form-control"
                              {...register("status")}
                              defaultValue={"status"}
                            >
                              <option value="Chờ xác nhận">Chờ xác nhận</option>
                              <option value="Hủy đơn hàng">Hủy đơn hàng</option>
                              <option value="Đã xác nhận">Đã xác nhận</option>
                              <option value="Đã giao hàng">Đã giao hàng</option>
                              <option value="Đang giao hàng">
                                Đang giao hàng
                              </option>
                            </select>
                          </div>
                        </div>
                        <button
                          type="submit"
                          className="btn btn-success bg-green-600 color-while"
                          style={{ marginRight: 5, marginLeft: 18 }}
                        >
                          Update
                        </button>
                        <button
                          type="reset"
                          className="btn btn-warning bg-yellow-600 "
                        >
                          Reset
                        </button>
                      </form>
                    </div>{" "}
                    {/* /. card-body */}
                  </div>{" "}
                  {/* /. card */}
                </div>{" "}
                {/* /. col */}
              </div>{" "}
              {/* /. end-section */}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default UpdateBill;
