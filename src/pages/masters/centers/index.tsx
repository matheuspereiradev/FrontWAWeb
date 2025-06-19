import {
    DeleteOutlined,
    EditOutlined,
    PlusOutlined
} from '@ant-design/icons';

import Dashboard from '@/components/layouts/dashboard';
import { Button, Card, Space, Table } from 'antd';
import Link from 'next/link';
import { GetServerSideProps, GetServerSidePropsResult } from 'next';
import { serverApiFetch } from '@/services/api_request';
import { ICenter, ICenterListResponse } from '@/interfaces/ICenters';

interface Props {
    centers: ICenter[];
}

const CentersPage = ({ centers }: Props) => {
    const columns = [
        // {
        //     title: 'Ações',
        //     key: 'actions',
        //     render: (_: any, record: ICenter) => (
        //         <Space>
        //             <Link href={`/masters/centers/edit/${record.id}`}>
        //                 <Button icon={<EditOutlined />} />
        //             </Link>
        //             <Button
        //                 icon={<DeleteOutlined />}
        //                 danger
        //                 onClick={() => console.log(record.code)}
        //             />
        //         </Space>
        //     )
        // },
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: 'Código',
            dataIndex: 'code',
            key: 'code'
        },
        {
            title: 'Descrição',
            dataIndex: 'description',
            key: 'description'
        },
        {
            title: 'Cidade',
            dataIndex: 'city',
            key: 'city'
        },
        {
            title: 'Zona',
            dataIndex: 'zone',
            key: 'zone',
            render: (zone: string) => zone.trim()
        }
    ];

    return (
        <Dashboard title="Centros">
            <Card>
                <Table rowKey="id" columns={columns} dataSource={centers} />
            </Card>
        </Dashboard>
    );
};

export const getServerSideProps: GetServerSideProps<Props> = async (
    ctx
): Promise<GetServerSidePropsResult<Props>> => {
    const { data: centers } = await serverApiFetch<ICenterListResponse>(ctx,'/Centers');

    return {
        props: {
            centers
        }
    };
};

export default CentersPage;
