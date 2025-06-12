import {
  BarChartOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ClusterOutlined,
  DatabaseOutlined,
  DeploymentUnitOutlined,
  FileAddOutlined,
  RiseOutlined,
  SettingOutlined,
  TagOutlined,
  TagsOutlined,
  ToolOutlined
} from '@ant-design/icons';
import { Button, Card, Col, Layout, Row, Space, Table } from 'antd';
import { useTranslation } from 'react-i18next';

import { Select, Progress, Typography } from 'antd';
import { useState } from 'react';
import { ExpandableConfig } from 'antd/es/table/interface';
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

const { Header, Content, Footer, Sider } = Layout;

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

  const mainColumns = [
    {
      title: 'IdCentroProduto',
      dataIndex: 'IdProductoBodega',
      key: 'IdProductoBodega',
      sorter: (a: any, b: any) => a.IdProductoBodega - b.IdProductoBodega,
      ...generateTextFilter('IdProductoBodega'),
    },
    {
      title: 'IdCentro',
      dataIndex: 'IdBodega',
      key: 'IdBodega',
      sorter: (a: any, b: any) => a.IdBodega - b.IdBodega,
      ...generateTextFilter('IdBodega'),
    },
    {
      title: 'IdProduto',
      dataIndex: 'IdProducto',
      key: 'IdProducto',
      sorter: (a: any, b: any) => a.IdProducto - b.IdProducto,
      ...generateTextFilter('IdProducto'),
    },
    {
      title: 'Referencia',
      dataIndex: 'Referencia',
      key: 'Referencia',
      sorter: (a: any, b: any) => a.Referencia.localeCompare(b.Referencia),
      ...generateTextFilter('Referencia'),
    },
    {
      title: 'Descrição',
      dataIndex: 'Descripcion',
      key: 'Descripcion',
      sorter: (a: any, b: any) => a.Descripcion.localeCompare(b.Descripcion),
      ...generateTextFilter('Descripcion'),
    },
    {
      title: 'Centro',
      dataIndex: 'Bodega',
      key: 'Bodega',
      sorter: (a: any, b: any) => a.Bodega.localeCompare(b.Bodega),
      ...generateTextFilter('Bodega'),
    },
    {
      title: 'Cod Centro',
      dataIndex: 'CodBodega',
      key: 'CodBodega',
      sorter: (a: any, b: any) => a.CodBodega.localeCompare(b.CodBodega),
      ...generateTextFilter('CodBodega'),
    },
    {
      title: 'Unidade Medida',
      dataIndex: 'Unidad',
      key: 'Unidad',
      sorter: (a: any, b: any) => a.Unidad.localeCompare(b.Unidad),
      ...generateTextFilter('Unidad'),
    },
    {
      title: 'Linha',
      dataIndex: 'Linea',
      key: 'Linea',
      sorter: (a: any, b: any) => a.Linea.localeCompare(b.Linea),
      ...generateTextFilter('Linea'),
    },
    {
      title: 'SubLinha',
      dataIndex: 'SubLinea',
      key: 'SubLinea',
      sorter: (a: any, b: any) => a.SubLinea.localeCompare(b.SubLinea),
      ...generateTextFilter('SubLinea'),
    },
    {
      title: 'Estoque',
      dataIndex: 'Stock',
      key: 'Stock',
      sorter: (a: any, b: any) => a.Stock - b.Stock,
      ...generateTextFilter('Stock'),
    },
    {
      title: 'Estoque em Transito',
      dataIndex: 'StockEnTransito',
      key: 'StockEnTransito',
      sorter: (a: any, b: any) => a.StockEnTransito - b.StockEnTransito,
      ...generateTextFilter('StockEnTransito'),
    },
    {
      title: 'Saídas',
      dataIndex: 'CantidadPD',
      key: 'CantidadPD',
      sorter: (a: any, b: any) => a.CantidadPD - b.CantidadPD,
      ...generateTextFilter('CantidadPD'),
    },
    {
      title: 'ADI',
      dataIndex: 'ADI',
      key: 'ADI',
      sorter: (a: any, b: any) => a.ADI - b.ADI,
      ...generateTextFilter('ADI'),
    },
    {
      title: 'Pedido',
      dataIndex: 'CantidadAPedir',
      key: 'CantidadAPedir',
      sorter: (a: any, b: any) => a.CantidadAPedir - b.CantidadAPedir,
      ...generateTextFilter('CantidadAPedir'),
    },
    {
      title: 'MOQ',
      dataIndex: 'CantMinPedido',
      key: 'CantMinPedido',
      sorter: (a: any, b: any) => a.CantMinPedido - b.CantMinPedido,
      ...generateTextFilter('CantMinPedido'),
    },
    {
      title: 'Qnt de embalagem',
      dataIndex: 'CantEmpaque',
      key: 'CantEmpaque',
      sorter: (a: any, b: any) => a.CantEmpaque - b.CantEmpaque,
      ...generateTextFilter('CantEmpaque'),
    },
    {
      title: 'CampoAd1',
      dataIndex: 'CampoAd1',
      key: 'CampoAd1',
      sorter: (a: any, b: any) => a.CampoAd1.localeCompare(b.CampoAd1),
      ...generateTextFilter('CampoAd1'),
    },
    {
      title: 'CampoAd2',
      dataIndex: 'CampoAd2',
      key: 'CampoAd2',
      sorter: (a: any, b: any) => a.CampoAd2.localeCompare(b.CampoAd2),
      ...generateTextFilter('CampoAd2'),
    },
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
        <div>
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

          <Card title="Dados">
            <Space direction="vertical" size="small">
              <Space>
                <Button icon={<DatabaseOutlined />}>Consumo Projetado</Button>
                <Button icon={<SettingOutlined />}>Configuração de Buffer</Button>
              </Space>
              <Space>
                <Button icon={<RiseOutlined />}>Picos e Faturamentos</Button>
                <Button icon={<BarChartOutlined />}>Gráfico</Button>
              </Space>
            </Space>
          </Card>

          <Card title="Outras Funções">
            <Space direction="vertical" size="small">
              <Button icon={<FileAddOutlined />}>Adicionar Motivo</Button>
              <Button icon={<TagsOutlined />}>Definir Etiqueta</Button>
              <Button icon={<TagOutlined />}>Criar Etiqueta</Button>
            </Space>
          </Card>

          <Card title="Distribuição Priorizada">
            <Space direction="vertical" size="small">
              <Button icon={<CheckCircleOutlined />}>Distribuição Eficiente</Button>
              <Button icon={<DeploymentUnitOutlined />}>Carregar Alocação Priorizada</Button>
              <Button icon={<CheckCircleOutlined />}>Sugerir Alocação Priorizada</Button>
            </Space>
          </Card>

          <Card title="Grupo de Alocação">
            <Space direction="vertical" size="small">
              <Button icon={<ClusterOutlined />}>Adicionar </Button>
              <Button icon={<ToolOutlined />}>Remover</Button>
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

export default DashboardPage;
