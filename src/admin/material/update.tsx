import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { AppDispatch } from "../../store";
import { useForm } from "react-hook-form";
import {
  fetchMaterialOne,
  fetchMaterialUpdate,
} from "../../redux/material.reducer";
import { message } from "antd";
import { useEffect } from "react";
import { IMaterial } from "../../models/material";

const UpdateMaterial = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);
  const dispatch = useDispatch<AppDispatch>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IMaterial>({
    defaultValues: async () => {
      if (id) {
        return await fetchMaterialById(id);
      }
    },
  });
  const onSubmit = async (body: any) => {
    try {
      await dispatch(fetchMaterialUpdate(body)).unwrap();
      message.success({ content: "Cập nhật thành công", key: "" });
      navigate("/admin/listMate");
      console.log(body);
    } catch (error) {
      /* empty */
    }
  };

  const fetchMaterialById = async (id: string) => {
    const data = await dispatch(fetchMaterialOne(id)).unwrap();
    return data.material;
  };
  useEffect(() => {
    if (id) {
      fetchMaterialById(id);
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
                          type="submit"
                          onClick={handleSubmit(onSubmit)}
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

export default UpdateMaterial;
