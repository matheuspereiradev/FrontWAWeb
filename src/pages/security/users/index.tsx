import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined
} from '@ant-design/icons';

import Dashboard from '@/components/layouts/dashboard';
import { Button, Card, Popconfirm, Space, Switch, Table, Tooltip } from 'antd';
import Link from 'next/link';
import { GetServerSideProps, GetServerSidePropsResult } from 'next';
import { apiDelete, serverApiFetch } from '@/services/api_request';
import { IUser, IUserListResponse } from '@/interfaces/IUser';
import { useRouter } from 'next/router';
import { useNotification } from '@/hooks/notification';

interface Props {
  users: IUser[];
}

const UsersPage = ({ users }: Props) => {

  const router = useRouter();
  const { openNotification } = useNotification();

  const handleDelete = async (id: number) => {
    try {
      await apiDelete(`/User/${id}`);
      openNotification('success', {
        message: 'excluído com sucesso',
        description: `ID: ${id}`
      });
      router.replace(router.asPath);
    } catch (error) {
      openNotification('error', {
        message: 'Erro ao excluir',
        description: `${error}`
      });
    }
  };

  const columns = [
    {
      title: 'Ações',
      key: 'actions',
      render: (_: any, record: IUser) => (
        <Space>
          <Tooltip title="Editar usuário">
            <Link href={`/security/users/edit/${record.id}`}>
              <Button icon={<EditOutlined />} />
            </Link>
          </Tooltip>
          <Tooltip title="Clique para excluir">
            <Popconfirm
              title="Deseja realmente excluir?"
              okText="Sim"
              cancelText="Cancelar"
              onConfirm={() => handleDelete(record.id)}
            >
              <Button icon={<DeleteOutlined />} danger />
            </Popconfirm>
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
            Adicionar Usuário
          </Button>
        </Link>
        <Table
          rowKey="id"
          columns={columns}
          dataSource={users}
          scroll={{ x: 'max-content' }}
          size='small' />;
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
