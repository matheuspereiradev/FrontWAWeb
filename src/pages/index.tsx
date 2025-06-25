import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  BarChartOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  DeploymentUnitOutlined,
  DownOutlined,
  FileAddOutlined,
  FileSearchOutlined,
  GroupOutlined,
  ReconciliationOutlined,
  RiseOutlined,
  SettingOutlined,
  ShopOutlined,
  ShoppingOutlined,
  TagOutlined,
  TagsOutlined
} from '@ant-design/icons'
import { Button, Card, Col, Dropdown, Row, Space, Table, Tabs } from 'antd'
import { GetServerSideProps, GetServerSidePropsResult } from 'next'
import orders from '../data/orders.json'
import sales from '../data/sales.json'
import styles from '../styles/admin-buffer.module.css'

import Dashboard from '@/components/layouts/dashboard'
import { ICenter, ICenterListResponse } from '@/interfaces/ICenters'
import { serverApiFetch } from '@/services/api_request'
import { Progress, Select, Typography } from 'antd'
import { ColumnsType } from 'antd/es/table/interface'
import { useState } from 'react'
import dataSource from '../data/centerproduct.json'
import { ICenterProduct, ICenterProductListResponse } from '@/interfaces/ICenterProduct'
import NetflowChart from '@/components/Charts/NetflowChart'
import { IDashboard, IDashboardListResponse } from '@/interfaces/IDashboard'

const { Option } = Select
const { Text } = Typography

interface Props {
  centers: ICenter[]
  mainTable: IDashboard[]
}

const data = [
  { cor: 'Preto', valor: 21, corHex: '#000000' },
  { cor: 'Vermelho', valor: 15, corHex: '#ff0000' },
  { cor: 'Amarelo', valor: 20, corHex: '#ffaa00' },
  { cor: 'Verde', valor: 7, corHex: '#00aa00' },
  { cor: 'Azul', valor: 9, corHex: '#0000ff' },
]


const total = data.reduce((acc, item) => acc + item.valor, 0)

