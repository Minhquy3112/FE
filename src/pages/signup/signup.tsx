
import { useForm } from "react-hook-form";
import { signup } from "../../api/auth";
import { Link, useNavigate } from "react-router-dom";
import { Image, message } from "antd";
import { WarapperContainerLeft, WarapperContainerRight, WrapperTextLight } from "./style";

const Signup = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const onSignup = async (values: any) => {
    console.log(values);
    try {
      const response = await signup(values);
      console.log({ response });
      message.success(`Đăng kí thành công ${response.data.user.name} !`)
      navigate('/signin');

    } catch (error: any) {
      console.log(error);
      message.warning(`${error?.response?.data.message}`)
    }

  }

  return (
    <>
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
              height: "500px",
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
                ĐĂNG KÍ
              </h1>
              <form onSubmit={handleSubmit(onSignup)}>

                <div className="form-group ">
                  <label >Tên của bạn</label>
                  <input type="text" className="form-control rounded" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder=" Tên "
                    {...register("name")}
                  />

                </div>
                <div className="form-group ">
                  <label >Email của bạn</label>
                  <input type="email" className="form-control rounded" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email"
                    {...register("email")}
                  />

                </div>
                <div className="form-group">
                  <label >Mật khẩu</label>
                  <input type="password" className="form-control rounded" id="exampleInputPassword1" placeholder="Mật khẩu "
                    {...register("password")}
                  />
                </div>

                <div className="form-group ">
                  <label >Xác nhận mật khẩu</label>
                  <input type="password" className="form-control rounded" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Xác nhận mật khẩu"
                    {...register("confirmPassword")}
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
                  Đăng Kí
                </button>
              </form>
              <Link to="/signin">
                {" "}
                <p>
                  Bạn đã có tài khoản?{" "}
                  <WrapperTextLight> Đăng Nhập</WrapperTextLight>
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
    </>
  );
};

export default Signup;
