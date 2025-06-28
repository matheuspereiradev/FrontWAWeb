import { IDashboard } from "@/interfaces/IDashboard";
import {
    ArrowLeftOutlined,
    ArrowRightOutlined,
    FileSearchOutlined,
    LineChartOutlined,
    ReconciliationOutlined,
    ShopOutlined,
    ShoppingOutlined
} from '@ant-design/icons';
import { Table, Tabs, Tag } from "antd";
import NetflowChart from "../Charts/NetflowChart";
import { useEffect, useState } from "react";
import { IZaf, IZafListResponse } from "@/interfaces/IZaf";
import { IDaf, IDafListResponse } from "@/interfaces/IDaf";
import { IInbound, IInboundListResponse } from "@/interfaces/IInbounds";
import { IOutbound, IOutboundsListResponse } from "@/interfaces/IOutbounds";
import { apiFetch } from "@/services/api_request";
import { useNotification } from "@/hooks/notification";
import { formatDate } from "@/utils/date";
import styles from "./styles.module.css";
import dayjs from "dayjs";

interface Props {
    row: IDashboard;
}

const inboundColumns = [
    {
        title: 'Num Ordem',
        dataIndex: 'orderNumber',
        key: 'orderNumber',
    },
    {
        title: 'Referência',
        dataIndex: 'productCode',
        key: 'productCode',
    },
    {
        title: 'Centro',
        dataIndex: 'originCenterCode',
        key: 'originCenterCode',
    },
    {
        title: 'Data Criação',
        dataIndex: 'creationDate',
        key: 'creationDate',
        render: (value: any) => `${formatDate(value)}`,
    },
    {
        title: 'Data Entrega',
        dataIndex: 'deliveryDate',
        key: 'deliveryDate',
        render: (value: any) => `${formatDate(value)}`,
    },
    {
        title: 'Qtd Original',
        dataIndex: 'quantity',
        key: 'quantity',
    },
    {
        title: 'Qtd Entregue',
        dataIndex: 'deliveredQuantity',
        key: 'deliveredQuantity',
    },
    {
        title: 'Posição',
        dataIndex: 'position',
        key: 'position',
    },
    {
        title: 'Obs',
        dataIndex: 'notes',
        key: 'notes',
    },
    {
        title: 'Fornecedor',
        dataIndex: 'supplierName',
        key: 'supplierName',
    },
    {
        title: 'Cod Fornecedor',
        dataIndex: 'supplierCode',
        key: 'supplierCode',
    },
    // {
    //     title: 'Qtd Trânsito',
    //     dataIndex: 'QtdTransito',
    //     key: 'QtdTransito',
    // },
    // {
    //     title: 'Buffer Tempo',
    //     dataIndex: 'BufferTempo',
    //     key: 'BufferTempo',
    //     render: (value: number) => `${value.toFixed(2)}%`,
    //     onCell: (record: any) => {
    //         const value = record.BufferTempo

    //         let backgroundColor = ''

    //         if (value > 100) {
    //             backgroundColor = 'blue'
    //         } else if (value > 70) {
    //             backgroundColor = 'green'
    //         } else if (value > 40) {
    //             backgroundColor = 'yellow'
    //         } else if (value >= 1) {
    //             backgroundColor = 'red'
    //         } else {
    //             backgroundColor = 'black'
    //         }

    //         return {
    //             style: {
    //                 backgroundColor,
    //                 color: backgroundColor === 'black' || backgroundColor === 'blue' ? 'white' : 'black',
    //             },
    //         }
    //     }
    // },
    // {
    //     title: 'Buffer Execução',
    //     dataIndex: 'BufferExecucao',
    //     key: 'BufferExecucao',
    //     render: (value: number) => `${value.toFixed(2)}%`,
    //     onCell: (record: any) => {
    //         const value = record.BufferExecucao

    //         let backgroundColor = ''

    //         if (value > 100) {
    //             backgroundColor = 'blue'
    //         } else if (value > 70) {
    //             backgroundColor = 'green'
    //         } else if (value > 40) {
    //             backgroundColor = 'yellow'
    //         } else if (value >= 1) {
    //             backgroundColor = 'red'
    //         } else {
    //             backgroundColor = 'black'
    //         }

    //         return {
    //             style: {
    //                 backgroundColor,
    //                 color: backgroundColor === 'black' || backgroundColor === 'blue' ? 'white' : 'black',
    //             },
    //         }
    //     }

    // }
]

