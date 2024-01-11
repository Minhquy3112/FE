import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { AppDispatch } from "../../store";
import { useForm } from "react-hook-form";
import {
  fetchCategoriesOne,
  fetchCategoriesUpdate,
} from "../../redux/categories.reducer";
import { useEffect } from "react";
import { message } from "antd";
import axios from "axios";
import { ICategory } from "../../models/category";

const UpdateCategory = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);
  const dispatch = useDispatch<AppDispatch>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICategory>({
    defaultValues: async () => {
      if (id) {
        return await fetchCategoryById(id);
      }
    },
  });

  const onSubmit = async (body: any) => {
    try {
      const images = await uploadFiles(body.img);
      const newData = { ...body, img: images };
      await dispatch(fetchCategoriesUpdate(newData)).unwrap();
      navigate("/admin/listCate");

      console.log(body);
    } catch (error) {}
  };

  const fetchCategoryById = async (id: string) => {
    const data = await dispatch(fetchCategoriesOne(id)).unwrap();
    return data.category;
  };

  useEffect(() => {
    if (id) {
      fetchCategoryById(id);
    }
  }, []);

  const uploadFiles = async (files: FileList): Promise<string[]> => {
    const CLOUD_NAME = "djhzlcf7o";
    const PRESET_NAME = "test-upload";
    const FOLDER_NAME = "DATN";
    const urls: string[] = [];
    const api = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

    const formData = new FormData();
    formData.append("upload_preset", PRESET_NAME);
    formData.append("folder", FOLDER_NAME);

    for (const file of Array.from(files)) {
      formData.append("file", file);
      try {
        message.loading({ content: "Đang cập nhật", key: "upload" });
        const response = await axios.post(api, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        urls.push(response.data.secure_url);
      } catch (error) {
        console.log(error);
        message.error({ content: "Lỗi khi tải ảnh lên", key: "upload" });
      }
    }
    return urls;
  };

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
                      <strong className="card-title">Update Category</strong>
                    </div>
                    <div className="card-body">
                      <form onSubmit={handleSubmit(onSubmit)}>
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
                        <div className="form">
                          <div className="form-group">
                            <label htmlFor="inputEmail4">Image</label>
                            <br />
                            <input
                              type="file"
                              className=""
                              id="inputEmail5"
                              {...register("img")}
                            />
                          </div>
                        </div>
                        <button
                          type="submit"
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

export default UpdateCategory;
