import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Modal, message } from 'antd';
import { fetchBillById, fetchCancelBill } from '../redux/bill.reducer';
import { getOneBill } from '../api/bill';
import { RootState } from '../store';

const HistoryPage = () => {
  const dispatch = useDispatch();
  const [bills, setBills] = useState();
  // const bill  = useSelector((state: RootState) => state.bills);
  console.log(bills?.[0].status);
  const accessToken = localStorage.getItem('accessToken');
  const { id } = useParams();
  const [cancelModalVisible, setCancelModalVisible] = useState(false);
  const [selectedBillId, setSelectedBillId] = useState<string | null>(null);

  // Hàm xác nhận hủy đơn hàng
  const confirmCancel = (billId: string) => {
    setSelectedBillId(billId);
    setCancelModalVisible(true);
  };

  // Hàm đóng modal
  const handleCancel = () => {
    setCancelModalVisible(false);
  };

  // Hàm xác nhận hủy đơn hàng và đóng modal
  const handleConfirmCancel = async () => {
    try {
      if (accessToken && selectedBillId) {
        // Gọi API để hủy đơn hàng và cập nhật trạng thái trong MongoDB
        await dispatch(fetchCancelBill({ id: selectedBillId, newStatus:'Hủy đơn hàng' }));

        // Hiển thị thông báo thành công và đóng modal
        message.success('Bạn đã hủy đơn hàng thành công');
        setCancelModalVisible(false);

        // Fetch lại thông tin đơn hàng sau khi hủy để cập nhật UI
        dispatch(fetchBillById(selectedBillId));
      }
    } catch (error) {
      if (!error) {
        setTimeout(() => message.loading('Đang xử lí...'), 2000);
      } else {
        message.error(`Lỗi: ${error}`);
      }
    }
  };

  // Hàm fetch thông tin đơn hàng của người dùng
  const fetchBillUser = async (_id: any) => {
    try {
      const { data } = await getOneBill(_id);
      setBills(data.bills);
    } catch (error) {}
  };

  // Effect Hook để fetch thông tin đơn hàng khi component được render
  useEffect(() => {
    if (id) {
      fetchBillUser(id);
    }
  }, [id]);

  // Effect Hook để fetch thông tin đơn hàng và gọi dispatch khi `id` thay đổi
  useEffect(() => {
    if (id) {
      dispatch(fetchBillById(id));
    }
  }, [dispatch, id]);

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
              <span className="breadcrumb-item active">Lịch sử mua hàng</span>
            </nav>
          </div>
        </div>
      </div>
      {/* Breadcrumb End */}
      {/* Cart Start */}
      <div className="container-fluid">
        <div className="">
          <div className="col table-responsive mb-5">
            <table className="table table-light table-borderless table-hover text-center mb-0">
              <thead className="thead-dark">
                <tr>
                  <th>Mã đơn hàng</th>
                  <th>Ảnh sản phẩm</th>
                  <th>Sản phẩm x số lượng</th>
                  <th>Tổng tiền</th>
                  <th>Phương thức thanh toán</th>
                  <th>Trạng thái</th>
                  <th>Hủy</th>
                </tr>
              </thead>
              <tbody className="align-middle">
                {bills?.map((item: any) => (
                  <tr key={item._id}>
                    <td className="align-middle">{item?._id}</td>
                    {item?.products?.map((index: any) => (
                      <td className="align-middle">
                        <img
                          src={index?.productId?.img[0]}
                          alt=""
                          style={{ width: 50, marginRight: 12 }}
                        />
                      </td>
                    ))}

                    {item?.products?.map((index: any) => (
                      <td className="align-middle">
                        {index?.productId?.name} x {index?.quantity} <br />
                      </td>
                    ))}
                    <td className="align-middle">{item?.totalOrder}</td>
                    <td className="align-middle">{item?.paymentMethod}</td>
                    <td className="align-middle">{item?.status}</td>
                    <td className="align-middle">
                      <button
                        onClick={() => confirmCancel(item?._id)}
                        className="btn btn-sm btn-danger"
                        style={{ marginLeft: 12 }}
                      >
                        <i className="fa fa-times" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* Cart End */}

      {/* Modal Xác nhận Hủy Đơn Hàng */}
      <Modal
        title="Xác nhận hủy đơn hàng"
        visible={cancelModalVisible}
        onOk={handleConfirmCancel}
        onCancel={handleCancel}
      >
        <p>Bạn có chắc chắn muốn hủy đơn hàng này không?</p>
      </Modal>
    </>
  );
};

export default HistoryPage;
