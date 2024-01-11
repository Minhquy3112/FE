import { Button, message, Popconfirm, Space, Table } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { RootState } from "../../store";
import { IMaterial } from "../../models/material";
import {
  fetchMaterialAll,
  fetchMaterialRemove,
} from "../../redux/material.reducer";

interface MaterialData extends IMaterial {
  recordKey: string;
}

interface DataType {
  key: string;
  name: string;
}

const ListMaterialPage = () => {
  const { material } = useSelector((state: RootState) => state.material);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchMaterialAll());
  }, []);
  const datass: IMaterial[] = material;
  const confirmDelete = async (materialId: string) => {
    try {
      await dispatch(fetchMaterialRemove(materialId));
      await dispatch(fetchMaterialAll());
      message.success("Nơi xuất xứ đã được xóa thành công");
    } catch (error) {
      if (!error) {
        setTimeout(message.loading("đang sử lí .."), 2000);
      } else {
        message.error(`Lỗi khi xóa nơi xuất xứ này: ${error}`);
      }
    }
  };

  const cancelDelete = () => {
    message.error("Bạn đã hủy thao tác xóa");
  };

  const uniqueNames = Array.from(
    new Set(datass?.map((user: any) => user.name))
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
      title: "Action",
      dataIndex: "",
      key: "x",
      width: "20%",
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/admin/updateMate/${record.key}`}>
            <Button className="btn-edit text-[#30D200] border-[#31d200cb] hover:text-[#31d200ba] hover:border-[#30D200] active:border-[#30D200]">
              Edit
            </Button>
          </Link>
          <Popconfirm
            title="Bạn có chắc chắn là muốn xóa nơi xuất xứ này?"
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

  const data: DataType[] = datass?.map((user) => ({
    key: user._id,
    name: user.name,
  }));

  const materialData: MaterialData[] = datass?.map((material) => ({
    ...material,
    recordKey: material._id,
  }));
  console.log(materialData);

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
        to="/admin/createMate"
        className="btn btn-primary"
        style={{ marginLeft: 835, marginBottom: 12 }}
      >
        <i className="fa-solid fa-circle-plus"></i>Thêm xuất xứ
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

export default ListMaterialPage;
