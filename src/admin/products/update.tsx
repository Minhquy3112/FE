import { message } from "antd";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductsOne,
  fetchProductsUpdate,
} from "../../redux/products.reducer";
import { AppDispatch, RootState } from "../../store";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { IProducts } from "../../models/products";
import { fetchMaterialAll } from "../../redux/material.reducer";
import { fetchOriginAll } from "../../redux/origin.reducer";
import { fetchCategoriesAll } from "../../redux/categories.reducer";
import React, { useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import {Upload } from "antd";
import type { UploadChangeParam } from "antd/es/upload";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

const UpdateProducts = () => {
  const navigate = useNavigate();
  const { id } = useParams()
  
  const [dataUpdate, setDataupdate] = useState([]);
  const dispatch = useDispatch<AppDispatch>();
  const { material } = useSelector((state: RootState) => state.material);
  const { category } = useSelector((state: RootState) => state.categories);
  const { origin } = useSelector((state: RootState) => state.origin);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IProducts>({
    defaultValues: async () => {
      if (id) {
        return await fetchProductById(id);
      }
    },
  });
  const onSubmit = async (body: any) => {
    try {
      const images = await uploadFiles(body.img);
      const newData = { ...body, img: images };
      await dispatch(fetchProductsUpdate(newData)).unwrap();
      message.success({ content: "Cập nhật thành công", key: "update" });
      navigate("/admin/listPro");
      console.log(body);
    } catch (error) {
      /* empty */
    }
  };

  const fetchProductById = async (id: string) => {
    const data = await dispatch(fetchProductsOne(id)).unwrap();
    setDataupdate(data)
    return data.product
    
  };
  
  
  useEffect(() => {
    if (id) {
      fetchProductById(id);
    }
    ////////////////////////
    //category
    const fetchCategories = async () => {
      try {
        await dispatch(fetchCategoriesAll()).unwrap();
      } catch (error) {}
    };
    //material
    const fetchMaterial = async () => {
      try {
        await dispatch(fetchMaterialAll()).unwrap();
      } catch (error) {
        /* empty */
      }
    };
    //origin
    const fetchOrigin = async () => {
      try {
        await dispatch(fetchOriginAll()).unwrap();
      } catch (error) {
        /* empty */
      }
    };

    fetchCategories();
    fetchMaterial();
    fetchOrigin();
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
        message.loading({ content: "Đang cập nhật...", key: "upload" });
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

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  const handleChange: UploadProps["onChange"] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

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
                      <strong className="card-title">Update Products</strong>
                    </div>
                    <div className="card-body">
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-row">
                          <div className="form-group col-md-6">
                            <label htmlFor="inputEmail4">Name</label>
                            <input
                              type="text"
                              className="form-control"
                              id="inputEmail5"
                              {...register("name")}
                              // defaultValue={dataUpdate?.product?.name}
                            />
                          </div>
                          <div className="form-group col-md-6">
                            <label htmlFor="inputPassword4">Price</label>
                            <input
                              type="number"
                              className="form-control"
                              id="inputPassword5"
                              min="0"
                              {...register("price")}
                              // defaultValue={dataUpdate?.product?.price}
                            />
                          </div>
                        </div>
                        <div className="form-row">
                          <div className="form-group col-md-6">
                            <Upload
                            name="avatar"
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                            beforeUpload={beforeUpload}
                            onChange={handleChange}
                          >
                            {imageUrl ? (
                              <img
                                src={imageUrl}
                                alt="avatar"
                                style={{ width: "100%" }}
                              />
                            ) : (
                              uploadButton
                            )}
                          </Upload>
                            {/* <label htmlFor="inputAddress">Image</label>
                            <br />
                            <input type="file" multiple {...register("img")} /> */}
                            
                          </div>
                          <div className="form-group col-md-6">
                            <label htmlFor="inputAddress2">Description</label>
                            <textarea
                              className="form-control"
                              id="inputAddress6"
                              placeholder="Description"
                              {...register("description")}
                              // defaultValue={dataUpdate?.product?.description}
                            />
                          </div>
                        </div>
                        <div className="form-row">
                          <div className="form-group col-md-6">
                            <label htmlFor="inputEmail4">Trọng lượng</label>
                            <input
                              type="number"
                              className="form-control"
                              id="inputEmail5"
                              min="0"
                              {...register("weight")}
                              // defaultValue={dataUpdate?.product?.weight}
                            />
                          </div>
                          <div className="form-group col-md-6">
                            <label htmlFor="inputPassword4">Chiều cao</label>
                            <input
                              type="number"
                              className="form-control"
                              id="inputPassword5"
                              min="0"
                              {...register("height")}
                              // defaultValue={dataUpdate?.product?.height}
                            />
                          </div>
                        </div>
                        <div className="form-row">
                          <div className="form-group col-md-4">
                            <label htmlFor="inputState">Xuất xứ</label>
                            <select
                              id="inputState5"
                              className="form-control"
                              {...register("originId")}
                              defaultValue={dataUpdate?.originId?._id}
                            >
                              {material.map((item) => {
                                return (
                                  <option value={item._id}>{item.name}</option>
                                );
                              })}
                            </select>
                          </div>
                          <div className="form-group col-md-4">
                            <label htmlFor="inputState">Chất liệu</label>
                            <select
                              id="inputState5"
                              className="form-control"
                              {...register("materialId")}
                              defaultValue={dataUpdate?.materialId?.name}
                            >
                              {origin.map((item) => {
                                return (
                                  <option value={item._id}>{item?.name}</option>
                                );
                              })}
                            </select>
                          </div>
                          <div className="form-group col-md-4">
                            <label htmlFor="inputState">Danh mục</label>
                            <select
                              id="inputState5"
                              className="form-control"
                              {...register("categoryId")}
                            >
                              {category.map((item) => {
                                return (
                                  <option value={item._id}>{item.name}</option>
                                );
                              })}
                            </select>
                          </div>
                        </div>
                        <button
                          type="submit"
                          className="btn btn-success bg-green-600 color-while mx-3"
                          style={{ marginRight: 5, marginLeft: 18 }}
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

export default UpdateProducts;
