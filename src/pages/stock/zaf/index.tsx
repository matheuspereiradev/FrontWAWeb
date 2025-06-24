import Dashboard from '@/components/layouts/dashboard';
import { IZaf, IZafListResponse } from '@/interfaces/IZaf';
import { serverApiFetch, apiDelete } from '@/services/api_request';
import { formatDate } from '@/utils/date';
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined
} from '@ant-design/icons';
import { Button, Card, Space, Table, Tag, Tooltip, Popconfirm } from 'antd';
import { GetServerSideProps, GetServerSidePropsResult } from 'next';
import Link from 'next/link';
import { useNotification } from '@/hooks/notification';
import { useRouter } from 'next/router';

interface Props {
  zafs: IZaf[];
}

const ZafPage = (props: Props) => {
  const { openNotification } = useNotification();
  const router = useRouter();

  const handleDelete = async (id: number) => {
    try {
      await apiDelete(`/Zaf/${id}`);
      openNotification('success', {
        message: 'ZAF excluída com sucesso',
        description: `ID: ${id}`
      });
      router.replace(router.asPath);
    } catch (error) {
      openNotification('error', {
        message: 'Erro ao excluir ZAF',
        description: `${error}`
      });
    }
  };

  const columns = [
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: IZaf) => (
        <Space>
          <Tooltip title="Clique para editar">
            <Link href={`/stock/zaf/edit/${record.id}`}>
              <Button icon={<EditOutlined />} />
            </Link>
          </Tooltip>
          <Tooltip title="Clique para excluir">
            <Popconfirm
              title="Deseja realmente excluir esta ZAF?"
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
    { title: 'ID', dataIndex: 'id', key: 'id' },
    {
      title: 'Referência',
      key: 'reference',
      render: (_: any, record: IZaf) => record.product?.reference || '-',
    },
    {
      title: 'Descrição Produto',
      key: 'description',
      render: (_: any, record: IZaf) => record.product?.description || '-',
    },
    {
      title: 'Centro',
      key: 'center',
      render: (_: any, record: IZaf) => record.center?.code || '-',
    },
    { title: 'Zona', dataIndex: 'targetZone', key: 'targetZone' },
    { title: 'Tipo de Ajuste', dataIndex: 'adjustmentType', key: 'adjustmentType' },
    { title: 'Valor do Ajuste', dataIndex: 'adjustmentValue', key: 'adjustmentValue' },
    { title: 'Descrição', dataIndex: 'description', key: 'description' },
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
    { title: 'Data de Início', dataIndex: 'effectiveFrom', key: 'effectiveFrom', render: formatDate },
    { title: 'Data de Fim', dataIndex: 'effectiveTo', key: 'effectiveTo', render: formatDate },
    { title: 'Criado em', dataIndex: 'createdAt', key: 'createdAt', render: formatDate },
  ];

  return (
    <Dashboard title={'ZAF'}>
      <Card>
        <Link href={'/stock/zaf/add'}>
          <Button type="primary" icon={<PlusOutlined />} style={{ marginBottom: 16 }}>
            Adicionar ZAF
          </Button>
        </Link>
        <Table rowKey="id" columns={columns} dataSource={props.zafs} />
      </Card>
    </Dashboard>
  );
};

export const getServerSideProps: GetServerSideProps<Props> =
  async (ctx): Promise<GetServerSidePropsResult<Props>> => {
    const { data: zafs } = await serverApiFetch<IZafListResponse>(ctx, '/Zaf');

    return {
      props: {
        zafs
      }
    };
  };

export default ZafPage;
