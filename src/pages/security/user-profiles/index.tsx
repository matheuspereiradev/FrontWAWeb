import {
    DeleteOutlined,
    EditOutlined,
    PlusOutlined
} from '@ant-design/icons';

import Dashboard from '@/components/layouts/dashboard';
import { Button, Card, Space, Table, Tooltip } from 'antd';
import Link from 'next/link';
import { GetServerSideProps, GetServerSidePropsResult } from 'next';
import { serverApiFetch } from '@/services/api_request';
import { IUserProfile, IUserProfileListResponse } from '@/interfaces/IUserProfile';

interface Props {
    profiles: IUserProfile[];
}

const UserProfilesPage = ({ profiles }: Props) => {
    const columns = [
        {
            title: 'Actions',
            key: 'actions',
            render: (_: any, record: IUserProfile) => (
                <Space>
                    <Tooltip title="Clique para editar">
                        <Link href={`/security/user-profiles/edit/${record.id}`}>
                            <Button icon={<EditOutlined />} />
                        </Link>
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
            title: 'Nome do Perfil',
            dataIndex: 'profileName',
            key: 'profileName'
        },
        {
            title: 'Descrição',
            dataIndex: 'description',
            key: 'description'
        }
    ];

    return (
        <Dashboard title="Perfis de Usuário">
            <Card>
                <Link href="/security/user-profiles/add">
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        style={{ marginBottom: 16 }}
                    >
                        Adicionar Perfil
                    </Button>
                </Link>
                <Table rowKey="id" columns={columns} dataSource={profiles} />
            </Card>
        </Dashboard>
    );
};

export const getServerSideProps: GetServerSideProps<Props> = async (
    ctx
): Promise<GetServerSidePropsResult<Props>> => {
    const { data: profiles } = await serverApiFetch<IUserProfileListResponse>(ctx, '/UserProfile');

    return {
        props: {
            profiles
        }
    };
};

export default UserProfilesPage;
