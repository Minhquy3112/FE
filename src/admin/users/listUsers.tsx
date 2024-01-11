import { Button, message, Popconfirm, Space, Table } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { RootState } from "../../store";
import { fetchCategoriesAll } from "../../redux/categories.reducer";
import { fetchMaterialRemove } from "../../redux/material.reducer";
import { IUser } from "../../models/user";
import { fetchUsersAll, fetchUsersRemove } from "../../redux/user.reducer";

interface CategoryData extends IUser {
  recordKey: string;
}

interface DataType {
  key: string;
  name: string;
  email: string;
  role: string;
}

const ListUsersPage = () => {
  const { user } = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsersAll());
  }, []);

  const datass: IUser[] = user;
  const confirmDelete = async (userId: string) => {
    try {
      await dispatch(fetchUsersRemove(userId));
      await dispatch(fetchUsersAll());
      message.success("Người dùng đã được xóa thành cong");
    } catch (error) {
      if (!error) {
        setTimeout(message.loading("đang sử lí .."), 2000);
      } else {
        message.error(`Lỗi khi xóa người dùng này: ${error}`);
      }
    }
  };

  const cancelDelete = () => {
    message.error("Bạn đã hủy thao tác xóa");
  };

  const uniqueNames = Array.from(
    new Set(datass?.map((user: any) => user.name))
  );
  const uniqueEmail = Array.from(
    new Set(datass?.map((user: any) => user.email))
  );
  const uniqueRole = Array.from(new Set(datass?.map((user: any) => user.role)));
  const nameFilters = uniqueNames.map((name) => ({ text: name, value: name }));
  const emailFilters = uniqueEmail.map((email) => ({
    text: email,
    value: email,
  }));
  const roleFilters = uniqueRole.map((role) => ({ text: role, value: role }));

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
      title: "Email",
      dataIndex: "email",
      width: "30%",
      filters: emailFilters,
      onFilter: (value, record) => record.email.indexOf(value.toString()) === 0,
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: "Role",
      dataIndex: "role",
      width: "30%",
      filters: roleFilters,
      onFilter: (value, record) => record.role.indexOf(value.toString()) === 0,
      sorter: (a, b) => a.role.localeCompare(b.role),
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      width: "20%",
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/admin/update/${record.key}`}>
            <Button className="btn-edit text-[#30D200] border-[#31d200cb] hover:text-[#31d200ba] hover:border-[#30D200] active:border-[#30D200]">
              Edit
            </Button>
          </Link>
          <Popconfirm
            title="Bạn có chắc chắn là muốn xóa người dùng này?"
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
    email: user.email,
    role: user.role,
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
      <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 6 }}
        onChange={handleTableChange}
      />
    </div>
  );
};

export default ListUsersPage;
