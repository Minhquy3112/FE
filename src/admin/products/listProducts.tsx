
import { Button, message, Popconfirm, Space, Table } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { IProducts } from '../../models/products';
import { RootState } from '../../store';
import { fetchProductsAll, fetchProductsRemove } from '../../redux/products.reducer';


interface ProductData extends IProducts {
    recordKey: string;
}

interface DataType {
    key: string;
    name: string;
    price: number;
    img: string;
}



const ListProductsPage = () => {

    const {product} = useSelector((state: RootState) => state.products)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchProductsAll())
    }, [])
    const datass: IProducts[] = product
    const confirmDelete = async (id: string) => {
        try {
            await dispatch(fetchProductsRemove(id))
            await dispatch(fetchProductsAll())
            message.success('Sản phẩm đã được xóa thành công');

        } catch (error) {
            if (!error) {
                setTimeout(message.loading('đang sử lí ..'), 2000)
            } else {
                message.error(`Lỗi khi xóa sản phẩm này: ${error}`);
            }
        }
    };


    const cancelDelete = () => {
        message.error('Hủy thoa tác xóa thành công');
    };

    const uniqueNames = Array.from(new Set(datass?.map((product: any) => product.name)));
    const nameFilters = uniqueNames.map((name) => ({ text: name, value: name }));

    const columns: ColumnsType<DataType> = [
        {
            title: 'Name',
            dataIndex: 'name',
            width: '30%',
            filters: nameFilters,
            onFilter: (value, record) => record.name.indexOf(value.toString()) === 0,
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: 'Price',
            dataIndex: 'price',
            width: '15%',
            sorter: (a, b) => a.price - b.price,
        },
        {
            title: 'Image',
            dataIndex: 'img',
            width: '20%',
            render: (img) => <img src={img} alt="Product" width={100} height={50} />,
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            width: '20%',
            render: (_, record) => (
                <Space size="middle">
                    <Link to={`/admin/updatePro/${record.key}`}>
                        <Button className='btn-edit text-[#30D200] border-[#31d200cb] hover:text-[#31d200ba] hover:border-[#30D200] active:border-[#30D200]' >Edit</Button>
                    </Link>
                    <Popconfirm
                        title="Bạn có chắc chắn là xóa sản phẩm này?"
                        onConfirm={() => confirmDelete(record.key)}
                        onCancel={cancelDelete}
                        okText="Đồng ý"
                        cancelText="Không"
                    >
                        <Button type="primary" danger>Delete</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const data: DataType[] = datass?.map((product) => ({
        key: product._id,
        name: product.name,
        price: product.price,
        img: product.img[0],
    }));

    const productData: ProductData[] = datass?.map((product) => ({
        ...product,
        recordKey: product._id,
    }));
    console.log(productData);

    const handleTableChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
        console.log('Table parameters:', pagination, filters, sorter, extra);
    };

    return (
        <div id="adminhome">
            <Link to="/admin/createPro" className='btn btn-primary' style={{marginLeft: 835, marginBottom: 12}}><i className="fa-solid fa-circle-plus"></i>Thêm sản phẩm</Link>
            <Table columns={columns} dataSource={data} pagination={{ pageSize: 4 }} onChange={handleTableChange} />
        </div>
    );
};

export default ListProductsPage;