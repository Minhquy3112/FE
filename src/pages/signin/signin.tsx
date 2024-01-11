import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { signin } from "../../api/auth";
import {  Image, message } from "antd";
import { WarapperContainerLeft, WarapperContainerRight, WrapperTextLight } from "./style";


const Signin = () => {

  const navigate = useNavigate()
  const { register, handleSubmit } = useForm()
  const onsignin = async (value: any) => {
    try {
      console.log(value);
      const reponse = await signin(value);
      localStorage.setItem("accessToken", reponse?.data?.accessToken);
      localStorage.setItem("accessRole", reponse?.data?.user?.role);
      localStorage.setItem("user", JSON.stringify(reponse?.data?.user));
      console.log("A", reponse);
      if (reponse.data.user.role == "admin") {
        message.success("đăng nhập admin thành công !");
        navigate("/admin")
      } else {
        message.success(`đăng nhập ${reponse.data.user.name} thành công !`)
        navigate("/")
      }

    } catch (error: any) {
      console.log(error);
      message.error(`${error.response.data.message}`)


    }
  }
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#fff",
          height: "100vh",
        }}
      >
        <div
          style={{
            width: "800px",
            height: "400px",
            borderRadius: "6px",
            background: "#fff",
            display: "flex",
          }}
          className="shadow-2xl"
        >
          <WarapperContainerLeft>
            <h1
              style={{
                marginLeft: "10px",
                marginTop: "5px",
                textAlign: "center",
                fontSize: "25px",
                fontFamily: "-moz-initial",
                fontStyle: "bold",
              }}
              className="my-6"
            >
              ĐĂNG NHẬP
            </h1>
            <form onSubmit={handleSubmit(onsignin)}>

              <div className="form-group ">
                <label >Email address</label>
                <input type="email" className="form-control rounded" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"
                  {...register("email")}
                />
                
              </div>
              <div className="form-group">
                <label >Password</label>
                <input type="password" className="form-control rounded" id="exampleInputPassword1" placeholder="Password" 
                 {...register("password")} 
                />
              </div>


              <button
                type="submit" className="btn btn-warning rounded "
                // style={{
                //   backgroundColor: "#0e7ccf",
                //   border: "none",
                //   borderRadius: "5px",
                // }}
              >
                Đăng Nhập
              </button>
            </form>
            <Link to="/signup">
              {" "}
              <p>
                Bạn chưa có tài khoản?{" "}
                <WrapperTextLight> Đăng Kí</WrapperTextLight>
              </p>
            </Link>
          </WarapperContainerLeft>

          <WarapperContainerRight>
            <Image
              src="https://salt.tikicdn.com/ts/upload/eb/f3/a3/25b2ccba8f33a5157f161b6a50f64a60.png"
              preview={false}
              alt="iamge-logo"
              height="203px"
              width="203px"
            />
            <WrapperTextLight>
              Mua sắm tại Anime Dragon Ball shop
            </WrapperTextLight>
          </WarapperContainerRight>
        </div>
      </div>

    </>
  );
};

export default Signin;
