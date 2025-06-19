import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined
} from '@ant-design/icons';

import Dashboard from '@/components/layouts/dashboard';
import { Button, Card, Space, Switch, Table, Tooltip } from 'antd';
import Link from 'next/link';
import { GetServerSideProps, GetServerSidePropsResult } from 'next';
import { serverApiFetch } from '@/services/api_request';
import { IUser, IUserListResponse } from '@/interfaces/IUser';

interface Props {
  users: IUser[];
}


const UsersPage = ({ users }: Props) => {

  const columns = [
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: any) => (
        <Space>
          <Tooltip title="Clique para editar">
            <Link href={`/security/users/edit/${record.id}`}><Button icon={<EditOutlined />} /></Link>
          </Tooltip>
          <Tooltip title="Clique para Excluir">
            <Button
              icon={<DeleteOutlined />}
              danger
              onClick={() => console.log(record.profileName)}
            />
          </Tooltip>
        </Space>
      )
    },
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id'
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
      title: 'Usuário',
      dataIndex: 'username',
      key: 'username'
    },
    {
      title: 'Perfil',
      key: 'profile',
      render: (_: any, record: any) => record.profile?.profileName,
    },
  ];

  return (
    <Dashboard title={'Usuários'}>
      <Card>
        <Link href={'/security/users/add'}>
          <Button type="primary" icon={<PlusOutlined />} style={{ marginBottom: 16 }}>
            Add User
          </Button>
        </Link>
        <Table rowKey="id" columns={columns} dataSource={users} />;
      </Card>
    </Dashboard >
  );
};


export const getServerSideProps: GetServerSideProps<Props> =
  async (ctx): Promise<GetServerSidePropsResult<Props>> => {
    const { data: users } = await serverApiFetch<IUserListResponse>(ctx, '/User');

    return {
      props: {
        users
      }
    };
  }



export default UsersPage;
