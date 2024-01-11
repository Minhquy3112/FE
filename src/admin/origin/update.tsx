import { useNavigate, useParams } from "react-router-dom";
import { AppDispatch } from "../../store";
import { useDispatch } from "react-redux";
import { IOrigin } from "../../models/origin";
import { useForm } from "react-hook-form";
import { fetchOriginOne, fetchOriginUpdate } from "../../redux/origin.reducer";
import { useEffect } from "react";
import {message} from "antd"

const UpdateOrigin = () => {
  const navigate = useNavigate()
  const {id} = useParams()
  console.log(id);
  const dispatch = useDispatch<AppDispatch>()
  const {register,handleSubmit,formState:{errors}} = useForm<IOrigin>({
    defaultValues: async () => {
      if (id) {
        return await fetchOriginById(id)
      }
    }
  })
  const onSubmit = async (body:any) => {
    try {
    
   
        await dispatch(fetchOriginUpdate(body)).unwrap()
        message.success({ content: "Cập nhật thành công", key: "update" });
        navigate("/admin/listOri")
      console.log(body);
      
    } catch (error) { /* empty */ }
  }

  const fetchOriginById = async (id: string) => {
    const data  = await dispatch (fetchOriginOne(id)).unwrap()
    return data.origin

  }
  useEffect(() => {
    if (id) {
      fetchOriginById(id)
    }
  }, [])
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
                      <strong className="card-title">Update Origin</strong>
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

export default UpdateOrigin;
