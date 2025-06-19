import Dashboard from '@/components/layouts/dashboard';
import { IZaf, IZafListResponse } from '@/interfaces/IZaf';
import { serverApiFetch } from '@/services/api_request';
import { formatDate } from '@/utils/date';
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined
} from '@ant-design/icons';
import { Button, Card, Checkbox, DatePicker, Space, Table, Tooltip } from 'antd';
import { GetServerSideProps, GetServerSidePropsResult } from 'next';
import Link from 'next/link';

interface Props {
  zafs: IZaf[];
};


const ZafPage = (props: Props) => {

  const columns = [
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: any) => (
        <Space>
          <Tooltip title="Clique para editar">
            <Link href={`/stock/zaf/edit/${record.id}`}><Button icon={<EditOutlined />} /></Link>
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
      title: 'Zona',
      dataIndex: 'targetZone',
      key: 'targetZone'
    },
    {
      title: 'Tipo de Ajuste',
      dataIndex: 'adjustmentType',
      key: 'adjustmentType'
    },
    {
      title: 'Valor do Ajuste',
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
      render: (active: boolean) => <Checkbox checked={active} disabled />
    },
    {
      title: 'Data de Início',
      dataIndex: 'effectiveFrom',
      key: 'effectiveFrom',
      render: (effectiveFrom: string) => formatDate(effectiveFrom)
    },
    {
      title: 'Data de Fim',
      dataIndex: 'effectiveTo',
      key: 'effectiveTo',
      render: (effectiveTo: string) => formatDate(effectiveTo)
    },
    {
      title: 'Criado em',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (createdAt: string) => formatDate(createdAt)
    },

  ];

  return <Dashboard title={'ZAF'}>
    <Card>
      <Link href={'/stock/zaf/add'}>
        <Button type="primary" icon={<PlusOutlined />} style={{ marginBottom: 16 }}>
          Adicionar ZAF
        </Button>
      </Link>
      <Table rowKey="id" columns={columns} dataSource={props.zafs} />;
    </Card>
  </Dashboard >
};


export const getServerSideProps: GetServerSideProps<Props> =
  async (ctx): Promise<GetServerSidePropsResult<Props>> => {
    const { data: zafs } = await serverApiFetch<IZafListResponse>(ctx, '/Zaf');

    return {
      props: {
        zafs
      }
    };
  }


export default ZafPage;
