import { Button, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../store";
import { fetchCategoriesAll } from "../../redux/categories.reducer";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const Header = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { handleSubmit } = useForm();
  const accessToken = localStorage.getItem("accessToken");
  const { category } = useSelector((state: RootState) => state.categories);
  
  const fetchCategories = async () => {
    try {
      await dispatch(fetchCategoriesAll()).unwrap();
    } catch (error) {}
  };

  const onSubmit = async () => {
    const accessToken = localStorage.getItem("accessToken");
    try {
      if (accessToken) {
        await localStorage.clear();
        message.success({
          content: "Bạn đã đăng xuất xuất thành công",
        });
        navigate("/");
      } else {
        message.warning("Bạn phải đăng nhập !!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const onSignin = async () => {
    try {
      if (accessToken) {
        navigate("/profile");
      } else {
        navigate("/signin");
      }
    } catch (error) {}
  };

  const onLogout = async () => {
    try {
      if (accessToken) {
        await localStorage.clear();
        message.success({
          content: "Bạn đã đăng xuất xuất thành công",
        });
        navigate("/");
      } else {
        message.warning("Bạn phải đăng nhập !!");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {/* Topbar Start */}
      <div className="container-fluid">
        <div className="row align-items-center bg-light py-3 px-xl-5 d-none d-lg-flex">
          <div className="col-lg-4">
            <a href="" className="text-decoration-none">
              {/* <span className="h1 text-uppercase text-primary bg-dark px-2">
                Multi
              </span>
              <span className="h1 text-uppercase text-dark bg-primary px-2 ml-n1">
                Shop
              </span> */}
              <img
                src="../../../src/assets/img/logo.png"
                alt=""
                style={{ height: "100px", width: "250px" }}
              />
            </a>
          </div>
          <div className="col-lg-4 col-6 text-left">
            <form action="">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Tìm kiếm sản phẩm"
                />
                <div className="input-group-append">
                  <span className="input-group-text bg-transparent text-primary">
                    <i className="fa fa-search" />
                  </span>
                </div>
              </div>
            </form>
          </div>
          <div className="col-lg-4 col-6 text-right">
            <p className="m-0">Chăm sóc khách hàng</p>
            <h5 className="m-0">0358806293</h5>
          </div>
        </div>
      </div>
      {/* Topbar End */}

      {/* Navbar Start */}
      <div className="container-fluid bg-dark mb-30">
        <div className="row px-xl-5">
          <div className="col-lg-3 d-none d-lg-block">
            <a
              className="btn d-flex align-items-center justify-content-between bg-primary w-100"
              data-toggle="collapse"
              href="#navbar-vertical"
              style={{ height: 65, padding: "0 30px" }}
            >
              <h6 className="text-dark m-0">
                <i className="fa fa-bars mr-2" />
                Danh mục sản phẩm
              </h6>
              <i className="fa fa-angle-down text-dark" />
            </a>
            <nav
              className="collapse position-absolute navbar navbar-vertical navbar-light align-items-start p-0 bg-light"
              id="navbar-vertical"
              style={{ width: "calc(100% - 30px)", zIndex: 999 }}
            >
              <div className="navbar-nav w-100">
                {category.map((item) => (
                  <a href="" className="nav-item nav-link">
                    {item.name}
                  </a>
                ))}
              </div>
            </nav>
          </div>
          <div className="col-lg-9">
            <nav className="navbar navbar-expand-lg bg-dark navbar-dark py-3 py-lg-0 px-0">
              <a href="" className="text-decoration-none d-block d-lg-none">
                {/* <span className="h1 text-uppercase text-dark bg-light px-2">
                  Multi
                </span>
                <span className="h1 text-uppercase text-light bg-primary px-2 ml-n1">
                  Shop
                </span> */}
                <img
                  src="../../../src/assets/img/logo.png"
                  alt=""
                  style={{ height: "100px", width: "250px" }}
                />
              </a>
              <button
                type="button"
                className="navbar-toggler"
                data-toggle="collapse"
                data-target="#navbarCollapse"
              >
                <span className="navbar-toggler-icon" />
              </button>
              <div
                className="collapse navbar-collapse justify-content-between"
                id="navbarCollapse"
              >
                <div className="navbar-nav mr-auto py-0">
                  <Link to="" className="nav-item nav-link active">
                    Trang chủ
                  </Link>
                  <Link to="/shop" className="nav-item nav-link">
                    Cửa hàng
                  </Link>
                  <Link to="/about" className="nav-item nav-link">
                    Giới thiệu
                  </Link>
                  <Link to="/contact" className="nav-item nav-link">
                    Liên hệ
                  </Link>
                </div>
                <div className="navbar-nav ml-auto py-0 d-none d-lg-block">
                  <button className="btn px-0" onClick={handleSubmit(onLogout)}>
                    <span className="fas fa-power-off text-primary" />
                  </button>
                  <button onClick={handleSubmit(onSignin)} className="btn px-0 ml-3">
                    <i className="fas fa-user text-primary" />
                  </button>
                  <Link to="/cart" className="btn px-0 ml-3">
                    <i className="fas fa-shopping-cart text-primary" />
                    {/* <span
                      className="badge text-secondary border border-secondary rounded-circle"
                      style={{ paddingBottom: 2 }}
                    >
                      0
                    </span> */}
                  </Link>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
      {/* Navbar End */}
    </>
  );
};

export default Header;
