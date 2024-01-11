import instance from ".";

const options = () => {
  return {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  };
};

// HIỂN THỊ TẤT CẢ BILL CHO ADMIN
export const getAllBill = () => {
  return instance.get(`/bills`, options());
};

//HIỂN THỊ BILL USER
export const getOneBill = (_id: any) => {
  return instance.get(`bills/user/${_id}`, options());
};

//HIỂN THỊ BLL THEO ID
export const getById = (_id: string) => {
  return instance.get(`/bills/${_id}`, options());
};

// THANH TOÁN
export const getCheckOutBill = (bill: any) => {
  return instance.post(`/bills/user/add`, bill, options());
};
// UPDATE STATUS
export const UpdateStatus = (bill: any) => {
  return instance.put(`/bills/update/${bill._id}`, bill, options());
};
// HUỶ ĐƠN HÀNG
export const CancelBill = (billId: any, newStatus: any) => {
    return instance.put(`/api/bill/cancel/status/${billId}`, { newStatus }, options());
  };
//HIỂN THỊ BILL Confirmed
export const ConfirmedBill = () => {
  return instance.get(`/bill/user/confirmed`, options());
};
//HIỂN THỊ BILL Delivering
export const DeliveringBill = () => {
  return instance.get(`/bill/user/delivering`, options());
};
//HIỂN THỊ BILL Delivered
export const DeliveredBill = () => {
  return instance.get(`/bill/user/delivered`, options());
};
