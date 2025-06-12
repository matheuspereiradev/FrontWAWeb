import { GetStaticPropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';

import Dashboard from '@/components/layouts/dashboard';
import { AutoComplete, AutoCompleteProps, Button, Card, Checkbox, Col, DatePicker, Flex, Form, InputNumber, Radio, RadioChangeEvent, Row, Select } from 'antd';
import { useState } from 'react';

const centers = [
    { name: "São Paulo", id: "1", code: "SP" },
    { name: "Salvador", id: "2", code: "BA" },
    { name: "Fortaleza", id: "3", code: "CE" },
    { name: "Brasília", id: "4", code: "DF" },
    { name: "Rio de Janeiro", id: "5", code: "RJ" },
];

const { RangePicker } = DatePicker;

const DafPage = () => {
    const { t } = useTranslation('common');

    const [options, setOptions] = useState<AutoCompleteProps['options']>([]);
    const [radioValue, setRadioValue] = useState(1);

    const handleSearch = (value: string) => {
        setOptions(() => {
            return [{
                label: 'a',
                value: 'a',
            }, {
                label: 'b',
                value: 'b',
            }, {
                label: 'c',
                value: 'c',
            }];
        });
    };

    const onChange = (value: string) => {
        console.log(`selected ${value}`);
    };

    const onSearch = (value: string) => {
        console.log('search:', value);
    };

    return (
        <Dashboard title={t('stocks-daf')}>
            <Card>
                <Form layout='vertical'>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="Centro">
                                <Select
                                    showSearch
                                    placeholder="Selecione um centro"
                                    optionFilterProp="label"
                                    onChange={onChange}
                                    onSearch={onSearch}
                                    options={
                                        centers.map((center) => {
                                            return {
                                                value: center.code,
                                                label: center.name
                                            }
                                        })
                                    }
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Referência">
                                <AutoComplete
                                    onSearch={handleSearch}
                                    placeholder="input here"
                                    options={options}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={18}>
                            <Form.Item label="Intervalo">
                                <RangePicker style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                        <Col span={6} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <Checkbox onChange={(e) => {
                                console.log(`checked = ${e.target.checked}`);
                            }}>Descartar consumos</Checkbox>
                        </Col>
                    </Row>
                    <Flex style={{ marginBottom: 24 }} gap='middle'>
                        <Card title={t('stocks-daf')} style={{ width: '100%' }}>
                            <Flex gap='middle'>
                                <Form.Item label="Tipo">
                                    <Radio.Group
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: 8
                                        }}
                                        value={radioValue}
                                        onChange={(e: RadioChangeEvent) => {
                                            setRadioValue(e.target.value)
                                        }}
                                        options={[
                                            { value: 1, label: 'Porcentagem (%)' },
                                            { value: 2, label: 'Valor' }
                                        ]}
                                    />
                                </Form.Item>
                                <Form.Item style={{ display: 'flex', alignItems: 'center' }}>
                                    <InputNumber min={0} max={1000000000} defaultValue={0} step={0.1} onChange={(value) => {
                                        console.log('changed', value);
                                    }} />
                                </Form.Item>
                            </Flex>
                        </Card>
                        <Card title='ADU'  style={{ width: '100%' }}>
                            <Flex gap='middle' vertical>
                                <Checkbox onChange={(e) => {
                                    console.log(`checked = ${e.target.checked}`);
                                }}>Usar ADU</Checkbox>
                                <Row>
                                    <Col span={12}>
                                        <label>Dias de ADU</label>
                                    </Col>
                                    <Col span={12}>
                                        <InputNumber min={0} max={1000000000} defaultValue={0} step={0.1} onChange={(value) => {
                                            console.log('changed', value);
                                        }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={12}>
                                        <label>Dias de ADU futuro</label>
                                    </Col>
                                    <Col span={12}>
                                        <InputNumber min={0} max={1000000000} defaultValue={0} step={0.1} onChange={(value) => {
                                            console.log('changed', value);
                                        }} />
                                    </Col>
                                </Row>
                            </Flex>
                        </Card>
                    </Flex>
                    <Flex justify='flex-end'>
                        <Button type='primary' htmlType="submit">
                            Salvar
                        </Button>
                    </Flex>
                </Form>
            </Card>
        </Dashboard >
    );
};

export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            ...(await serverSideTranslations(locale ?? 'pt', ['common'])),
        },
    };
}

export default DafPage;
