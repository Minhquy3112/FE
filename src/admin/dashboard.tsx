import { message } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MyChart from "../components/statistics/statistics";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { fetchUsersAll } from "../redux/user.reducer";

const DashboardPage = () => {
  const navigate = useNavigate();
  const accessRole = localStorage.getItem("accessRole");

  // ĐẾM SỐ LƯỢNG NGƯỜI DÙNG
  const { user } = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsersAll());
  }, []);
  const numberOfUsers = user.length;

  useEffect(() => {
    if (!accessRole) {
      message.warning("bạn cần phải đăng nhập !");
      navigate("/signin");
    }
    if (accessRole == "member") {
      message.warning("Bạn không có quyền truy cập !");
      navigate("/signin");
    }
    if (accessRole == "admin") {
      message.success("xin chào admin !");
      navigate("/admin");
    }
  }, [accessRole, navigate]);
  return (
    <>
      <div className="container">
        <div className="row" style={{ marginBottom: "12px" }}>
          <div
            style={{
              height: "120px",
              backgroundColor: "#fff",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
            className="col"
          >
            col
          </div>
          <div
            style={{
              height: "120px",
              backgroundColor: "#fff",
              marginLeft: "12px",
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}
            className="col"
          >
            <h5>Thành viên sử dụng</h5>
            <span>{numberOfUsers}</span>
          </div>
          <div
            style={{
              height: "120px",
              backgroundColor: "#fff",
              marginLeft: "12px",
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}
            className="col"
          >
            col
          </div>
          <div
            style={{
              height: "120px",
              backgroundColor: "#fff",
              marginLeft: "12px",
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}
            className="col"
          >
            col
          </div>
        </div>
      </div>
      <MyChart />
    </>
  );
};

export default DashboardPage;