const zafColumns = [
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
        render: (isActive: boolean) => (
            <Tag color={isActive ? 'green' : 'red'}>
                {isActive ? 'Sim' : 'Não'}
            </Tag>
        )
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

const dafColumns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id'
    },
    {
        title: 'Referência',
        key: 'reference',
        render: (_: any, record: IDaf) => record.product?.reference || '-',
    },
    {
        title: 'Descrição Produto',
        key: 'description',
        render: (_: any, record: IDaf) => record.product?.description || '-',
    },
    {
        title: 'Centro',
        key: 'center',
        render: (_: any, record: IDaf) => record.center?.code || '-',
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

const outboundsColumns = [
    {
        title: 'Num Ordem',
        dataIndex: 'orderNumber',
        key: 'orderNumber',
    },
    {
        title: 'Referência',
        dataIndex: 'productCode',
        key: 'productCode',
    },
    {
        title: 'Centro',
        dataIndex: 'originCenterCode',
        key: 'originCenterCode',
    },
    {
        title: 'Data Criação',
        dataIndex: 'creationDate',
        key: 'creationDate',
        render: (value: any) => `${formatDate(value)}`,
    },
    {
        title: 'Data Entrega',
        dataIndex: 'deliveryDate',
        key: 'deliveryDate',
        render: (value: any) => `${formatDate(value)}`,
    },
    {
        title: 'Qtd Original',
        dataIndex: 'quantity',
        key: 'quantity',
    },
    {
        title: 'Qtd Entregue',
        dataIndex: 'deliveredQuantity',
        key: 'deliveredQuantity',
    },
    {
        title: 'Posição',
        dataIndex: 'position',
        key: 'position',
    },
    {
        title: 'Obs',
        dataIndex: 'notes',
        key: 'notes',
    },
    {
        title: 'Cod Cliente',
        dataIndex: 'clientCode',
        key: 'clientCode',
    },
    {
        title: 'Cliente',
        dataIndex: 'clientName',
        key: 'clientName',
    },
    // {
    //     title: 'Qtd Trânsito',
    //     dataIndex: 'QtdTransito',
    //     key: 'QtdTransito',
    // },
    // {
    //     title: 'Buffer Tempo',
    //     dataIndex: 'BufferTempo',
    //     key: 'BufferTempo',
    //     render: (value: number) => `${value.toFixed(2)}%`,
    //     onCell: (record: any) => {
    //         const value = record.BufferTempo

    //         let backgroundColor = ''

    //         if (value > 100) {
    //             backgroundColor = 'blue'
    //         } else if (value > 70) {
    //             backgroundColor = 'green'
    //         } else if (value > 40) {
    //             backgroundColor = 'yellow'
    //         } else if (value >= 1) {
    //             backgroundColor = 'red'
    //         } else {
    //             backgroundColor = 'black'
    //         }

    //         return {
    //             style: {
    //                 backgroundColor,
    //                 color: backgroundColor === 'black' || backgroundColor === 'blue' ? 'white' : 'black',
    //             },
    //         }
    //     }
    // },
    // {
    //     title: 'Buffer Execução',
    //     dataIndex: 'BufferExecucao',
    //     key: 'BufferExecucao',
    //     render: (value: number) => `${value.toFixed(2)}%`,
    //     onCell: (record: any) => {
    //         const value = record.BufferExecucao

    //         let backgroundColor = ''

    //         if (value > 100) {
    //             backgroundColor = 'blue'
    //         } else if (value > 70) {
    //             backgroundColor = 'green'
    //         } else if (value > 40) {
    //             backgroundColor = 'yellow'
    //         } else if (value >= 1) {
    //             backgroundColor = 'red'
    //         } else {
    //             backgroundColor = 'black'
    //         }

    //         return {
    //             style: {
    //                 backgroundColor,
    //                 color: backgroundColor === 'black' || backgroundColor === 'blue' ? 'white' : 'black',
    //             },
    //         }
    //     }

    // }
]

export function DetailsTable({ row }: Props) {
    const { openNotification } = useNotification();

    const [loading, setLoading] = useState(false)
    const [zafs, setZafs] = useState<IZaf[]>([])
    const [dafs, setDafs] = useState<IDaf[]>([])
    const [inbounds, setInbounds] = useState<IInbound[]>([])
    const [outbounds, setOutbounds] = useState<IOutbound[]>([])


    const fetchData = async () => {
        try {
            setLoading(true);
            const [dafResponse, zafResponse, inboundsResponse, outboundsResponse] = await Promise.all([
                apiFetch<IDafListResponse>(`/Daf?ProductId=${row.productId}&CenterId=${row.centerId}`),
                apiFetch<IZafListResponse>(`/Zaf?ProductId=${row.productId}&CenterId=${row.centerId}`),
                apiFetch<IInboundListResponse>(`/Orders/Inbounds?CenterId=${row.centerId}&ProductId=${row.productId}`),
                apiFetch<IOutboundsListResponse>(`/Orders/Outbounds?CenterId=${row.centerId}&ProductId=${row.productId}`),
            ]);

            setDafs(dafResponse.data);
            setZafs(zafResponse.data);
            setInbounds(inboundsResponse.data);
            setOutbounds(outboundsResponse.data);

        } catch (err) {
            openNotification('error', {
                message: `Erro ao buscar detalhes do produto ${row.productReference} centro ${row.centerCode}`,
                description: `${err}`,
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);


    return (
        <div style={{ backgroundColor: 'lightblue', padding: '12px' }}>
            {loading ? <div>Carregando...</div> : <Tabs
                defaultActiveKey="2"
                type="card"
                items={[
                    {
                        key: '1',
                        label: `Entradas`,
                        children: <Table
                            dataSource={inbounds}
                            columns={inboundColumns}
                            size='small'
                            pagination={false}
                        />,
                        icon: <ArrowLeftOutlined />,
                    },
                    {
                        key: '2',
                        label: `Saídas`,
                        children: <Table
                            dataSource={outbounds}
                            columns={outboundsColumns}
                            size='small'
                            pagination={false}
                        />,
                        icon: <ArrowRightOutlined />,
                    },
                    {
                        key: '3',
                        label: `Gráfico`,
                        children: <NetflowChart />,
                        icon: <LineChartOutlined />,
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
                        children: <Table
                                dataSource={dafs}
                                columns={dafColumns}
                                size='small'
                                pagination={false}
                            />,
                        icon: <ReconciliationOutlined />,
                    },
                    {
                        key: '6',
                        label: `ZAF`,
                        children: <Table
                            dataSource={zafs}
                            columns={zafColumns}
                            size='small'
                            pagination={false}
                        />,
                        icon: <ReconciliationOutlined />,
                    },
                    {
                        key: '7',
                        label: `Pedidos Ficticios`,
                        children: `Pedidos Ficticios`,
                        icon: <ShoppingOutlined />,
                    },
                ]}
            />}
        </div>
    );
}