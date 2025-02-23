import { Space, Table, Tag, Typography, Avatar } from 'antd';
import { useGetAllUsersQuery } from '../../redux/auth/authApi';
import { UserOutlined } from '@ant-design/icons';
const { Title } = Typography;

const TeamMember = () => {
    const { data: userData, isLoading } = useGetAllUsersQuery(undefined);

    const columns = [
        {
            title: 'Avatar',
            dataIndex: 'authImgUrl',
            key: 'avatar',
            render: (authImgUrl) => (
                // <Avatar src={authImgUrl} alt="User Avatar" />
                <Avatar src={authImgUrl} alt="User Avatar" shape="square" size={45} icon={<UserOutlined />} />
            ),
        },
        {
            title: 'Name',
            dataIndex: 'authName',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            render: (role) => (
                <Tag color={role === 'Admin' ? 'red' : 'blue'}>
                    {role}
                </Tag>
            ),
        },
    ];

    const tableData = userData?.data?.map(({ _id, authName, authImgUrl, email, role }) => ({
        key: _id,
        authName,
        authImgUrl,
        email,
        role
    })) || [];

    return (
        <div>
            <Title level={2} style={{ textAlign: 'center' }}>All Users</Title>
            <Table loading={isLoading} columns={columns} dataSource={tableData} pagination={{ pageSize: 5 }} />
        </div>
    );
};

export default TeamMember;
