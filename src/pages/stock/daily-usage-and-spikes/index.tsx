import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Card, Col, DatePicker, Row, Table } from 'antd';
import dayjs from 'dayjs';
import { IHistory, IHistoryListResponse } from '@/interfaces/IHistory';
import { apiFetch, serverApiFetch } from '@/services/api_request';
import Dashboard from '@/components/layouts/dashboard';
import { formatDate } from '@/utils/date';
import { GetServerSideProps, GetServerSidePropsResult } from 'next';
import { usePathname, useSearchParams } from 'next/navigation';

const { RangePicker } = DatePicker;

interface Props {
    history: IHistory[];
}

const HistoryListPage = (props: Props) => {

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const [loading, setLoading] = useState(false);

    const startParam = searchParams.get('start');
    const endParam = searchParams.get('end');

    const [range, setRange] = useState<[dayjs.Dayjs, dayjs.Dayjs]>(() => {
        if (startParam && endParam) {
            return [dayjs(startParam), dayjs(endParam)];
        }
        return [dayjs().startOf('month'), dayjs().endOf('month')];
    });


    function updateQueryParams(start: string, end: string) {
        const params = new URLSearchParams(searchParams);
        if (end) {
            params.set('end', end);
        } else {
            params.delete('end');
        }
        if (start) {
            params.set('start', start);
        } else {
            params.delete('start');
        }

        replace(`${pathname}?${params.toString()}`);
    }

    const onRangeChange = (
        dates: [dayjs.Dayjs, dayjs.Dayjs] | null,
        dateStrings: [string, string]
    ) => {
        if (dates) {
            setRange(dates);
            updateQueryParams(
                dateStrings[0],
                dateStrings[1]
            );
        }
    };


    const columns = [
        { title: 'Data', dataIndex: 'date', key: 'date', sorter: (a: any, b: any) => dayjs(a.date).unix() - dayjs(b.date).unix(), render: (val: string) => formatDate(val) },
        { title: 'Centro', dataIndex: 'centerCode', sorter: (a: any, b: any) => a.centerCode - b.centerCode, key: 'centerCode' },
        { title: 'Produto', dataIndex: 'productReference', sorter: (a: any, b: any) => a.productReference - b.productReference, key: 'productReference' },
        { title: 'Descrição', dataIndex: 'productDescription', sorter: (a: any, b: any) => a.productDescription - b.productDescription, key: 'productDescription' },
        { title: 'Consumo', dataIndex: 'consumption', sorter: (a: any, b: any) => a.consumption - b.consumption, key: 'consumption' },
        { title: 'Estoque', dataIndex: 'stock', sorter: (a: any, b: any) => a.stock - b.stock, key: 'stock' },
        { title: 'Em Trânsito', dataIndex: 'stockInTransit', sorter: (a: any, b: any) => a.stockInTransit - b.stockInTransit, key: 'stockInTransit' },
        { title: 'Entradas', dataIndex: 'inbounds', sorter: (a: any, b: any) => a.inbounds - b.inbounds, key: 'inbounds' },
        { title: 'Saídas', dataIndex: 'outbounds', sorter: (a: any, b: any) => a.outbounds - b.outbounds, key: 'outbounds' },
        { title: 'ADU', dataIndex: 'adu', sorter: (a: any, b: any) => a.adu - b.adu, key: 'adu' },
        { title: 'Buffer Vermelho Base', dataIndex: 'bufferDdmrpRedBase', sorter: (a: any, b: any) => a.bufferDdmrpRedBase - b.bufferDdmrpRedBase, key: 'bufferDdmrpRedBase' },
        { title: 'Buffer Vermelho Safety', dataIndex: 'bufferDdmrpRedSafety', sorter: (a: any, b: any) => a.bufferDdmrpRedSafety - b.bufferDdmrpRedSafety, key: 'bufferDdmrpRedSafety' },
        { title: 'Buffer Amarelo', dataIndex: 'bufferDdmrpYellow', sorter: (a: any, b: any) => a.bufferDdmrpYellow - b.bufferDdmrpYellow, key: 'bufferDdmrpYellow' },
        { title: 'Buffer Verde', dataIndex: 'bufferDdmrpGreen', sorter: (a: any, b: any) => a.bufferDdmrpGreen - b.bufferDdmrpGreen, key: 'bufferDdmrpGreen' },
        { title: 'Perfil', dataIndex: 'profile', sorter: (a: any, b: any) => a.profile - b.profile, key: 'profile' },
    ];

    return (
        <Dashboard title="Consumo Diário e Picos">
            <Card>
                <Row gutter={16} align="middle" style={{ marginBottom: 16 }}>
                    <Col>
                        <RangePicker
                            value={range}
                            onChange={onRangeChange}
                            style={{ marginBottom: 16 }}
                        />
                    </Col>
                </Row>

                <Table
                    rowKey="id"
                    dataSource={props.history}
                    columns={columns}
                    loading={loading}
                    pagination={{
                        pageSize: 10,
                        showSizeChanger: true,
                        pageSizeOptions: ['10', '20', '50', '100'],
                    }}
                    size='small'
                    scroll={{ x: 'max-content' }}
                    summary={pageData => {
                        const total = props.history.reduce((sum, item) => sum + item.consumption, 0);
                        const avg = props.history.length > 0 ? total / props.history.length : 0;
                        const qt = props.history.length;

                        return (
                            <Table.Summary fixed>
                                <Table.Summary.Row>
                                    <Table.Summary.Cell index={0} colSpan={3}>
                                        <strong>Totais (página atual):</strong>
                                    </Table.Summary.Cell>
                                    <Table.Summary.Cell index={3}>
                                        <div>
                                            <div><strong>Quantidade:</strong> {qt}</div>
                                        </div>
                                    </Table.Summary.Cell>
                                    <Table.Summary.Cell index={4}>
                                        <div>
                                            <div><strong>Soma:</strong> {total.toFixed(2)}</div>
                                            <div><strong>Média:</strong> {avg.toFixed(2)}</div>
                                        </div>
                                    </Table.Summary.Cell>
                                    {/* Preencher células restantes com vazios */}
                                    {columns.slice(5).map((_, index) => (
                                        <Table.Summary.Cell key={index} index={index} />
                                    ))}
                                </Table.Summary.Row>
                            </Table.Summary>
                        );
                    }}

                />
            </Card>
        </Dashboard>
    );
};

export const getServerSideProps: GetServerSideProps<Props> =
    async (ctx): Promise<GetServerSidePropsResult<Props>> => {


        let url = `/History?CenterId=${ctx?.query?.center}&ProductId=${ctx?.query?.product}&StartDate=${ctx?.query?.start}&EndDate=${ctx?.query?.end}`;

        const { data: history } = await serverApiFetch<IHistoryListResponse>(ctx, url)

        return {
            props: {
                history
            }
        }
    }


export default HistoryListPage;
