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
import {
  IBufferProfile,
  IBufferProfileListResponse
} from '@/interfaces/IBufferProfile';

interface Props {
  bufferProfiles: IBufferProfile[];
}

const BufferProfilesPage = ({ bufferProfiles }: Props) => {
  const columns = [
    // {
    //   title: 'Ações',
    //   key: 'actions',
    //   render: (_: any, record: IBufferProfile) => (
    //     <Space>
    //       <Tooltip title="Clique para editar">
    //         <Link href={`/masters/buffer-profiles/edit/${record.id}`}>
    //           <Button icon={<EditOutlined />} />
    //         </Link>
    //       </Tooltip>

    //       <Tooltip title="Clique para excluir">
    //         <Button
    //           icon={<DeleteOutlined />}
    //           danger
    //           onClick={() => console.log(record.profileName)}
    //         />
    //       </Tooltip>
    //     </Space>
    //   )
    // },
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Nome do Perfil', dataIndex: 'profileName', key: 'profileName' },
    { title: 'Supply Type', dataIndex: 'supplyType', key: 'supplyType' },
    { title: 'Lead Time Category', dataIndex: 'leadTimeCategory', key: 'leadTimeCategory' },
    { title: 'Variability Category', dataIndex: 'variabilityCategory', key: 'variabilityCategory' },
    { title: 'Lead Time Factor', dataIndex: 'leadTimeFactor', key: 'leadTimeFactor' },
    { title: 'Variability Factor', dataIndex: 'variabilityFactor', key: 'variabilityFactor' },
    { title: 'ADU Calculation Days', dataIndex: 'aduCalculationDays', key: 'aduCalculationDays' },
    { title: 'ADU Future Days', dataIndex: 'aduFutureDays', key: 'aduFutureDays' },
    { title: 'Frequency', dataIndex: 'frequency', key: 'frequency' },
    {
      title: 'AdU x DLT',
      dataIndex: 'useAdUxDlTxFactorDlt',
      key: 'useAdUxDlTxFactorDlt',
      render: (value: boolean) => (
        <Tag color={value ? 'blue' : 'default'}>{value ? 'Sim' : 'Não'}</Tag>
      )
    },
    {
      title: 'Usa MOQ',
      dataIndex: 'useMoq',
      key: 'useMoq',
      render: (value: boolean) => (
        <Tag color={value ? 'blue' : 'default'}>{value ? 'Sim' : 'Não'}</Tag>
      )
    },
    {
      title: 'AdU x Freq.',
      dataIndex: 'useAdUxFrequency',
      key: 'useAdUxFrequency',
      render: (value: boolean) => (
        <Tag color={value ? 'blue' : 'default'}>{value ? 'Sim' : 'Não'}</Tag>
      )
    },
    { title: 'Spike Horizon Type', dataIndex: 'spikeHorizonType', key: 'spikeHorizonType' },
    { title: 'Spike Horizon Value', dataIndex: 'spikeHorizonValue', key: 'spikeHorizonValue' },
    { title: 'Spike Threshold Type', dataIndex: 'spikeThresholdType', key: 'spikeThresholdType' },
    { title: 'Spike Threshold', dataIndex: 'spikeThreshold', key: 'spikeThreshold' },
    { title: 'Spike Horizon Days', dataIndex: 'spikeHorizonDays', key: 'spikeHorizonDays' },
    {
      title: 'Ativo',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (value: boolean) => (
        <Tag color={value ? 'green' : 'red'}>{value ? 'Sim' : 'Não'}</Tag>
      )
    }
  ];

  return (
    <Dashboard title="Perfis de Buffer">
      <Card>
        {/* <Link href="/masters/buffer-profiles/add">
          <Button
            type="primary"
            icon={<PlusOutlined />}
            style={{ marginBottom: 16 }}
          >
            Adicionar Perfil de Buffer
          </Button>
        </Link> */}
        <Table
          rowKey="id"
          columns={columns}
          dataSource={bufferProfiles}
          scroll={{ x: 'max-content' }}
          size='small'
        />
      </Card>
    </Dashboard>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  ctx
): Promise<GetServerSidePropsResult<Props>> => {
  const { data: bufferProfiles } =
    await serverApiFetch<IBufferProfileListResponse>(
      ctx,
      '/BufferProfile'
    );

  return {
    props: {
      bufferProfiles
    }
  };
};

export default BufferProfilesPage;
