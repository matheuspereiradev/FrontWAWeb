import {
  BarChartOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ClusterOutlined,
  DatabaseOutlined,
  DeploymentUnitOutlined,
  DownOutlined,
  FileAddOutlined,
  GroupOutlined,
  RiseOutlined,
  SettingOutlined,
  TagOutlined,
  TagsOutlined,
  ToolOutlined
} from '@ant-design/icons';
import { Button, Card, Col, Dropdown, Layout, Row, Space, Table } from 'antd';
import { GetStaticPropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';

import { Select, Progress, Typography } from 'antd';
import { useState } from 'react';
import { ColumnsType, ExpandableConfig } from 'antd/es/table/interface';
import dataSource from '../data/centerproduct.json';
import Dashboard from '@/components/layouts/dashboard';

const { Option } = Select;
const { Text } = Typography;

const data = [
  { cor: 'Preto', valor: 21, corHex: '#000000' },
  { cor: 'Vermelho', valor: 15, corHex: '#ff0000' },
  { cor: 'Amarelo', valor: 20, corHex: '#ffaa00' },
  { cor: 'Verde', valor: 7, corHex: '#00aa00' },
  { cor: 'Azul', valor: 9, corHex: '#0000ff' },
];

const centers = [
  { name: "São Paulo", id: "1", code: "SP" },
  { name: "Salvador", id: "2", code: "BA" },
  { name: "Fortaleza", id: "3", code: "CE" },
  { name: "Brasília", id: "4", code: "DF" },
  { name: "Rio de Janeiro", id: "5", code: "RJ" },
];

const total = data.reduce((acc, item) => acc + item.valor, 0);

const DashboardPage = () => {

  const { t } = useTranslation('common');

  const [selectedCentersKeys, setSelectedCentersKeys] = useState<React.Key[]>([]);

  const rowSelectionCenters = {
    selectedRowKeys: selectedCentersKeys,
    onChange: (selectedKeys: React.Key[]) => {
      setSelectedCentersKeys(selectedKeys);
    },
  };

  const generateTextFilter = (dataIndex: string) => ({
    filters: [],
    onFilter: (value: string, record: any) =>
      record[dataIndex]?.toString().toLowerCase().includes(value.toLowerCase()),
    filterSearch: true,
  });

  const mainColumns: ColumnsType<any> = [
    {
      title: 'Ações',
      key: 'action',
      sorter: false,
      render: () => (
        <Space size="middle">
          <Dropdown menu={{
            items: [
              {
                key: '1',
                label: (
                  <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                    Adicionar Motivo
                  </a>
                ),
                icon: <FileAddOutlined />,
              },
              {
                key: '2',
                label: (
                  <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                    Remover Motivo
                  </a>
                ),
                icon: <FileAddOutlined />,
              },
              {
                key: '3',
                icon: <TagsOutlined />,
                label: (
                  <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                    Definir Etiqueta
                  </a>
                ),
              },
              {
                key: '4',
                icon: <TagsOutlined />,
                disabled: true,
                label: (
                  <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                    Remover Etiqueta
                  </a>
                ),
              },
              {
                key: '5',
                icon: <GroupOutlined />,
                label: (
                  <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                    Adicionar Grupo de Alocação
                  </a>
                ),
              },
              {
                key: '6',
                icon: <GroupOutlined />,
                disabled: true,
                label: (
                  <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                    Remover Grupo de Alocação
                  </a>
                ),
              },
            ]
          }}>
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                Adicionar
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
          <Dropdown menu={{
            items: [
              {
                key: '1',
                label: (
                  <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                    Consumo projetado
                  </a>
                ),
                icon: <CalendarOutlined />,
              },
              {
                key: '2',
                label: (
                  <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                    Configuração de buffer
                  </a>
                ),
                icon: <SettingOutlined />,
              },
              {
                key: '3',
                icon: <RiseOutlined />,
                label: (
                  <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                    Picos e faturamentos
                  </a>
                ),
              },
              {
                key: '4',
                icon: <BarChartOutlined />,
                label: (
                  <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                    Gráfico Estoque Histórico
                  </a>
                ),
              },
            ]


          }}>
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                Detalhes
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        </Space>
      ),
    },
    {
      title: 'IdCentroProduto',
      dataIndex: 'IdProductoBodega',
      key: 'IdProductoBodega',
      sorter: (a: any, b: any) => a.IdProductoBodega - b.IdProductoBodega,
    },
    {
      title: 'IdCentro',
      dataIndex: 'IdBodega',
      key: 'IdBodega',
      sorter: (a: any, b: any) => a.IdBodega - b.IdBodega,
    },
    {
      title: 'IdProduto',
      dataIndex: 'IdProducto',
      key: 'IdProducto',
      sorter: (a: any, b: any) => a.IdProducto - b.IdProducto,
    },
    {
      title: 'Referencia',
      dataIndex: 'Referencia',
      key: 'Referencia',
      sorter: (a: any, b: any) => a.Referencia.localeCompare(b.Referencia),
    },
    {
      title: 'Descrição',
      dataIndex: 'Descripcion',
      key: 'Descripcion',
      sorter: (a: any, b: any) => a.Descripcion.localeCompare(b.Descripcion),
    },
    {
      title: 'Centro',
      dataIndex: 'Bodega',
      key: 'Bodega',
      sorter: (a: any, b: any) => a.Bodega.localeCompare(b.Bodega),
    },
    {
      title: 'Cod Centro',
      dataIndex: 'CodBodega',
      key: 'CodBodega',
      sorter: (a: any, b: any) => a.CodBodega.localeCompare(b.CodBodega),
    },
    {
      title: 'Unidade Medida',
      dataIndex: 'Unidad',
      key: 'Unidad',
      sorter: (a: any, b: any) => a.Unidad.localeCompare(b.Unidad),
    },
    {
      title: 'Linha',
      dataIndex: 'Linea',
      key: 'Linea',
      sorter: (a: any, b: any) => a.Linea.localeCompare(b.Linea),
    },
    {
      title: 'SubLinha',
      dataIndex: 'SubLinea',
      key: 'SubLinea',
      sorter: (a: any, b: any) => a.SubLinea.localeCompare(b.SubLinea),
    },
    {
      title: 'Estoque',
      dataIndex: 'Stock',
      key: 'Stock',
      sorter: (a: any, b: any) => a.Stock - b.Stock,
    },
    {
      title: 'Estoque em Transito',
      dataIndex: 'StockEnTransito',
      key: 'StockEnTransito',
      sorter: (a: any, b: any) => a.StockEnTransito - b.StockEnTransito,
    },
    {
      title: 'Saídas',
      dataIndex: 'CantidadPD',
      key: 'CantidadPD',
      sorter: (a: any, b: any) => a.CantidadPD - b.CantidadPD,
    },
    {
      title: 'ADI',
      dataIndex: 'ADI',
      key: 'ADI',
      sorter: (a: any, b: any) => a.ADI - b.ADI,
    },
    {
      title: 'Pedido',
      dataIndex: 'CantidadAPedir',
      key: 'CantidadAPedir',
      sorter: (a: any, b: any) => a.CantidadAPedir - b.CantidadAPedir,
    },
    {
      title: 'MOQ',
      dataIndex: 'CantMinPedido',
      key: 'CantMinPedido',
      sorter: (a: any, b: any) => a.CantMinPedido - b.CantMinPedido,
    },
    {
      title: 'Qnt de embalagem',
      dataIndex: 'CantEmpaque',
      key: 'CantEmpaque',
      sorter: (a: any, b: any) => a.CantEmpaque - b.CantEmpaque,
    },
    {
      title: 'CampoAd1',
      dataIndex: 'CampoAd1',
      key: 'CampoAd1',
      sorter: (a: any, b: any) => a.CampoAd1.localeCompare(b.CampoAd1),
    },
    {
      title: 'CampoAd2',
      dataIndex: 'CampoAd2',
      key: 'CampoAd2',
      sorter: (a: any, b: any) => a.CampoAd2.localeCompare(b.CampoAd2),
    }

  ];


  const centerColumns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Código',
      dataIndex: 'code',
      key: 'code',
    },
  ];
  const defaultExpandable: ExpandableConfig<any> = {
    expandedRowRender: (record: any) => <p>{record.description}</p>,
  };

  const [expandable, setExpandable] = useState<ExpandableConfig<any>>(defaultExpandable);

  const handleExpandChange = (enable: boolean) => {
    //@ts-ignore
    setExpandable(enable ? defaultExpandable : undefined);
  };


  return (
    <Dashboard title='Dashboard'>
      <div style={{ display: 'flex', padding: 12, gap: 24, backgroundColor: 'white', overflowX: 'auto' }}>
        <Card title="Espaço de trabalho">
          <Space direction="vertical" size="small">
            <Space>
              <Button icon={<CheckCircleOutlined />}>Iniciar</Button>
              <Button disabled icon={<CloseCircleOutlined />}>Finalizar</Button>
            </Space>

            <Space>
              <Button icon={<CheckCircleOutlined />}>Aprovar</Button>
              <Button icon={<CloseCircleOutlined />}>Desaprovar</Button>
            </Space>
          </Space>
        </Card>


        <Card title="Distribuição Priorizada">
          <Space direction="vertical" size="small">
            <Button icon={<CheckCircleOutlined />}>Distribuição Eficiente</Button>
            <Button icon={<DeploymentUnitOutlined />}>Carregar Alocação Priorizada</Button>
            <Button icon={<CheckCircleOutlined />}>Sugerir Alocação Priorizada</Button>
          </Space>
        </Card>

        <Card title="Outras Funções">
          <Space direction="vertical" size="small">
            <Button icon={<TagOutlined />}>Criar Etiqueta</Button>
          </Space>
        </Card>
      </div>

      <Row gutter={16} style={{ marginTop: 24 }}>

        <Col span={17}>
          <Card>
            <Table dataSource={dataSource} scroll={{ x: 1200 }} columns={mainColumns} pagination={false} expandable={expandable} />
          </Card>
        </Col>
        <Col span={7}>
          <Card style={{ width: '100%' }}>
            <Table
              dataSource={centers}
              rowSelection={rowSelectionCenters}
              columns={centerColumns}
              size='small'
              rowKey="id"
              pagination={false}
            />
          </Card>
          <Card style={{ width: '100%' }}>
            <div style={{ marginBottom: 16 }}>
              <Text strong style={{ marginRight: 8 }}>Campo Resumo</Text>
              <Select defaultValue="Vista Planejamento" style={{ width: 200 }}>
                <Option value="planning">Vista Planejamento</Option>
                <Option value="execution">Vista Execução</Option>
                <Option value="analitycs">Vista Analítica</Option>
              </Select>
            </div>

            {data.map((item) => {
              const porcentagem = total === 0 ? 0 : Math.round((item.valor / total) * 100);
              return (
                <Row key={item.cor} align="middle" style={{ marginBottom: 8 }}>
                  <Col span={4}>
                    <Text style={{ color: item.corHex }}>{item.cor}</Text>
                  </Col>
                  <Col span={2}>
                    <Text>{item.valor}</Text>
                  </Col>
                  <Col span={18}>
                    <Progress
                      percent={porcentagem}
                      showInfo
                      strokeColor={item.corHex}
                      size="small"
                    />
                  </Col>
                </Row>
              );
            })}

            <Row justify="end" style={{ marginTop: 16 }}>
              <Text strong>Total {total}</Text>
            </Row>
          </Card>
        </Col>
      </Row>
    </Dashboard>
  );
};

export async function getStaticProps({ locale }: GetStaticPropsContext) {

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'pt', ['common'])),
    },
  };
}

export default DashboardPage;
