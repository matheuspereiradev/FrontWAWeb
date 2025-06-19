import {
    DeleteOutlined,
    EditOutlined,
    PlusOutlined
} from '@ant-design/icons';

import Dashboard from '@/components/layouts/dashboard';
import { Button, Card, Space, Table, Tag, Tooltip } from 'antd';
import Link from 'next/link';
import { GetServerSideProps, GetServerSidePropsResult } from 'next';
import { serverApiFetch } from '@/services/api_request';
import dayjs from 'dayjs';
import { IDaf, IDafListResponse } from '@/interfaces/IDaf';

interface Props {
    dafs: IDaf[];
}

const DafListPage = ({ dafs }: Props) => {
    const columns = [
        {
            title: 'Ações',
            key: 'actions',
            render: (_: any, record: IDaf) => (
                <Space>
                    <Tooltip title="Clique para editar">
                        <Link href={`/stock/daf/edit/${record.id}`}><Button icon={<EditOutlined />} /></Link>
                    </Tooltip>
                    <Tooltip title="Clique para Excluir">
                        <Button
                            icon={<DeleteOutlined />}
                            danger
                            onClick={() => console.log(record.id)}
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
            title: 'Referência',
            key: 'reference',
            render: (_: any, record: any) => record.product?.reference || '-',
        },
        {
            title: 'Descrição Produto',
            key: 'description',
            render: (_: any, record: any) => record.product?.description || '-',
        },
        {
            title: 'Centro',
            key: 'center',
            render: (_: any, record: any) => record.center?.code || '-',
        },
        {
            title: 'Tipo de Ajuste',
            dataIndex: 'adjustmentType',
            key: 'adjustmentType'
        },
        {
            title: 'Valor',
            dataIndex: 'adjustmentValue',
            key: 'adjustmentValue'
        },
        {
            title: 'Descrição',
            dataIndex: 'description',
            key: 'description'
        },
        {
            title: 'Ativo',
            dataIndex: 'isActive',
            key: 'isActive',
            render: (isActive: boolean) => (
                <Tag color={isActive ? 'green' : 'red'}>
                    {isActive ? 'Sim' : 'Não'}
                </Tag>
            )
        },
        {
            title: 'De',
            dataIndex: 'effectiveFrom',
            key: 'effectiveFrom',
            render: (date: string) => dayjs(date).format('DD/MM/YYYY')
        },
        {
            title: 'Até',
            dataIndex: 'effectiveTo',
            key: 'effectiveTo',
            render: (date: string) => dayjs(date).format('DD/MM/YYYY')
        },
        {
            title: 'Criado em',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (date: string) => dayjs(date).format('DD/MM/YYYY')
        }
    ];

    return (
        <Dashboard title="DAFs (Fatores de Ajuste)">
            <Card>
                <Link href="/stock/daf/add">
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        style={{ marginBottom: 16 }}
                    >
                        Adicionar DAF
                    </Button>
                </Link>
                <Table rowKey="id" columns={columns} dataSource={dafs} />
            </Card>
        </Dashboard>
    );
};

export const getServerSideProps: GetServerSideProps<Props> = async (
    ctx
): Promise<GetServerSidePropsResult<Props>> => {
    const { data: dafs } = await serverApiFetch<IDafListResponse>(
        ctx,
        '/Daf'
    );

    return {
        props: {
            dafs
        }
    };
};

export default DafListPage;
