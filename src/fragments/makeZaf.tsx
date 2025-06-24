
import { useNotification } from '@/hooks/notification';
import { ICenter } from '@/interfaces/ICenters';
import { IProduct, IProductListResponse } from '@/interfaces/IProducts';
import { IZaf, IZafResponse } from '@/interfaces/IZaf';
import { apiFetch, apiPost } from '@/services/api_request';
import { Button, Card, Col, DatePicker, Flex, Form, Input, InputNumber, Radio, Row, Select } from 'antd';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const { RangePicker } = DatePicker;

interface Props {
    centers: ICenter[],
    zaf?: IZaf
}

const MakeZaf = (props: Props) => {

    const { openNotification } = useNotification();
    const router = useRouter();
    const [form] = Form.useForm();
    const [products, setProducts] = useState<IProduct[]>([]);

    const onSubmit = async (values: any) => {

        apiPost<IZafResponse>('/Zaf', {
            productId: values.productId,
            centerId: values.centerId,
            targetZone: values.targetZone,
            adjustmentType: values.adjustmentType,
            adjustmentValue: values.adjustmentValue,
            description: values.description,
            effectiveFrom: values.interval[0].toISOString(),
            effectiveTo: values.interval[1].toISOString()
        }).then((res) => {
            openNotification('success', {
                message: 'ZAF criada com sucesso',
                description: `ZAF ${res.data.id} criada com sucesso`
            });
            router.push('/stock/zaf');
        }).catch((err) => {
            console.error('Erro:', err);
            openNotification('error',{
                message: 'Erro ao criar ZAF',
                description: `${err}`
            })
        });


    };

    useEffect(() => {
        if (props.zaf) {
            form.setFieldsValue({
                centerId: props.zaf.centerId,
                productId: props.zaf.productId,
                interval: [
                    dayjs(props.zaf.effectiveFrom),
                    dayjs(props.zaf.effectiveTo)
                ],
                adjustmentType: props.zaf.adjustmentType,
                adjustmentValue: props.zaf.adjustmentValue,
                targetZone: props.zaf.targetZone
            });
        }
    }, [props.zaf, form]);


    const fetchProducts = async (centerId: string | number) => {
        try {
            const { data: prd } = await apiFetch<IProductListResponse>(`/Centers/${centerId}/Products`);
            setProducts(prd);
        } catch (err) {
            openNotification('error',{
                message: 'Erro buscar produtos',
                description: `${err}`
            })
            console.error(err);
            setProducts([]);
        }
    };

    function handleCenterChange(value: string | number) {
        form.setFieldsValue({ productId: undefined });
        fetchProducts(value);
    }

    return (
        <Card>
            <Form form={form} layout="vertical" onFinish={onSubmit}>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item name="centerId" label="Centro" rules={[{ required: true, message: 'Selecione um centro' }]}>
                            <Select
                                showSearch
                                placeholder="Selecione um centro"
                                onChange={handleCenterChange}
                                optionFilterProp="label"
                                options={props.centers.map((center) => ({
                                    value: center.id,
                                    label: `${center.code} - ${center.description}`
                                }))}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="productId" label="Referência" rules={[{ required: true, message: 'Selecione uma referência' }]}>
                            <Select
                                showSearch
                                placeholder="Selecione uma referência"
                                optionFilterProp="label"
                                options={products.map((p) => ({
                                    value: p.id,
                                    label: `${p.reference} - ${p.description}`
                                }))}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item name="interval" label="Intervalo" rules={[{ required: true, message: 'Selecione um intervalo' }]}>
                            <RangePicker style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                </Row>



                <Row gutter={16}>
                    <Col span={12}>
                        <Flex justify="center" style={{ marginBottom: 24 }}>
                            <Card title={'ZAF'}>
                                <Flex gap="middle">
                                    <Form.Item name="adjustmentType" label="Tipo" initialValue={1}>
                                        <Radio.Group
                                            style={{ display: 'flex', flexDirection: 'column', gap: 8 }}
                                            options={[
                                                { value: 'Percentage', label: 'Porcentagem (%)' },
                                                { value: 'FlatValue', label: 'Valor' }
                                            ]}
                                        />
                                    </Form.Item>

                                    <Form.Item name="adjustmentValue" label="Valor" rules={[{ required: true, message: 'Informe o valor' }]}>
                                        <InputNumber min={0} max={1000000000} step={0.1} />
                                    </Form.Item>

                                    <Form.Item name="targetZone" label="Zona" rules={[{ required: true, message: 'Selecione uma zona' }]}>
                                        <Select
                                            showSearch
                                            placeholder="Zona"
                                            optionFilterProp="label"
                                            options={[
                                                { value: 'Red', label: 'Vermelho' },
                                                { value: 'Yellow', label: 'Amarelo' },
                                                { value: 'Green', label: 'Verde' }
                                            ]}
                                        />
                                    </Form.Item>
                                </Flex>
                            </Card>
                        </Flex>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="description" label="Observações">
                            <Input.TextArea rows={4} placeholder="Adicione uma descrição" />
                        </Form.Item>
                    </Col>
                </Row>
                <Flex justify="flex-end">
                    <Button type="primary" htmlType="submit">
                        Salvar
                    </Button>
                </Flex>
            </Form>
        </Card>
    );
};

export default MakeZaf;