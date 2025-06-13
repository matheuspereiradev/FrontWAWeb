import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined
} from '@ant-design/icons';

import Dashboard from '@/components/layouts/dashboard';
import { Button, Card, Space, Switch, Table } from 'antd';
import Link from 'next/link';
import users from '../../../data/users.json';

const UsersPage = () => {

  const columns = [
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: any) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => console.log('')} />
          <Button icon={<DeleteOutlined />} danger onClick={() => console.log(record.username)} />
        </Space>
      )
    },
    {
      title: 'Name',
      key: 'name',
      render: (_: any, record: any) => `${record.firstName} ${record.lastName}`,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username'
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role'
    },
    {
      title: 'Active',
      dataIndex: 'active',
      key: 'active',
      render: (active: boolean) => <Switch checked={active} disabled />
    }

  ];

  return (
    <Dashboard title={'Usuários'}>
      <Card>
        <Link href={'/security/users/add'}>
          <Button type="primary" icon={<PlusOutlined />} style={{ marginBottom: 16 }}>
            Add User
          </Button>
        </Link>
        <Table rowKey="username" columns={columns} dataSource={users} />;
      </Card>
    </Dashboard >
  );
};

export default UsersPage;
