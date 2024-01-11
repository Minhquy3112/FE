import { Button, message, Popconfirm, Space, Table } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { RootState } from "../../store";
import { fetchCategoriesAll, fetchCategoriesRemove } from "../../redux/categories.reducer";
import { fetchMaterialRemove } from "../../redux/material.reducer";
import { ICategory } from "../../models/category";

interface CategoryData extends ICategory {
  recordKey: string;
}

interface DataType {
  key: string;
  name: string;
  img: string;
}

const ListCategoryPage = () => {
  const { category } = useSelector((state: RootState) => state.categories);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategoriesAll());
  }, []);
  const datass: ICategory[] = category;
  const confirmDelete = async (id: string) => {
    console.log(id);
    
    try {
      await dispatch(fetchCategoriesRemove(id));
      await dispatch(fetchCategoriesAll());
      message.success("Danh mục đã được xóa thành công");
      
      
    } catch (error) {
      if (!error) {
        setTimeout(message.loading("đang sử lí .."), 2000);
      } else {
        message.error(`Lỗi khi xóa danh mục này: ${error}`);
      }
    }
  };

  const cancelDelete = () => {
    message.error("Bạn đã hủy thao tác xóa");
  };

  const uniqueNames = Array.from(
    new Set(datass?.map((product: any) => product.name))
  );
  const nameFilters = uniqueNames.map((name) => ({ text: name, value: name }));

  const columns: ColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      width: "30%",
      filters: nameFilters,
      onFilter: (value, record) => record.name.indexOf(value.toString()) === 0,
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Image",
      dataIndex: "img",
      width: "20%",
      render: (img) => <img src={img} alt="Product" width={100} height={50} />,
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      width: "20%",
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/admin/updateCate/${record.key}`}>
            <Button className="btn-edit text-[#30D200] border-[#31d200cb] hover:text-[#31d200ba] hover:border-[#30D200] active:border-[#30D200]">
              Edit
            </Button>
          </Link>
          <Popconfirm
            title="Bạn có chắc chắn là xóa danh mục này?"
            onConfirm={() => confirmDelete(record.key)}
            onCancel={cancelDelete}
            okText="Đồng ý"
            cancelText="Không"
          >
            <Button type="primary" danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const data: DataType[] = datass?.map((cateogry) => ({
    key: cateogry._id,
    name: cateogry.name,
    img: cateogry.img,
  }));

  const categoryData: CategoryData[] = datass?.map((category) => ({
    ...category,
    recordKey: category._id,
  }));
  console.log(categoryData);

  const handleTableChange: TableProps<DataType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("Table parameters:", pagination, filters, sorter, extra);
  };

  return (
    <div id="adminhome">
      <Link
        to="/admin/createCate"
        className="btn btn-primary"
        style={{ marginLeft: 835, marginBottom: 12 }}
      >
        <i className="fa-solid fa-circle-plus"></i>Thêm danh mục
      </Link>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 6 }}
        onChange={handleTableChange}
      />
    </div>
  );
};

export default ListCategoryPage;