const DashboardPage = (props: Props) => {

  const [selectedCentersKeys, setSelectedCentersKeys] = useState<React.Key[]>([])
  const [showSidebar, setShowSidebar] = useState(true)

  const rowSelectionCenters = {
    selectedRowKeys: selectedCentersKeys,
    onChange: (selectedKeys: React.Key[]) => {
      setSelectedCentersKeys(selectedKeys)
    },
  }
  const [selectedMainTableKeys, setSelectedMainTableKeys] = useState<React.Key[]>([])

  const rowSelectionMainTable = {
    selectedRowKeys: selectedMainTableKeys,
    onChange: (selectedKeys: React.Key[]) => {
      setSelectedMainTableKeys(selectedKeys)
    },
  }


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
      title: 'Id Centro Produto',
      dataIndex: 'centerProductId',
      key: 'centerProductId',
      sorter: (a: any, b: any) => a.centerProductId - b.centerProductId,
    },
    {
      title: 'IdCentro',
      dataIndex: 'centerId',
      key: 'centerId',
      sorter: (a: any, b: any) => a.centerId - b.centerId,
    },
    {
      title: 'IdProduto',
      dataIndex: 'productId',
      key: 'productId',
      sorter: (a: any, b: any) => a.productId - b.productId,
    },
    {
      title: 'Referencia',
      dataIndex: 'productReference',
      key: 'productReference',
      sorter: (a: any, b: any) => a.productReference.localeCompare(b.productReference),
    },
    {
      title: 'Descrição',
      dataIndex: 'productDescription',
      key: 'productDescription',
      sorter: (a: any, b: any) => a.productDescription.localeCompare(b.productDescription),
    },
    {
      title: 'Cód Centro',
      dataIndex: 'centerCode',
      key: 'centerCode',
      sorter: (a: any, b: any) => a.centerCode.localeCompare(b.centerCode),
    },
    
    // {
    //   title: 'Buffer Fluxo Líquido',
    //   dataIndex: 'netflowBuffer',
    //   key: 'netflowBuffer',
    //   render: (value: number) => `${value}%`,
    //   onCell: (record: any) => {
    //     const value = record.netflowBuffer

    //     let backgroundColor = ''

    //     if (value > 100) {
    //       backgroundColor = 'blue'
    //     } else if (value > 70) {
    //       backgroundColor = 'green'
    //     } else if (value > 40) {
    //       backgroundColor = 'yellow'
    //     } else if (value >= 1) {
    //       backgroundColor = 'red'
    //     } else {
    //       backgroundColor = 'black'
    //     }

    //     return {
    //       style: {
    //         backgroundColor,
    //         color: backgroundColor === 'black' || backgroundColor === 'blue' ? 'white' : 'black', // contraste
    //       },
    //     }
    //   }
    // },
    {
      title: 'Estoque On Hand',
      dataIndex: 'stock',
      key: 'stock',
      onCell: () => {
        return {
          style: {
            backgroundColor: 'PaleTurquoise',
          },
        }
      },

      sorter: (a: any, b: any) => a.stock - b.stock,
    },
    {
      title: 'Estoque em Transito',
      dataIndex: 'totalInbounds',
      key: 'totalInbounds',
      sorter: (a: any, b: any) => a.totalInbounds - b.totalInbounds,
    },
    {
      title: 'Saídas',
      dataIndex: 'totalOutbounds',
      key: 'totalOutbounds',
      sorter: (a: any, b: any) => a.totalOutbounds - b.totalOutbounds,
    },
    {
      title: 'ADI',
      dataIndex: 'adi',
      key: 'adi',
      sorter: (a: any, b: any) => a.adi - b.adi,
    },
    // {
    //   title: 'Qtd otimizada',
    //   dataIndex: 'PedidoARealizar',
    //   key: 'PedidoARealizar',
    //   onCell: () => {
    //     return {
    //       style: {
    //         backgroundColor: 'Pink',
    //       },
    //     }
    //   },
    //   sorter: (a: any, b: any) => a.PedidoARealizar - b.PedidoARealizar,
    // },
    // {
    //   title: 'Quantidade Sugerida',
    //   dataIndex: 'CantidadAPedir',
    //   key: 'CantidadAPedir',
    //   sorter: (a: any, b: any) => a.CantidadAPedir - b.CantidadAPedir,
    // },
    {
      title: 'MOQ',
      dataIndex: 'minimumOrderQuantity',
      key: 'minimumOrderQuantity',
      sorter: (a: any, b: any) => a.minimumOrderQuantity - b.minimumOrderQuantity,
    },
    {
      title: 'Qnt de embalagem',
      dataIndex: 'packageQuantity',
      key: 'packageQuantity',
      sorter: (a: any, b: any) => a.packageQuantity - b.packageQuantity,
    },
    {
      title: 'frequencia',
      dataIndex: 'frequency',
      key: 'frequency',
      sorter: (a: any, b: any) => a.frequency - b.frequency,
    },
    {
      title: 'leadTime',
      dataIndex: 'leadTime',
      key: 'leadTime',
      sorter: (a: any, b: any) => a.leadTime - b.leadTime,
    },
    {
      title: 'ADU',
      dataIndex: 'adu',
      key: 'adu',
      sorter: (a: any, b: any) => a.adu - b.adu,
    },
    {
      title: 'ADU Futuro',
      dataIndex: 'futureAdu',
      key: 'futureAdu',
      sorter: (a: any, b: any) => a.futureAdu - b.futureAdu,
    },
    {
      title: 'Desvio Padrão',
      dataIndex: 'standardDeviation',
      key: 'standardDeviation',
      sorter: (a: any, b: any) => a.standardDeviation - b.standardDeviation,
    },
    {
      title: 'Coeficiente de Variabilidade',
      dataIndex: 'variabilityCoefficient',
      key: 'variabilityCoefficient',
      sorter: (a: any, b: any) => a.variabilityCoefficient - b.variabilityCoefficient,
    },
    {
      title: 'Pico Qualificado',
      dataIndex: 'qualifiedSpike',
      key: 'qualifiedSpike',
      sorter: (a: any, b: any) => a.qualifiedSpike - b.qualifiedSpike,
    },
    // {
    //   title: 'TOR',
    //   dataIndex: 'TOR',
    //   key: 'TOR',
    //   onCell: () => {
    //     return {
    //       style: {
    //         backgroundColor: 'Red',
    //       },
    //     }
    //   },
    //   sorter: (a: any, b: any) => a.TOR - b.TOR,
    // },
    // {
    //   title: 'TOY',
    //   dataIndex: 'TOY',
    //   key: 'TOY',
    //   onCell: () => {
    //     return {
    //       style: {
    //         backgroundColor: 'Yellow',
    //       },
    //     }
    //   },
    //   sorter: (a: any, b: any) => a.TOY - b.TOY,
    // },
    // {
    //   title: 'TOG',
    //   dataIndex: 'TOG',
    //   key: 'TOG',
    //   onCell: () => {
    //     return {
    //       style: {
    //         backgroundColor: 'Green',
    //       },
    //     }
    //   },
    //   sorter: (a: any, b: any) => a.TOR - b.TOR,
    // }

  ]


  const centerColumns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Código',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Nome',
      dataIndex: 'description',
      key: 'description',
    },
  ]

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
        const value = record.BufferTempo

        let backgroundColor = ''

        if (value > 100) {
          backgroundColor = 'blue'
        } else if (value > 70) {
          backgroundColor = 'green'
        } else if (value > 40) {
          backgroundColor = 'yellow'
        } else if (value >= 1) {
          backgroundColor = 'red'
        } else {
          backgroundColor = 'black'
        }

        return {
          style: {
            backgroundColor,
            color: backgroundColor === 'black' || backgroundColor === 'blue' ? 'white' : 'black',
          },
        }
      }
    },
    {
      title: 'Buffer Execução',
      dataIndex: 'BufferExecucao',
      key: 'BufferExecucao',
      render: (value: number) => `${value.toFixed(2)}%`,
      onCell: (record: any) => {
        const value = record.BufferExecucao

        let backgroundColor = ''

        if (value > 100) {
          backgroundColor = 'blue'
        } else if (value > 70) {
          backgroundColor = 'green'
        } else if (value > 40) {
          backgroundColor = 'yellow'
        } else if (value >= 1) {
          backgroundColor = 'red'
        } else {
          backgroundColor = 'black'
        }

        return {
          style: {
            backgroundColor,
            color: backgroundColor === 'black' || backgroundColor === 'blue' ? 'white' : 'black',
          },
        }
      }

    }
  ]

  return (
    <Dashboard title='Dashboard'>
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
              dataSource={props.mainTable}
              scroll={{ x: 'max-content' }}
              columns={mainColumns}
              rowKey="centerProductId"
              rowSelection={rowSelectionMainTable}
              size='small'
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
                      children: <NetflowChart/>,
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
              dataSource={props.centers}
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
              const porcentagem = total === 0 ? 0 : Math.round((item.valor / total) * 100)
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
              )
            })}

            <Row justify="end" style={{ marginTop: 16 }}>
              <Text strong>Total {total}</Text>
            </Row>
          </Card>
        </Col>
      </Row>
    </Dashboard >
  )
}


export const getServerSideProps: GetServerSideProps<Props> =
  async (ctx): Promise<GetServerSidePropsResult<Props>> => {
    const { data: centers } = await serverApiFetch<ICenterListResponse>(ctx, '/Centers')
    const { data: mainTable } = await serverApiFetch<IDashboardListResponse>(ctx, '/Report/Dashboard')

    console.log('Maintable', mainTable.length)

    return {
      props: {
        centers,
        mainTable
      }
    }
  }

export default DashboardPage

