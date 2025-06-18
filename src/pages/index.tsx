import {
  AreaChartOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
  BarChartOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ClusterOutlined,
  DatabaseOutlined,
  DeploymentUnitOutlined,
  DownOutlined,
  FileAddOutlined,
  FileSearchOutlined,
  GroupOutlined,
  HomeOutlined,
  InboxOutlined,
  LaptopOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PlusOutlined,
  ReconciliationOutlined,
  RiseOutlined,
  SettingOutlined,
  ShopOutlined,
  ShoppingOutlined,
  TagOutlined,
  TagsOutlined,
  ToolOutlined
} from '@ant-design/icons';
import { Button, Card, Col, Dropdown, Layout, Row, Space, Table, Tabs, Tag } from 'antd';
import { GetStaticPropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import styles from '../styles/admin-buffer.module.css';
import centers from '../data/centers.json';
import orders from '../data/orders.json';
import sales from '../data/sales.json';

import { Select, Progress, Typography } from 'antd';
import { useState } from 'react';
import { ColumnsType, ExpandableConfig } from 'antd/es/table/interface';
import dataSource from '../data/centerproduct.json';
import Dashboard from '@/components/layouts/dashboard';
import Link from 'next/link';

const { Option } = Select;
const { Text } = Typography;

const data = [
  { cor: 'Preto', valor: 21, corHex: '#000000' },
  { cor: 'Vermelho', valor: 15, corHex: '#ff0000' },
  { cor: 'Amarelo', valor: 20, corHex: '#ffaa00' },
  { cor: 'Verde', valor: 7, corHex: '#00aa00' },
  { cor: 'Azul', valor: 9, corHex: '#0000ff' },
];


const total = data.reduce((acc, item) => acc + item.valor, 0);

const DashboardPage = () => {

  const [selectedCentersKeys, setSelectedCentersKeys] = useState<React.Key[]>([]);
  const [showSidebar, setShowSidebar] = useState(true);

  const rowSelectionCenters = {
    selectedRowKeys: selectedCentersKeys,
    onChange: (selectedKeys: React.Key[]) => {
      setSelectedCentersKeys(selectedKeys);
    },
  };
  const [selectedMainTableKeys, setSelectedMainTableKeys] = useState<React.Key[]>([]);

  const rowSelectionMainTable = {
    selectedRowKeys: selectedMainTableKeys,
    onChange: (selectedKeys: React.Key[]) => {
      setSelectedMainTableKeys(selectedKeys);
    },
  };


  const mainColumns: ColumnsType<any> = [
    {
      title: 'Ações',
      key: 'action',
      fixed: 'left',
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
      title: 'Buffer Fluxo Líquido',
      dataIndex: 'netflowBuffer',
      key: 'netflowBuffer',
      render: (value: number) => `${value}%`,
      onCell: (record: any) => {
        const value = record.netflowBuffer;

        let backgroundColor = '';

        if (value > 100) {
          backgroundColor = 'blue';
        } else if (value > 70) {
          backgroundColor = 'green';
        } else if (value > 40) {
          backgroundColor = 'yellow';
        } else if (value >= 1) {
          backgroundColor = 'red';
        } else {
          backgroundColor = 'black';
        }

        return {
          style: {
            backgroundColor,
            color: backgroundColor === 'black' || backgroundColor === 'blue' ? 'white' : 'black', // contraste
          },
        };
      }
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
      title: 'Estoque On Hand',
      dataIndex: 'Stock',
      key: 'Stock',
      onCell: () => {
        return {
          style: {
            backgroundColor: 'PaleTurquoise',
          },
        };
      },

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
      title: 'Qtd otimizada',
      dataIndex: 'PedidoARealizar',
      key: 'PedidoARealizar',
      onCell: () => {
        return {
          style: {
            backgroundColor: 'Pink',
          },
        };
      },

      sorter: (a: any, b: any) => a.PedidoARealizar - b.PedidoARealizar,
    },
    {
      title: 'Quantidade Sugerida',
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
      title: 'TOR',
      dataIndex: 'TOR',
      key: 'TOR',
      onCell: () => {
        return {
          style: {
            backgroundColor: 'Red',
          },
        };
      },
      sorter: (a: any, b: any) => a.TOR - b.TOR,
    },
    {
      title: 'TOY',
      dataIndex: 'TOY',
      key: 'TOY',
      onCell: () => {
        return {
          style: {
            backgroundColor: 'Yellow',
          },
        };
      },
      sorter: (a: any, b: any) => a.TOY - b.TOY,
    },
    {
      title: 'TOG',
      dataIndex: 'TOG',
      key: 'TOG',
      onCell: () => {
        return {
          style: {
            backgroundColor: 'Green',
          },
        };
      },
      sorter: (a: any, b: any) => a.TOR - b.TOR,
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

  const ordersColumns = [
    {
      title: 'Num Ordem',
      dataIndex: 'NumOrdem',
      key: 'NumOrdem',
    },
    {
      title: 'Referência',
      dataIndex: 'Referencia',
      key: 'Referencia',
    },
    {
      title: 'Tipo (Observação)',
      dataIndex: 'TipoObservacao',
      key: 'TipoObservacao',
    },
    {
      title: 'Fornecedor',
      dataIndex: 'Fornecedor',
      key: 'Fornecedor',
    },
    {
      title: 'Data Criação',
      dataIndex: 'DataCriacao',
      key: 'DataCriacao',
    },
    {
      title: 'Data Entrega',
      dataIndex: 'DataEntrega',
      key: 'DataEntrega',
    },
    {
      title: 'Qtd Original',
      dataIndex: 'QtdOriginal',
      key: 'QtdOriginal',
    },
    {
      title: 'Qtd Faltante',
      dataIndex: 'QtdFaltante',
      key: 'QtdFaltante',
    },
    {
      title: 'Qtd Trânsito',
      dataIndex: 'QtdTransito',
      key: 'QtdTransito',
    },
    {
      title: 'Buffer Tempo',
      dataIndex: 'BufferTempo',
      key: 'BufferTempo',
      render: (value: number) => `${value.toFixed(2)}%`,
      onCell: (record: any) => {
        const value = record.BufferTempo;

        let backgroundColor = '';

        if (value > 100) {
          backgroundColor = 'blue';
        } else if (value > 70) {
          backgroundColor = 'green';
        } else if (value > 40) {
          backgroundColor = 'yellow';
        } else if (value >= 1) {
          backgroundColor = 'red';
        } else {
          backgroundColor = 'black';
        }

        return {
          style: {
            backgroundColor,
            color: backgroundColor === 'black' || backgroundColor === 'blue' ? 'white' : 'black',
          },
        };
      }
    },
    {
      title: 'Buffer Execução',
      dataIndex: 'BufferExecucao',
      key: 'BufferExecucao',
      render: (value: number) => `${value.toFixed(2)}%`,
      onCell: (record: any) => {
        const value = record.BufferExecucao;

        let backgroundColor = '';

        if (value > 100) {
          backgroundColor = 'blue';
        } else if (value > 70) {
          backgroundColor = 'green';
        } else if (value > 40) {
          backgroundColor = 'yellow';
        } else if (value >= 1) {
          backgroundColor = 'red';
        } else {
          backgroundColor = 'black';
        }

        return {
          style: {
            backgroundColor,
            color: backgroundColor === 'black' || backgroundColor === 'blue' ? 'white' : 'black',
          },
        };
      }

    }
  ];

  return (
    <Dashboard title='Dashboard'>
      {/* <div style={{ display: 'flex', padding: 12, gap: 24, backgroundColor: 'white', overflowX: 'auto' }}>
        
      </div> */}

      <Row gutter={16} style={{ marginTop: 24 }}>
        <Col span={17}>
          <Card>
            <Space direction="horizontal" size="small">
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
            </Space>
            <Table
              dataSource={dataSource}
              scroll={{ x: 'max-content' }}
              columns={mainColumns}
              rowKey="IdProductoBodega"
              pagination={false}
              rowSelection={rowSelectionMainTable}
              size='middle'
              expandable={{
                expandedRowRender: (record) => <Tabs
                  defaultActiveKey="2"
                  type="card"
                  items={[
                    {
                      key: '1',
                      label: `Entradas`,
                      children: <Table
                        dataSource={orders}
                        columns={ordersColumns}
                        size='small'
                        pagination={false}
                      />,
                      icon: <ArrowLeftOutlined />,
                    },
                    {
                      key: '2',
                      label: `Saídas`,
                      children: <Table
                        dataSource={sales}
                        columns={ordersColumns}
                        size='small'
                        pagination={false}
                      />,
                      icon: <ArrowRightOutlined />,
                    },
                    {
                      key: '3',
                      label: `Centros`,
                      children: `Centros`,
                      icon: <ShopOutlined />,
                    },
                    {
                      key: '4',
                      label: `Buffer DDMRP`,
                      children: `Buffer DDMRP`,
                      icon: <FileSearchOutlined />,
                    },
                    {
                      key: '5',
                      label: `DAF`,
                      children: `DAF`,
                      icon: <ReconciliationOutlined />,
                    },
                    {
                      key: '6',
                      label: `ZAF`,
                      children: `ZAF`,
                      icon: <ReconciliationOutlined />,
                    },
                    {
                      key: '7',
                      label: `Pedidos Ficticios`,
                      children: `Pedidos Ficticios`,
                      icon: <ShoppingOutlined />,
                    },
                  ]}
                />
              }}
              className={styles['custom-table']}
            />
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
    </Dashboard >
  );
};


export default DashboardPage;
