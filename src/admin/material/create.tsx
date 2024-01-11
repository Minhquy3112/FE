import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../store";
import { useForm } from "react-hook-form";
import { fetchMaterialAdd } from "../../redux/material.reducer";
import { message } from "antd";
const CreateMaterial = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const {register,handleSubmit,formState:{errors}} = useForm()
  const onSubmit = async (body:any) => {
    try {
        await dispatch(fetchMaterialAdd(body)).unwrap()
        message.success({ content: "Thêm thành công", key: "add" });
        navigate("/admin/listMate")
      console.log(body);
      
    } catch (error) { /* empty */ }
  }
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
                        <strong className="card-title">Create Material</strong>
                      </div>
                      <div className="card-body">
                        <form>
                          <div className="form">
                            <div className="form-group">
                              <label htmlFor="inputEmail4">Name</label>
                              <input
                                type="text"
                                className="form-control"
                                id="inputEmail5"
                                {...register("name")}
                              />
                            </div>
                          </div>
                          <button
                            type="submit"onClick={handleSubmit(onSubmit)}
                            className="btn btn-success bg-green-600 color-while mx-3"
                            style={{marginRight: 5}}
                          >
                            Create
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
  
  export default CreateMaterial;
  